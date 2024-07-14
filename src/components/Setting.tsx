import React from 'react';
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import {ListItemText, Switch} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import WcIcon from '@mui/icons-material/Wc';
import CakeIcon from '@mui/icons-material/Cake';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import avatarImage from '../assets/avatar.png';
import backgroundImage from '../assets/backgroundImage.png'



const Container = styled.div`
    width: 440px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    background-color: white;
    border-radius: 8px;
    
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    margin-left: -10px;
`;
const TitleInfo = styled.div`
    display: flex;
    text-align: center;
    justify-content: space-between;
`;

const UserName = styled.div`
    margin-left: 10px;
    font-size: 20px;
    font-weight: bold;
`;
const Title = styled.div`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
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
    const [notifications, setNotifications] = React.useState(true);
    const [blocked, setBlocked] = React.useState(false);

    const handleToggleNotifications = () => {
        setNotifications(!notifications);
    };

    const handleToggleBlocked = () => {
        setBlocked(!blocked);
    };

    return (
        <Container>
            <TitleInfo>
                <Title>Thông tin tài khoản</Title>
                <ClearIcon/>
            </TitleInfo>

            <BackgroundImage>
                <Avatar
                src={backgroundImage}
                sx={{width: 440, height:170}}
                variant="square"
                />
            </BackgroundImage>
            <UserInfo>
                <Avatar 
                    src={avatarImage}
                    sx={{ width: 100, height: 100 }}
                />
                <UserName>Cù Thị Mỹ Uyên</UserName>
                <BorderColorOutlinedIcon sx={{marginLeft:2}}/>
            </UserInfo>
            <Divider textAlign={"center"}><Chip label="Thông tin cá nhân" /></Divider>
            <List>
                <ListItem>
                    <ListItemIcon>
                        <WcIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Nam" />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <CakeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="24 tháng 12 năm 2003" />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <PhoneAndroidIcon/>
                    </ListItemIcon>
                    <ListItemText primary="+84 394 707 535" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Chỉ bạn bè có lưu số của bạn trong danh bạ máy mới xem được số này" />
                </ListItem>
            </List>
            <Divider/>
            <ButtonUpdate>
                <BorderColorOutlinedIcon/>
                <Title style={{marginLeft:4}}>Cập nhật</Title>
            </ButtonUpdate>
        </Container>
    );
};

export default ChatSettingsPanel;
