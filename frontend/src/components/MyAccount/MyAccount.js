import React from 'react';
import styles from './MyAccount.module.css';

const MyAccount = ({ email }) => {
    return (
        <div className={styles.myAccount}>
            <h2> My Account </h2>
            <p> Email: </p>
            <p> {email} </p>
        </div>
    );
};

export default MyAccount;