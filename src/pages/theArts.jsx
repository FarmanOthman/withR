import React, { useState } from 'react';
import '../styles/arts/arts.css';
import IMG1 from '../assets/IMG/birmingham-museums-trust-sJr8LDyEf7k-unsplash.jpg';
import IMG2 from '../assets/IMG/adrianna-geo-1rBg5YSi00c-unsplash.jpg';

const ArtGallery = () => {
  const [cards, setCards] = useState([
    {
      title: 'Artwork Title 1',
      artist: 'John Doe',
      price: 500,
      imgSrc: IMG1,
    },
    {
      title: 'Artwork Title 2',
      artist: 'Jane Smith',
      price: 750,
      imgSrc: IMG2,
    },
  ]);

  const handleAddCard = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const artist = e.target.artist.value;
    const price = e.target.price.value;
    const file = e.target.artImage.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCards([
          ...cards,
          {
            title,
            artist,
            price,
            imgSrc: event.target.result,
          },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main>
      {/* Show Add Card Button */}
      <section className="show-add-card">
        <button onClick={() => window.location.href = '/add-card'}>
          Add New Artwork
        </button>
      </section>

      {/* Card Section */}
      <section className="card-container">
        {cards.map((card, index) => (
          <div className="card" key={index}>
            <img src={card.imgSrc} alt={card.title} />
            <div className="card-content">
              <h3>{card.title}</h3>
              <p>Artist: {card.artist}</p>
              <p>Price: ${card.price}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default ArtGallery;
