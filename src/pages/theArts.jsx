import React, { useState, useEffect } from 'react';
import '../styles/arts/arts.css';

const ArtGallery = () => {
  const [cards, setCards] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('/api/cards');
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  const openModal = (card) => {
    setSelectedCard(card);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <main>
      <section className="show-add-card">
        <button onClick={() => window.location.href = '/add-card'}>
          Add New Artwork
        </button>
      </section>

      <section className="card-container">
        {cards.length > 0 ? (
          cards.map((card) => (
            <div className="card" key={card.id} onClick={() => openModal(card)}>
              <img src={card.img_url} alt={card.title} />
              <div className="card-content">
                <h3>{card.title}</h3>
                <p>Artist: {card.artist}</p>
                <p>Price: ${card.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No artworks available</p>
        )}
      </section>

      {modalOpen && selectedCard && (
        <div className={`modal ${modalOpen ? 'open' : ''}`}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <img src={selectedCard.img_url} alt={selectedCard.title} />
            <h3>{selectedCard.title}</h3>
            <p>Artist: {selectedCard.artist}</p>
            <p>Price: ${selectedCard.price}</p>
            <p>{selectedCard.description}</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default ArtGallery;
