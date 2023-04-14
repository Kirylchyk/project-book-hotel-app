import React from 'react';
import './MyAccount.css';

const MyAccount = ({ email }) => {
    return (
        <div className="my-account">
            <h2> My Account </h2>
            <p> Email: </p>
            <p> {email} </p>
        </div>
    );
};

export default MyAccount;