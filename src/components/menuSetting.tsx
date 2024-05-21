import React from 'react';
import Box from '@mui/material/Box';
import {Tab, Tabs, Typography} from "@mui/material";
import styled from "styled-components";
import Divider from "@mui/material/Divider";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



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
const Title = styled.div`
    align-items: center;
    margin-bottom: 10px;
`;


export default function MenuSetting() {
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
                <Divider/>
                <Tab icon={<AccountCircleIcon/>} label='Thông tin cá nhân' value={4} />
                <Tab icon={<ContactPageIcon/>} aria-label='phoneBook' value={5} />
                <Tab icon={<CheckBoxIcon/>} aria-label='checkList' value={6} />
                <Tab icon={<SettingsIcon/>} aria-label='setting' value={7} />
            </Tabs>
            <TabPanel value={value} index={4}>

            </TabPanel>
            <TabPanel value={value} index={5}>
            </TabPanel>
            <TabPanel value={value} index={6}>
                3
            </TabPanel>
            <TabPanel value={value} index={7}>
            </TabPanel>
        </Box>
    );
}
