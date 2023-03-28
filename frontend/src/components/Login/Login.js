import React, { useState } from 'react';
import './Login.css';
import 'animate.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Handle successful login
                console.log('Login successful:', data);
            } else {
                // Handle unsuccessful login
                console.error('Login failed:', data);
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error:', error);
        }
    };


    return (
        <div className="login-background">
            <div className="login-container">
                <h1 className='login-h1'>Login</h1>
                <form className="login-form" onSubmit={handleSubmit}>
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
                    <button type="submit">Let me in!</button>
                </form>
            </div>
        </div>
    );
};

export default Login;

