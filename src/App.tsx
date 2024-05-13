import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SlideBar from './components/SlideBar';
import Login from './Login';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Function to handle login
    const handleLogin = () => {
        // Your login logic here
        setIsLoggedIn(true); // Set isLoggedIn to true after successful login
    };

    return (
        <Router>
            <Helmet>
                <title>Trang chủ</title>
                <meta name="description" content="Đây là trang chủ của ứng dụng của bạn." />
                <link rel="icon" href="/favicon.ico" />
            </Helmet>
            <Routes>
                {/* Route to SlideBar component */}
                <Route path="/" element={isLoggedIn ? <SlideBar /> : <Navigate to="/login" />} />
                {/* Route to Login component */}
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
