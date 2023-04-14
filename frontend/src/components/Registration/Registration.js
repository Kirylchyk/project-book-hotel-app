import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Registration.css';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/users/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Registration successful:', data);
                // success message
            } else {
                console.error('Registration failed:', data);
                //  error message
            }
        } catch (error) {
            console.error('Network error:', error);
            // error message
        }
    };


    return (
        <div className="registration-container">
            <a className="Link" href="/">Go to Home Page</a>

            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>

        </div>
    );
};

export default Registration;