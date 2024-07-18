import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import {TextField, Button} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import PictureInPictureAltIcon from '@mui/icons-material/PictureInPictureAlt';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import backgroundImage from '../assets/backgroundImage.png';
import {getStorage, ref, getDownloadURL} from "firebase/storage";
import {getDatabase, ref as dbRef, set} from "firebase/database"; // Import Firebase Database functions

const Container = styled.div`
    width: 440px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: white;
    border-radius: 8px;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    margin-left: -10px;
`;

const BackgroundImage = styled.div`
    margin: 0px -20px -20px -20px;
`;

const ButtonUpdate = styled.div`
    display: flex;
    text-align: center;
    justify-content: center;
    margin: 10px 0px 10px 0px;
`;

const ChatSettingsPanel: React.FC = () => {
    const [currentUserName, setCurrentUserName] = useState('');
    const [address, setAddress] = useState('');
    const [describe, setDescribe] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [avatarURL, setAvatarURL] = useState<string | null>(null);

    const storage = getStorage();
    const pathReference = ref(storage, '' + localStorage.getItem('img'));

    useEffect(() => {
        const username = localStorage.getItem('currentUserName');
        const addressUser = localStorage.getItem('address');
        const describeUser = localStorage.getItem('describe');
        const phoneNumberUser = localStorage.getItem('phone');

        if (username && addressUser && describeUser && phoneNumberUser) {
            setCurrentUserName(username);
            setAddress(addressUser);
            setDescribe(describeUser);
            setPhoneNumber(phoneNumberUser);
        }
        getDownloadURL(pathReference)
            .then(url => {
                setAvatarURL(url);
            })
            .catch(error => {
                console.error('Error getting download URL:', error);
            });
    }, []);

    const handleSave = () => {
        const db = getDatabase();
        const userRef = dbRef(db, 'users/' + currentUserName); // Path to user data

        set(userRef, {
            username: currentUserName,
            address: address,
            describe: describe,
            phoneNumber: phoneNumber
        }).then(() => {
            alert('User data updated successfully');
        }).catch((error) => {
            console.error('Error updating user data:', error);
        });
    };

    return (
        <Container>
            <BackgroundImage>
                <Avatar
                    src={backgroundImage}
                    sx={{width: 440, height: 170}}
                    variant="square"
                />
            </BackgroundImage>
            <UserInfo>
                {avatarURL && (
                    <Avatar
                        src={avatarURL}
                        sx={{width: 100, height: 100}}
                    />
                )}
                <TextField
                    label="Tên người dùng"
                    variant="outlined"
                    value={currentUserName}
                    onChange={(e) => setCurrentUserName(e.target.value)}
                    sx={{marginLeft: 2, marginTop: 4}}
                />
            </UserInfo>

            <Divider textAlign={"center"}><Chip label="Thông tin cá nhân"/></Divider>

            <List>
                <ListItem>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <TextField
                        label="Địa chỉ"
                        variant="outlined"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <PhoneAndroidIcon/>
                    </ListItemIcon>
                    <TextField
                        label="Số điện thoại"
                        variant="outlined"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <PictureInPictureAltIcon/>
                    </ListItemIcon>
                    <TextField
                        label="Mô tả"
                        variant="outlined"
                        value={describe}
                        onChange={(e) => setDescribe(e.target.value)}
                    />
                </ListItem>
            </List>
        </Container>
    );
};

export default ChatSettingsPanel;
