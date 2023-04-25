import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './CardDetails.module.css';

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

    const images = [card.imageUrl];
    if (card.imageUrl2) {
        images.push(card.imageUrl2);
    }

    return (
        <div className={styles.cardDetails}>
            <a className={styles.Link} href="/">Go to Home Page</a>
            <h1>{card.name}</h1>
            <Carousel>
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`${card.name} - ${index}`} />
                    </div>
                ))}
            </Carousel>
            <p>Price: ${card.price}</p>
            <p>Description: {card.description}</p>
            <p>Size: {card.size} sq. ft.</p>
            <p>Address: {card.address}</p>
            <p>Type: {card.type}</p>
            <button>Click to write a message to the owner</button>
        </div>
    );
};

export default CardDetails;
