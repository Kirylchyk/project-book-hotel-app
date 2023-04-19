import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NonLoggedInScreen.css';

const NonLoggedInScreen = () => {
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

    // const openCardWindow = (cardId) => {
    //     const newWindow = window.open(`/card/${cardId}`, "_blank");
    //     newWindow.focus();
    // };

    // const openCardWindow = (card) => {
    //     const newWindow = window.open('', '_blank');
    //     newWindow.document.write(`
    //   <style>
    //     body {
    //       font-family: Arial, sans-serif;
    //     }
    //     h1 {
    //       font-size: 28px;
    //       margin-bottom: 10px;
    //     }
    //     img {
    //       max-width: 100%;
    //       height: auto;
    //       border-radius: 5px;
    //     }
    //     p {
    //       font-size: 18px;
    //       margin-bottom: 10px;
    //     }
    //   </style>
    //   <h1>${card.name}</h1>
    //   <img src="${card.imageUrl}" alt="${card.name}" />
    //   <p>Price: $${card.price}</p>
    //   <p>Description: ${card.description}</p>
    //   <p>Size: ${card.size} sq. ft.</p>
    //   <p>Address: ${card.address}</p>
    //   <p>Type: ${card.type}</p>
    //   <button>Register to write a message to the owner</button>
    // `);
    // };

    return (
        <div>
            <h1>Welcome to Home Page, NonLoggedIn User!</h1>
            <Link className="Link" to="/login">Login Here</Link>

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
                    <Link to={`/card/${card._id}`} key={card._id}>
                        <div className="card-container">
                            <img src={card.imageUrl} alt={card.name} />
                            <h3>{card.name}</h3>
                            <p>Description: {card.description}</p>
                            <p>Price: {card.price}</p>
                        </div>
                    </Link>
            ))}
            </div>
        </div>
    );
};

export default NonLoggedInScreen;



