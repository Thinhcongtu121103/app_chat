import React from 'react';
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVerticalIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";
import { auth } from "../config/firebase";
import { useNavigate } from 'react-router-dom';


// Define styled components
const StyledContainer = styled.div`
    /* Add CSS styles for container */
    height: 100vh;
    min-width: 300px;
    max-width: 350px;
    overflow-y: scroll;
    border-right: 1px solid whitesmoke;
`;

const StyledHeader = styled.div`
    /* Add CSS styles for header */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;

`;

const StyledSearch = styled.div`
    /* Add CSS styles for search */
    display: flex;
    align-items: center;
    padding: 15px;
    border-radius: 2px;
`;

const StyledSearchInput = styled.input`
    /* Add CSS styles for search input */
    outline: none;
    border: none;
    flex: 1;

`;


const StyledSideBarButton = styled(Button)`
    /* Add CSS styles for sidebar button */
    width: 100%;
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
`;
const StyledUserAvatar = styled(Avatar)`
    /* Add CSS styles for user avatar */
    cursor:  pointer;
    :hover {
        opacity: 0.8;
    }
`;
// Sidebar Component
const SlideBar: React.FC = () => {
    const navigate = useNavigate();
    const logout = async () => {
        try {
            await auth.signOut();
            navigate('/login');
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <StyledContainer>
            <StyledHeader>
                <Tooltip title='User email' placement='right'>
                    <StyledUserAvatar />
                </Tooltip>
                <div>
                    <IconButton>
                        <ChatIcon></ChatIcon>
                    </IconButton>
                    <IconButton>
                        <MoreVerticalIcon></MoreVerticalIcon>
                    </IconButton>
                    <IconButton onClick={logout}>
                        <LogoutIcon />
                    </IconButton>
                </div>
            </StyledHeader>
            <StyledSearch>
                <SearchIcon />
                <StyledSearchInput placeholder='Search in conversations' />
            </StyledSearch>
            <StyledSideBarButton>
                Start a new Conversations
            </StyledSideBarButton>
        </StyledContainer>
    );
};

export default SlideBar;
