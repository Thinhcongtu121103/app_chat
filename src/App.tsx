import React, { useEffect } from 'react';
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SlideBar from './components/SlideBar';
import Login from './login/Login';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase';
import AuthProvider from "./context/AuthProvider";
import SlideBarMain from "./components/SlideBarMain";
import Messages from "./components/Messages";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Messages />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
