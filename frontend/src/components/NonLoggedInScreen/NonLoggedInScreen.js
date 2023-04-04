import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NonLoggedInScreen.css';

const NonLoggedInScreen = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/cards');
                const data = await response.json();
                setCards(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Welcome to the Home Page, NonLoggedIn User!</h1>
            <a className="Link" href="/login">Login Here</a>
            <div className="cards-grid">
                {cards.map((card) => (
                    <div key={card._id} className="card-container">
                        <h3>{card.name}</h3>
                        <img src={card.imageUrl} alt={card.name} />
                        <p>Price: {card.price}</p>
                        <p>Size: {card.size}</p>
                        <p>Address: {card.address}</p>
                        <p>Description: {card.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NonLoggedInScreen;

