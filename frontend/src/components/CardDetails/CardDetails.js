import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './CardDetails.css';

const CardDetails = () => {
    const [card, setCard] = useState(null);
    const { id } = useParams(); // useParams to get the id from the URL

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/cards/${id}`
                );
                const data = await response.json();
                setCard(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchCard();
    }, [id]);

    if (!card) {
        return <div>Loading...</div>;
    }

    return (

        <div className="card-details">
            <a className="Link" href="/">Go to Home Page</a>
            <h1>{card.name}</h1>
            <img src={card.imageUrl} alt={card.name} />
            <p>Price: ${card.price}</p>
            <p>Description: {card.description}</p>
            <p>Size: {card.size} sq. ft.</p>
            <p>Address: {card.address}</p>
            <p>Type: {card.type}</p>
            <button>Register to write a message to the owner</button>
        </div>
    );
};

export default CardDetails;
