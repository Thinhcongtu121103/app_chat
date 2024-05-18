import React from 'react';
import { Helmet } from 'react-helmet';
import styled from "styled-components";
import Button from "@mui/material/Button";
import WhatsAppLogo from "../assets/whatsapplogo.png";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled.div`
    /* Add CSS styles for container */
    height: 100vh;
    display: grid;
    place-items: center;
    background-color: whitesmoke
`;

const StyledLoginContainer = styled.div`
    /* Add CSS styles for login container */
    padding: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 4px 14px -3px rgba(0,0,0,0.7);
`;

const StyledImageWapper = styled.div`
    /* Add CSS styles for image wrapper */
    margin-bottom: 50px;
`;

const StyledImage = styled.img`
    /* Add CSS styles for the image */
    width: 200px;
    height: 200px;
    /* Add other styles as needed */
`;

const Login = () => {
    const [signInWithGoogle, _user, _loading, _error] = useSignInWithGoogle(auth);
    const navigate = useNavigate(); // Initialize useNavigate hook

    const signIn = async () => {
        await signInWithGoogle();
        navigate('/'); // Redirect to "/"
    };

    return (
        <StyledContainer>
            <Helmet>
                <title>Trang chủ</title>
                <meta name="description" content="Đây là trang chủ của ứng dụng của bạn." />
                <link rel="icon" href="/favicon.ico" />
            </Helmet>

            <StyledLoginContainer>
                <StyledImageWapper>
                    <StyledImage src={WhatsAppLogo} alt='WhatsApp Logo'/>
                </StyledImageWapper>
                <Button variant='outlined' onClick={signIn}>
                    Sign in with Google
                </Button>
            </StyledLoginContainer>
        </StyledContainer>
    );
};

export default Login;
