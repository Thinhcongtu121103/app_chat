import React, {useEffect, useState} from "react";
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import Avatar from "@mui/material/Avatar";
import backgroundImage from '../assets/backgroundImage.png'


const Profile: React.FC = () => {
    const [currentUserName, setCurrentUserName] = useState('');
    const [avatarURL, setAvatarURL] = useState<string | null>(null); // State để lưu URL của Avatar
    const storage = getStorage();
    const pathReference = ref(storage,'' + localStorage.getItem('img'));


    useEffect(() => {
        const username = localStorage.getItem('currentUserName');
        if (username) {
            setCurrentUserName(username);
        }
        // Lấy URL của hình ảnh từ pathReference
        getDownloadURL(pathReference)
            .then(url => {
                setAvatarURL(url); // Lưu URL vào state
            })
            .catch(error => {
                console.error('Error getting download URL:', error);
            });
    }, []);

    return(
                <main className="profile-page" style={
                    {
                        marginTop: '230px',
                        marginLeft:'50px',
                        backgroundColor: ''
                    }
                }>
                    <section className="relative block h-500-px"
                    >
                        <div className="absolute top-0 w-full h-full bg-center bg-cover"
                             style={
                                 {
                                     marginTop: '-250px'

                                 }
                             }
                        >
                                <Avatar
                                    src={backgroundImage}
                                    sx={{width: 1, height:400}}
                                    variant="square"
                                />
                            <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
                        </div>
                        <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px">
                            <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                                <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                            </svg>
                        </div>
                    </section>
                    <section className="relative py-16 bg-blueGray-200">
                        <div className="container mx-auto px-4">
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                                <div className="px-6"
                                style={
                                    {
                                        marginTop: '25px'
                                    }
                                }>
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                            <div className="relative">
                                                {avatarURL && (
                                                    <Avatar
                                                        src={avatarURL}
                                                        sx={{ width: 100, height: 100 }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                            <div className="py-6 px-3 mt-32 sm:mt-0">
                                                <button className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                                    Chỉnh sửa
                                                </button>
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                            <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                                <div className="mr-4 p-3 text-center">
                                                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span className="text-sm text-blueGray-400">Friends</span>
                                                </div>
                                                <div className="mr-4 p-3 text-center">
                                                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span className="text-sm text-blueGray-400">Photos</span>
                                                </div>
                                                <div className="lg:mr-4 p-3 text-center">
                                                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span><span className="text-sm text-blueGray-400">Comments</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center mt-1">
                                        <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                            {currentUserName}
                                        </h3>
                                        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                            <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                            Los Angeles, California
                                        </div>
                                        <div className="mb-2 text-blueGray-600 mt-1">
                                            <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>Solution Manager - Creative Tim Officer
                                        </div>
                                        <div className="mb-2 text-blueGray-600">
                                            <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>University of Computer Science
                                        </div>
                                    </div>
                                    <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full lg:w-9/12 px-4">
                                                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                                    An artist of considerable range, Jenna the name taken by
                                                    Melbourne-raised, Brooklyn-based Nick Murphy writes,
                                                    performs and records all of his own music, giving it a
                                                    warm, intimate feel with a solid groove structure. An
                                                    artist of considerable range.
                                                </p>
                                                <a href="#pablo" className="font-normal text-pink-500">Show more</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
    );
};
export default Profile;
