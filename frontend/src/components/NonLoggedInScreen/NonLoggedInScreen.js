import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NonLoggedInScreen.css';

const NonLoggedInScreen = () => {
    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/cards');
                const data = await response.json();
                setCards(data);
                setFilteredCards(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleFilter = () => {
        setFilteredCards(
            cards.filter(
                (card) =>
                    (minPrice === '' || card.price >= minPrice) &&
                    (maxPrice === '' || card.price <= maxPrice)
            )
        );
    };

    const openCardWindow = (card) => {
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`
      <style>
        body {
          font-family: Arial, sans-serif;
        }
        h1 {
          font-size: 28px;
          margin-bottom: 10px;
        }
        img {
          max-width: 100%;
          height: auto;
          border-radius: 5px;
        }
        p {
          font-size: 18px;
          margin-bottom: 10px;
        }
      </style>
      <h1>${card.name}</h1>
      <img src="${card.imageUrl}" alt="${card.name}" />
      <p>Price: $${card.price}</p>
      <p>Description: ${card.description}</p>
      <p>Size: ${card.size} sq. ft.</p>
      <p>Address: ${card.address}</p>
    `);
    };

    return (
        <div>
            <h1>Welcome to the Home Page, NonLoggedIn User!</h1>
            <Link className="Link" to="/login">Login Here</Link>
            <div className="filters">
                <label>
                    Min Price: $
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                </label>
                <label>
                    Max Price: $
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </label>
                <button onClick={handleFilter}>Filter</button>
            </div>
            <div className="cards-grid">
                {filteredCards.map((card) => (
                    <div className="card-container" key={card._id} onClick={() => openCardWindow(card)}>
                        <img src={card.imageUrl} alt={card.name} />
                        <h3>{card.name}</h3>
                        <p>Description: {card.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NonLoggedInScreen;


