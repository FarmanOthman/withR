import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/arts/arts.css';

const ArtGallery = () => {
  // State hooks
  const [cards, setCards] = useState([]);
  const [editCard, setEditCard] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    price: '',
    description: '',
    artImage: null
  });
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await axios.get('/api/cards');
      setCards(response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const handleSearch = () => {
    const filtered = cards.filter(card =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.id.toString().includes(searchQuery)
    );
    setSearchResults(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/cards/${id}`);
      fetchCards();
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const handleEdit = (card) => {
    setEditCard(card);
    setFormData({
      title: card.title,
      artist: card.artist,
      price: card.price,
      description: card.description,
      artImage: null
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach(key => {
      form.append(key, formData[key]);
    });

    try {
      await axios.put(`/api/cards/${editCard.id}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setEditCard(null);
      fetchCards();
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  const handleCardClick = (card) => setSelectedCard(card);
  const closeModal = () => setSelectedCard(null);
  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults(cards);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      artImage: e.target.files[0]
    }));
  };

  return (
    <>
      <div className="art-gallery">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by title or ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>Search</button>
          {searchQuery && <button className="clear-button" onClick={handleClearSearch}>Clear</button>}
        </div>

        <div className="card-container">
          {searchResults.length > 0 ? (
            searchResults.map((card) => (
              <div key={card.id} className="card" onClick={() => handleCardClick(card)}>
                <img src={card.img_url} alt={card.title} />
                <div className="card-content">
                  <h3>{card.title}</h3>
                  <p>ID: {card.id}</p>
                  <p>Artist: {card.artist}</p>
                  <p>Price: ${card.price}</p>
                  <p>{card.description}</p>
                  <button className="edit-button" onClick={(e) => { e.stopPropagation(); handleEdit(card); }}>
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={(e) => { e.stopPropagation(); handleDelete(card.id); }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No items found.</p>
          )}
        </div>

        {selectedCard && (
          <div className="modal open">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <img src={selectedCard.img_url} alt={selectedCard.title} />
              <h3>{selectedCard.title}</h3>
              <p>ID: {selectedCard.id}</p>
              <p>Artist: {selectedCard.artist}</p>
              <p>Price: ${selectedCard.price}</p>
              <p>{selectedCard.description}</p>
            </div>
          </div>
        )}

        {editCard && (
          <div className={`form-edit-card ${editCard ? 'open' : ''}`}>
            <form onSubmit={handleUpdate}>
              <div className="form-field">
                <label>
                  Title:
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-field">
                <label>
                  Artist:
                  <input
                    type="text"
                    name="artist"
                    value={formData.artist}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-field">
                <label>
                  Price:
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-field">
                <label>
                  Description:
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-field">
                <label>
                  Art Image:
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <div className="form-actions">
                <button type="submit" className="edit-button">Update Card</button>
                <button type="button" className="cancel-button" onClick={() => setEditCard(null)}>Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default ArtGallery;
