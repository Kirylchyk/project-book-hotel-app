import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LoggedInScreen.css';
import MyAccount from '../MyAccount/MyAccount';

const LoggedInScreen = ({ userEmail, onLogout }) => {
    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minSize, setMinSize] = useState('');
    const [maxSize, setMaxSize] = useState('');
    const [type, setType] = useState('');

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

    const handleFilter = (filterType, value) => {
        if (filterType === 'minPrice') setMinPrice(value);
        if (filterType === 'maxPrice') setMaxPrice(value);
        if (filterType === 'minSize') setMinSize(value);
        if (filterType === 'maxSize') setMaxSize(value);
    };

    const applyFilters = () => {
        const filtered = cards.filter(card => {
            const priceInRange =
                (!minPrice || card.price >= minPrice) &&
                (!maxPrice || card.price <= maxPrice);
            const sizeInRange =
                (!minSize || card.size >= minSize) &&
                (!maxSize || card.size <= maxSize);
            const typeMatches = !type || card.type === type;
            return priceInRange && sizeInRange && typeMatches;
        });

        setFilteredCards(filtered);
    };

    console.log(userEmail)

    return (
        <div>
            <h1>You are logged in!</h1>

            <MyAccount email={userEmail} />

            <button className="Link" onClick={onLogout}>Log out</button>

            <div className="filters">
                <label>
                    Min Price: $
                    <input
                        className="filter-min"
                        type="number"
                        value={minPrice}
                        onChange={(e) => handleFilter('minPrice', e.target.value)}
                    />
                </label>
                <label>
                    Max Price: $
                    <input
                        className="filter-max"
                        type="number"
                        value={maxPrice}
                        onChange={(e) => handleFilter('maxPrice', e.target.value)}
                    />
                </label>
                <label>
                    Min Size:
                    <input
                        className="filter-min"
                        type="number"
                        value={minSize}
                        onChange={(e) => handleFilter('minSize', e.target.value)}
                    />
                </label>
                <label>
                    Max Size:
                    <input
                        className="filter-max"
                        type="number"
                        value={maxSize}
                        onChange={(e) => handleFilter('maxSize', e.target.value)}
                    />
                </label>

                <label>
                    Type:
                    <select
                        className="filter-max"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Room">Room</option>
                        <option value="Hotel">Hotel</option>
                    </select>
                </label>

                <button onClick={applyFilters}>Filter</button>
            </div>
            <div className="cards-grid">
                {filteredCards.map((card) => (

                        <div className="card-container" key={card._id}>
                            <Link to={`/card/${card._id}`} key={card._id}>
                            <img src={card.imageUrl} alt={card.name} />
                            </Link>
                            <h3>{card.name}</h3>
                            <p>Description: {card.description}</p>
                            <p>Price: {card.price}</p>
                        </div>
                ))}
            </div>

        </div>
    );
};

export default LoggedInScreen;