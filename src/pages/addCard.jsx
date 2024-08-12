import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/arts/addCard.css';

const AddCard = ({ addCard }) => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [card, setCard] = useState({
    title: '',
    artist: '',
    price: '',
    imgSrc: '',
  });

  const handleAddCard = (e) => {
    e.preventDefault();
    const file = e.target.artImage.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        addCard({
          title: card.title,
          artist: card.artist,
          price: card.price,
          imgSrc: event.target.result,
        });
        navigate('/'); // Use navigate instead of history.push
      };
      reader.readAsDataURL(file);
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
