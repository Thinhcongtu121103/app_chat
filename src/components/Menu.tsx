import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import {Tab, Tabs, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import avatarImage from "../assets/avatar.png";
import styled from "styled-components";
import Divider from "@mui/material/Divider";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Setting from '../components/Setting';
import MessageMain from "../components/MessageMain";
import Messages from "../components/Messages";
import MessageSetting from "../components/MessageSetting";
import Chat from "../page/Chat";
import {useWebSocket} from "../context/WebSocketContext";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import {database} from "../firebase";
import {equalTo, get, orderByChild, query} from "firebase/database";
import Profile from "./Profile";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
`;

export default function VerticalTabs() {
    const [value, setValue] = React.useState(0);
    const [openDialog, setOpenDialog] = useState(false); // State for dialog open/close
    const { sendMessage, logout } = useWebSocket();
    const navigate = useNavigate();
    const [avatarURL, setAvatarURL] = useState<string | null>(null); // State để lưu URL của Avatar
    const storage = getStorage();
    const pathReference = ref(storage,'' + localStorage.getItem('img'));

    useEffect(() => {
        if (pathReference) {
            getDownloadURL(pathReference)
                .then(url => {
                    setAvatarURL(url);
                })
                .catch(error => {
                    console.error('Error getting download URL:', error);
                });
        }
    }, [pathReference]);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const handleLogout = () => {
        logout();
        setValue(0);
        navigate('/login');
        window.location.reload(); // Optional: Reload the page after logout
    };
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <Box
            mt={4}
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex'}}
        >
            <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                aria-label="icon tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <UserInfo>
                    {avatarURL && (
                        <Avatar
                            src={avatarURL}
                            sx={{ width: 50, height: 50 }}
                        />
                    )}
                </UserInfo>
                <Divider/>
                <Tab icon={<ChatBubbleOutlineIcon/>} aria-label='message' value={0} />
                <Tab icon={<ContactPageIcon/>} aria-label='phoneBook' value={1} />
                <Tab icon={<CheckBoxIcon/>} aria-label='checkList' value={2} />
                <Tab icon={<SettingsIcon/>} aria-label='setting' value={3} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Chat/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Setting/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Profile/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Setting/>
            </TabPanel>
            <Box sx={{ position: 'absolute', bottom: 20, left: 10,  }}>
                <Button
                    variant="contained"
                    // color="primary"
                    startIcon={<ExitToAppIcon />}
                    onClick={handleOpenDialog}
                >
                </Button>
            </Box>

            {/* Logout confirmation dialog */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to logout?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleLogout} color="primary" autoFocus>
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>

    );
}
