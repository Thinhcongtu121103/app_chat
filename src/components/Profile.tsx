import React, {useEffect, useState} from "react";
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import Avatar from "@mui/material/Avatar";
import backgroundImage from '../assets/backgroundImage.png'
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Setting from '../components/Setting';
import HomeIcon from "@mui/icons-material/Home";
import ListItemIcon from "@mui/material/ListItemIcon";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const Profile: React.FC = () => {
    const [currentUserName, setCurrentUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [describe, setDescribe] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [avatarURL, setAvatarURL] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
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
            setPhoneNumber(phoneNumberUser)
        }
        getDownloadURL(pathReference)
            .then(url => {
                setAvatarURL(url);
            })
            .catch(error => {
                console.error('Error getting download URL:', error);
            });
    }, [pathReference]);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    return (
        <main className="profile-page" style={{marginTop: '230px', marginLeft: '50px'}}>
            <section className="relative block h-500-px">
                <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{marginTop: '-250px'}}>
                    <Avatar
                        src={backgroundImage}
                        sx={{width: 1, height: 400}}
                        variant="square"
                    />
                    <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
                </div>
                <div
                    className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px">
                    <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg"
                         preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                        <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                </div>
            </section>
            <section className="relative py-16 bg-blueGray-200">
                <div className="container mx-auto px-4">
                    <div
                        className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                        <div className="px-6" style={{marginTop: '25px'}}>
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                    <div className="relative">
                                        {avatarURL && (
                                            <Avatar
                                                src={avatarURL}
                                                sx={{width: 100, height: 100}}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                    <div className="py-6 px-3 mt-32 sm:mt-0">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleDialogOpen}
                                        >
                                            Chỉnh sửa
                                        </Button>
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                        <div className="mr-4 p-3 text-center">
                                            <span
                                                className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span>
                                            <span className="text-sm text-blueGray-400">Friends</span>
                                        </div>
                                        <div className="mr-4 p-3 text-center">
                                            <span
                                                className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span>
                                            <span className="text-sm text-blueGray-400">Photos</span>
                                        </div>
                                        <div className="lg:mr-4 p-3 text-center">
                                            <span
                                                className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span>
                                            <span className="text-sm text-blueGray-400">Comments</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-1">
                                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                    {currentUserName}
                                </h3>
                                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                    <ListItemIcon className="mr-5 text-lg text-blueGray-400">
                                        <HomeIcon/> {address}
                                    </ListItemIcon>
                                </div>
                                <div className="mb-2 text-blueGray-600 mt-1">
                                    <ListItemIcon className="mr-5 text-lg text-blueGray-400">
                                        <PhoneAndroidIcon/> {phoneNumber}
                                    </ListItemIcon>
                                </div>
                            </div>
                            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-9/12 px-4">
                                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                            {describe}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <BootstrapDialog
                onClose={handleDialogClose}
                aria-labelledby="customized-dialog-title"
                open={dialogOpen}
            >

                <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                    Thông tin tài khoản
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleDialogClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
                <DialogContent dividers>
                    <Setting/>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleDialogClose}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </main>
    );
};

export default Profile;
