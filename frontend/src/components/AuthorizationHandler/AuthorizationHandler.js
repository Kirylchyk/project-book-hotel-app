import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthorizationHandler = ({ onLogin }) => {
    const navigate = useNavigate();

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
                        navigate('/logged-in');
                    } else {
                        navigate('/login');
                    }
                } catch (error) {
                    console.error('Error handling authorization:', error);
                    navigate('/login');
                }
            }
        }
        handleAuthorization();
    }, [navigate, onLogin]);

    return null;
};

export default AuthorizationHandler;

