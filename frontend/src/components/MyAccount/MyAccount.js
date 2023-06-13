import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MyAccount.module.css';
import ChangePasswordLink from "../ChangePasswordLink/ChangePasswordLink";

const MyAccount = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('userId');
            console.log('User ID from localStorage:', userId);

            if (userId) {
                try {
                    const response = await fetch(`http://localhost:5000/api/users/${userId}`);
                    const data = await response.json();
                    console.log('Data from server:', data);

                    if (response.ok) {
                        setEmail(data.email);
                        setName(data.name);
                        setPhone(data.phone);
                    } else {
                        console.error('Error fetching user data:', data);
                    }
                } catch (error) {
                    console.error('Network error:', error);
                }
            }
        };

        fetchUserData();
    }, []);

    const handlePasswordChangeClick = () => {
        navigate('/change-password');
    };

    return (
        <div className={styles.myAccount}>
            <h2>My Account</h2>
            <p>Email: {email}</p>
            <p>Name: {name}</p>
            <p>Phone: {phone}</p>
            <ChangePasswordLink onClick={handlePasswordChangeClick} />
        </div>
    );
};

export default MyAccount;
