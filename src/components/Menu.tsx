import React from 'react';
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
import Setting from '../components/Setting'
import MessageMain from "../components/MessageMain";
import Messages from "../components/Messages";
import MessageSetting from "../components/MessageSetting";
import Chat from "../page/Chat";



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

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
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
                    <Avatar
                        src={avatarImage}
                        sx={{ width: 50, height: 50 }}
                    />
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
                3
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Setting/>
            </TabPanel>
        </Box>
    );
}
