// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { WebSocketProvider } from './context/WebSocketContext';
import Chat from './page/Chat';
import Login from './page/Login';

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <WebSocketProvider>
                <Routes>
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    {isLoggedIn ? (
                        <Route path="/" element={<Chat />} />
                    ) : (
                        <Route path="/" element={<Navigate to="/login" />} />
                    )}
                </Routes>
            </WebSocketProvider>
        </Router>
    );
};

export default App;
