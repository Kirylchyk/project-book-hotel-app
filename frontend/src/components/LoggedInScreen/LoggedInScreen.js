import React from 'react';
import { Link } from 'react-router-dom';

const LoggedInScreen = () => {
    return (
        <div>
            <h1>You are logged in!</h1>
            <Link to="/">Go back to Home Page</Link>
        </div>
    );
};

export default LoggedInScreen;