import React, {useState} from 'react';
import styles from './ChangePasswordLink.module.css';

const ChangePasswordLink = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Simple front-end validation
        if (newPassword !== confirmNewPassword) {
            alert("New password and confirm password do not match");
            return;
        }

        const userId = localStorage.getItem('userId');
        try {
            const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    oldPassword,
                    newPassword,
                }),
            });

            if (response.ok) {
                alert('Password changed successfully');
            } else {
                // This is to handle response codes from API
                const responseData = await response.json();
                alert(responseData.message || 'Failed to change password');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Old password:
                <input type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
            </label>
            <label>
                New password:
                <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </label>
            <label>
                Confirm new password:
                <input type="password" placeholder="Confirm New Password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
            </label>
            <button type="submit">Change password</button>
        </form>
    );
};

export default ChangePasswordLink;
