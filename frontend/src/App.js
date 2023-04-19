import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './components/Login/Login';
import LoggedInScreen from './components/LoggedInScreen/LoggedInScreen';
import NonLoggedInScreen from './components/NonLoggedInScreen/NonLoggedInScreen';
import CardDetails from "./components/CardDetails/CardDetails";
import Registration from './components/Registration/Registration';
import AuthorizationHandler from './components/AuthorizationHandler/AuthorizationHandler';


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const storedEmail = localStorage.getItem('userEmail');
        if (isLoggedIn === 'true' && storedEmail) {
            setIsAuthenticated(true);
            setUserEmail(storedEmail);
        }
    }, []);

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<NonLoggedInScreen />} />
                <Route
                    path="/login"
                    element={
                        isAuthenticated ? (
                            <Navigate to="/logged-in" />
                        ) : (
                            <Login onLogin={(email) => {
                                setIsAuthenticated(true);
                                setUserEmail(email);
                                localStorage.setItem('isLoggedIn', true);
                                localStorage.setItem('userEmail', email);
                            }} />
                        )
                    }
                />
                <Route
                    path="/logged-in"
                    element={
                        isAuthenticated ? (
                            <LoggedInScreen userEmail={userEmail} onLogout={handleLogout}/>
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route path="/card/:id"
                       element={<CardDetails />} />

                <Route path="/registration" element={<Registration />} />

                <Route path="/authorization/:id" element={<AuthorizationHandler onLogin={(email) => {
                    setIsAuthenticated(true);
                    setUserEmail(email);
                    localStorage.setItem('isLoggedIn', true);
                    localStorage.setItem('userEmail', email);
                }} />} />

            </Routes>
        </Router>
    );
}
export default App;

