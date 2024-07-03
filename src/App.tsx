import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { WebSocketProvider, useWebSocket } from './context/WebSocketContext';
import Chat from './page/Chat';
import Login from './page/Login';
import Register from './page/Register'; // Import Register component
import Menu from './components/Menu';

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const reLoginCode = localStorage.getItem('reLoginCode');
        const username = localStorage.getItem('username');

        if (reLoginCode && username) {
            // Gửi mã re_login_code và thông tin người dùng tới máy chủ WebSocket
            // WebSocket sẽ xác nhận và xử lý mã này, sau đó gửi lại một phản hồi
            // Việc xác nhận sẽ được xử lý trong useEffect bên dưới
        }
    }, []);

    return (
        <Router>
            <WebSocketProvider>
                <Routes>
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/register" element={<Register />} /> {/* Thêm Route cho trang /register */}
                    <Route path="/" element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
                        <Route path="/" element={<Menu />} />
                    </Route>
                </Routes>
                <ReLogin setIsLoggedIn={setIsLoggedIn} />
            </WebSocketProvider>
        </Router>
    );
};

const PrivateRoute: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
    return isLoggedIn ? <Menu /> : <Navigate to="/login" />;
};

const ReLogin: React.FC<{ setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setIsLoggedIn }) => {
    const { lastMessage } = useWebSocket();

    useEffect(() => {
        if (lastMessage && lastMessage.event === 'LOGIN') {
            if (lastMessage.status === 'success') {
                console.log('Re-login successful');
                setIsLoggedIn(true);
            } else {
                console.log('Re-login status:', lastMessage.status);
            }
        }
    }, [lastMessage, setIsLoggedIn]);

    return null;
};

export default App;
