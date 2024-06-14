import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Menu from './components/Menu';
import { WebSocketProvider } from './context/WebSocketContext';
import Login from './page/Login';
import ReLoginHandler from './components/ReLoginHandler';

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <WebSocketProvider>
            <Router>
                <ReLoginHandler setIsLoggedIn={setIsLoggedIn} />
                <Routes>
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/" element={isLoggedIn ? <Menu /> : <Navigate to="/login" />} />
                </Routes>
            </Router>
        </WebSocketProvider>
    );
};

export default App;
