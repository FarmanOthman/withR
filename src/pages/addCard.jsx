import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/arts/addCard.css';

const AddCard = () => {
  const navigate = useNavigate();
  const [card, setCard] = useState({
    title: '',
    artist: '',
    price: '',
    description: '', // Add description field
  });

  const handleAddCard = async (e) => {
    e.preventDefault();
    const file = e.target.artImage.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('title', card.title);
      formData.append('artist', card.artist);
      formData.append('price', card.price);
      formData.append('description', card.description); // Append description
      formData.append('artImage', file); // Append the file as binary

      try {
        const response = await fetch('/api/cards', {
          method: 'POST',
          body: formData, // Send the FormData object
        });

        if (response.ok) {
          navigate('/'); // Redirect to home page
        } else {
          console.error('Failed to add card');
        }
      } catch (error) {
        console.error('Error adding card:', error);
      }
    }
  };

  return (
    <main className="add-card-page">
      <h2>Add a New Artwork</h2>
      <form onSubmit={handleAddCard}>
        <label htmlFor="art-title">Title:</label>
        <input
          type="text"
          id="art-title"
          name="title"
          required
          value={card.title}
          onChange={(e) => setCard({ ...card, title: e.target.value })}
        />

        <label htmlFor="artist-name">Artist:</label>
        <input
          type="text"
          id="artist-name"
          name="artist"
          required
          value={card.artist}
          onChange={(e) => setCard({ ...card, artist: e.target.value })}
        />

        <label htmlFor="art-price">Price:</label>
        <input
          type="number"
          id="art-price"
          name="price"
          required
          value={card.price}
          onChange={(e) => setCard({ ...card, price: e.target.value })}
        />

        <label htmlFor="art-description">Description:</label> {/* Add description field */}
        <textarea
          id="art-description"
          name="description"
          required
          value={card.description}
          onChange={(e) => setCard({ ...card, description: e.target.value })}
        />

        <label htmlFor="art-image">Artwork Image:</label>
        <input
          type="file"
          id="art-image"
          name="artImage"
          accept="image/*"
          required
        />

        <button type="submit">Add Artwork</button>
      </form>
    </main>
  );
};

export default AddCard;
