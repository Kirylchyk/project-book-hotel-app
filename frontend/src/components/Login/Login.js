import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import 'animate.css';
import RecoverPassword from "../RecoverPassword/RecoverPassword";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        async function handleAuthorization() {
            const path = window.location.pathname;
            if (path.includes('/authorization/')) {
                const userId = path.split('/authorization/')[1];
                try {
                    const response = await fetch(`http://localhost:5000/authorization/${userId}`);
                    const data = await response.json();
                    if (data.message === 'User authorized successfully') {
                        onLogin(data.user.email);
                    }
                } catch (error) {
                    console.error('Error handling authorization:', error);
                }
            }
        }
        handleAuthorization();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        //API sending request
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            //API handle responses
            if (response.ok) {
                // Handle successful login
                console.log('Login successful:', data);
                localStorage.setItem('userId', data.user._id); // Save the user ID to local storage
                onLogin(email);
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
        <div className={styles.loginBackground}>
            <a className={styles.Link} href="/">Go to Home Page</a>
            <div className={styles.loginContainer}>

                <div className={styles.formsContainer}>
                    <form className={styles.loginForm} onSubmit={handleSubmit}>
                        <div className={styles.loginHeaderContainer}>
                            <h1 className={styles.loginH1}>Login</h1>
                        </div>
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
                    <Link to="/registration">Create an account</Link>

                    </form>

                    <RecoverPassword />

                </div>
            </div>
        </div>
    );
};

export default Login;

