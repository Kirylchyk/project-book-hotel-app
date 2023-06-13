import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './LoggedInScreen.module.css';
// import MyAccount from '../MyAccount/MyAccount';

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

    // Another useEffect hook
    useEffect(() => {
        localStorage.setItem('isLoggedIn', true);
    }, []);

    const handleFilter = (filterType, value) => {
        if (filterType === 'minPrice') setMinPrice(value);
        if (filterType === 'maxPrice') setMaxPrice(value);
        if (filterType === 'minSize') setMinSize(value);
        if (filterType === 'maxSize') setMaxSize(value);
    };

    const applyFilters = () => {
        // Ensure filter values are not less than 0
        if (minPrice < 0 || maxPrice < 0 || minSize < 0 || maxSize < 0) {
            console.error('Filter values cannot be less than 0');
            alert('Filter values cannot be less than 0');
            return;
        }

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

    const handleAccountClick = () => {
        window.open('/myaccount', '_blank');
    };

    return (
        <div>
            <h1>You are logged in!</h1>

            <button className={styles.Link} onClick={handleAccountClick}>My Account</button>

            <button className={styles.Link} onClick={onLogout}>Log out</button>

            <div className={styles.filters}>
                <label>
                    Min Price: $
                    <input
                        className={styles.filterMin}
                        type="number"
                        value={minPrice}
                        onChange={(e) => handleFilter('minPrice', e.target.value)}
                    />
                </label>
                <label>
                    Max Price: $
                    <input
                        className={styles.filterMax}
                        type="number"
                        value={maxPrice}
                        onChange={(e) => handleFilter('maxPrice', e.target.value)}
                    />
                </label>
                <label>
                    Min Size:
                    <input
                        className={styles.filterMin}
                        type="number"
                        value={minSize}
                        onChange={(e) => handleFilter('minSize', e.target.value)}
                    />
                </label>
                <label>
                    Max Size:
                    <input
                        className={styles.filterMax}
                        type="number"
                        value={maxSize}
                        onChange={(e) => handleFilter('maxSize', e.target.value)}
                    />
                </label>

                <label>
                    Type:
                    <select
                        className={styles.filterMax}
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
            <div className={styles.cardsGrid}>
                {filteredCards.map((card) => (

                        <div className={styles.cardContainer}                    key={card._id}>
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