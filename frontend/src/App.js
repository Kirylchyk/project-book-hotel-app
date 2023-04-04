import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';

import Login from './components/Login/Login';
import LoggedInScreen from './components/LoggedInScreen/LoggedInScreen';
import NonLoggedInScreen from './components/NonLoggedInScreen/NonLoggedInScreen';


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
                            <Login onLogin={() => setIsAuthenticated(true)} />
                        )
                    }
                />
                <Route
                    path="/logged-in"
                    element={
                        isAuthenticated ? <LoggedInScreen /> : <Navigate to="/login" />
                    }
                />
            </Routes>
        </Router>
    );
}
export default App;

