import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Registration.module.css';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userId, setUserId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/users/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, name, phone }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Registration successful:', data);
                setUserId(data._id);
                setIsModalOpen(true);
            } else {
                console.error('Registration failed:', data);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const Modal = () => {
        return (
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <h3>Authorization Link</h3>
                    <p>
                        Please click on the following link to complete the
                        registration process:
                    </p>
                    <a href={`http://localhost:5000/api/authorization/${userId}`} target="_blank" rel="noopener noreferrer">
                        Authorization Link
                    </a>
                    <button onClick={toggleModal}>Close</button>
                </div>
            </div>
        );
    };


    return (
        <div className={styles.registrationContainer}>
            <Link className={styles.Link} to="/">Go to Home Page</Link>

            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="name"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="phone"
                    placeholder="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>

            {isModalOpen && <Modal />}
        </div>
    );
};

export default Registration;
