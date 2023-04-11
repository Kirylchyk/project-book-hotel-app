import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './components/Login/Login';
import LoggedInScreen from './components/LoggedInScreen/LoggedInScreen';
import NonLoggedInScreen from './components/NonLoggedInScreen/NonLoggedInScreen';
import CardDetails from "./components/CardDetails/CardDetails";

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
                <Route path="/card/:id"
                       element={<CardDetails />} />
            </Routes>
        </Router>
    );
}
export default App;

