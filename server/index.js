import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid'; // For generating unique image names

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

const s3 = new S3Client({
  region: process.env.REGION, // Ensure this is set correctly
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
    const result = await pool.query('SELECT id, title, artist, price, img_url FROM cards');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching cards:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a new card with image uploaded to S3
app.post('/api/cards', upload.single('artImage'), async (req, res) => {
  const { title, artist, price } = req.body;
  const imgData = req.file.buffer;
  const imgName = `${uuidv4()}.${req.file.mimetype.split('/')[1]}`; // Unique image name with proper extension

  try {
    // Upload image to S3
    const uploadParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: imgName,
      Body: imgData,
      ContentType: req.file.mimetype,
      // Removed ACL settings
    };

    await s3.send(new PutObjectCommand(uploadParams));

    const imgUrl = `https://${process.env.BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com/${imgName}`;

    // Save card details in database
    const result = await pool.query(
      'INSERT INTO cards (title, artist, price, img_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, artist, price, imgUrl]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding card:', err);
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
