import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecoverPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/users/recover-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                // Redirect user to the PasswordResetForm component
                navigate('/reset-password');
            } else {
                // Handle unsuccessful email recovery
                console.error('Recover password failed:', data);
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error:', error);
        }
    };

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Send recovery email</button>
            </form>
        </div>
    );
};

export default RecoverPassword;

