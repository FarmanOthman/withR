import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import multer from 'multer';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database setup
const { Pool } = pg;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// AWS S3 setup
const s3 = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

// Middleware setup
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Content Security Policy setup
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
      imgSrc: ["'self'", "data:", `https://${process.env.BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com`],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// API routes

// Get all cards
app.get('/api/cards', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, title, artist, price, description, img_url FROM cards');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching cards:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a new card with image uploaded to S3
app.post('/api/cards', upload.single('artImage'), async (req, res) => {
  const { title, artist, price, description } = req.body;
  const imgData = req.file.buffer;
  const imgName = `${uuidv4()}.${req.file.mimetype.split('/')[1]}`; // Unique image name with proper extension

  try {
    // Upload image to S3
    const uploadParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: imgName,
      Body: imgData,
      ContentType: req.file.mimetype,
    };

    await s3.send(new PutObjectCommand(uploadParams));

    const imgUrl = `https://${process.env.BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com/${imgName}`;

    // Save card details in the database
    const result = await pool.query(
      'INSERT INTO cards (title, artist, price, description, img_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, artist, price, description, imgUrl]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding card:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update an existing card
app.put('/api/cards/:id', upload.single('artImage'), async (req, res) => {
  const { id } = req.params;
  const { title, artist, price, description } = req.body;
  const imgData = req.file ? req.file.buffer : null;

  try {
    // Fetch the existing card details from the database
    const existingCardResult = await pool.query('SELECT img_url FROM cards WHERE id = $1', [id]);

    if (existingCardResult.rows.length === 0) {
      return res.status(404).json({ error: 'Card not found' });
    }

    let imgUrl = existingCardResult.rows[0].img_url;

    // If a new image is uploaded, update the image in S3
    if (imgData) {
      const imgName = `${uuidv4()}.${req.file.mimetype.split('/')[1]}`;

      // Delete the old image from S3
      const oldImgName = imgUrl.split('/').pop();
      const deleteParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: oldImgName,
      };
      await s3.send(new DeleteObjectCommand(deleteParams));

      // Upload the new image to S3
      const uploadParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: imgName,
        Body: imgData,
        ContentType: req.file.mimetype,
      };
      await s3.send(new PutObjectCommand(uploadParams));

      imgUrl = `https://${process.env.BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com/${imgName}`;
    }

    // Update the card details in the database
    const updateResult = await pool.query(
      'UPDATE cards SET title = $1, artist = $2, price = $3, description = $4, img_url = $5 WHERE id = $6 RETURNING *',
      [title, artist, price, description, imgUrl, id]
    );

    res.json(updateResult.rows[0]);
  } catch (err) {
    console.error('Error updating card:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a card from the database and AWS S3
app.delete('/api/cards/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the card details from the database
    const result = await pool.query('SELECT img_url FROM cards WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Card not found' });
    }

    const imgUrl = result.rows[0].img_url;
    const imgName = imgUrl.split('/').pop(); // Extract the image name from the URL

    // Delete the image from S3
    const deleteParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: imgName,
    };

    await s3.send(new DeleteObjectCommand(deleteParams));

    // Delete the card from the database
    await pool.query('DELETE FROM cards WHERE id = $1', [id]);

    res.status(200).json({ message: 'Card deleted successfully' });
  } catch (err) {
    console.error('Error deleting card:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Serve React app
app.use(express.static(path.join(__dirname, '..', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
