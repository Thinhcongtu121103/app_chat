import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPaperPlane, faPhone, faLink} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import {useWebSocket} from "../context/WebSocketContext";
import {getDownloadURL, getStorage, ref, ref as storageRef} from "firebase/storage";
import {equalTo, get, orderByChild, query, ref as dbRef} from "firebase/database";
import {database} from "../firebase";
import Avatar from "@mui/material/Avatar";

const MessageMainStyled = styled.div`
    width: 640px;
    height: 1024px;
    background-color: white;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
`;

type Message = {
    sender: string;
    name: string;
    mes: string;
    createAt: string;
    to: string;
};

type RoomChatData = {
    id: number;
    name: string;
    own: string;
    userList: { id: number; name: string }[];
    chatData: Message[];
};

type MessageMainProps = {
    selectedUser: string | null;
    selectedRoom: string | null;
    messages: Message[];
    onSendMessage: (message: string) => void;
    loggedInUser: string;
    roomChatData: Message[]; // Thêm props roomChatData
};

const MessageMain: React.FC<MessageMainProps> = ({
                                                     selectedUser,
                                                     selectedRoom,
                                                     messages,
                                                     onSendMessage,
                                                     loggedInUser,
                                                     roomChatData
                                                 }) => {
    const [inputMessage, setInputMessage] = useState('');
    const {sendChatMessage, checkUserOnline} = useWebSocket();
    const [isUserOnline, setIsUserOnline] = useState<boolean>(false);
    const [friendName, setFriendName] = useState<string | null>(null);
    const [friendAvt, setFriendAvt] = useState<string | null>(null);
    const [avatarURLfriend, setAvatarURfriend] = useState<string | null>(null);
    const [avatarURLUser, setAvatarURLUser] = useState<string | null>(null);
    const storage = getStorage();

    const pathReferenceUser = ref(storage, '' + localStorage.getItem('img'));
    // Function to check user online status
    const checkOnlineStatus = () => {
        if (selectedUser) {
            checkUserOnline(selectedUser)
                .then((onlineStatus) => {
                    setIsUserOnline(onlineStatus);
                })
                .catch((error) => {
                    console.error('Error checking user online status:', error);
                    setIsUserOnline(false); // Set default to offline if there's an error
                });
        } else {
            setIsUserOnline(false);
        }
    };

    useEffect(() => {
        checkOnlineStatus();
    }, [selectedUser, checkUserOnline]);

    useEffect(() => {
        const interval = setInterval(() => {
            checkOnlineStatus();
        }, 20000); // 20 seconds

        // Clean up the interval when component unmounts or when selectedUser changes
        return () => clearInterval(interval);
    }, [selectedUser, checkUserOnline]);

    const handleSendMessage = () => {
        if (inputMessage.trim() && selectedUser) {
            sendChatMessage('people', selectedUser, inputMessage);
            onSendMessage(inputMessage);
            setInputMessage('');
        } else if (inputMessage.trim() && selectedRoom) {
            sendChatMessage('room', selectedRoom, inputMessage);
            onSendMessage(inputMessage);
            setInputMessage('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    useEffect(() => {
        // Lấy URL của hình ảnh từ pathReference
        getDownloadURL(pathReferenceUser)
            .then(url => {
                setAvatarURLUser(url); // Lưu URL vào state
            })
            .catch(error => {
                console.error('Error getting download URL:', error);
            });
    }, []);

    useEffect(() => {
        const keyQueryUserName = selectedUser;
        if (keyQueryUserName) {
            const usersRef = dbRef(database, 'users');
            let usernameQuery;
            const usernameAsNumber = Number(keyQueryUserName);

            if (!isNaN(usernameAsNumber)) {
                usernameQuery = query(usersRef, orderByChild('username'), equalTo(usernameAsNumber));
            } else {
                usernameQuery = query(usersRef, orderByChild('username'), equalTo(keyQueryUserName));
            }

            get(usernameQuery).then((snapshot) => {
                if (snapshot.exists()) {
                    snapshot.forEach((childSnapshot) => {
                        const userData = childSnapshot.val();
                        setFriendName(userData.name);
                        setFriendAvt(userData.img);

                        const pathReference = storageRef(storage, userData.img);
                        getDownloadURL(pathReference)
                            .then(url => {
                                setAvatarURfriend(url);
                            })
                            .catch(error => {
                                console.error('Error getting download URL:', error);
                            });
                    });
                } else {
                    console.log("No data available");
                    setFriendName(null);
                    setFriendAvt(null);
                }
            }).catch((error) => {
                console.error(error);
                setFriendName(null);
                setFriendAvt(null);
            });
        }
    }, [selectedUser, storage]);


    const sortedMessages = [...messages].sort((a, b) => new Date(a.createAt).getTime() - new Date(b.createAt).getTime());

    const onlineStatusClassName = isUserOnline ? 'bg-green-400' : 'bg-gray-300';

    const renderMessages = () => {
        if (selectedUser) {
            return sortedMessages.length > 0 ? (
                sortedMessages.map((message, index) => (
                    <div
                        key={index}
                        className={`self-stretch py-2 flex ${
                            (message.sender === selectedUser || message.to === selectedUser)
                                ? 'justify-end'
                                : 'justify-start'
                        }`}
                    >
                        {message.sender !== selectedUser && (
                            <div className="w-10 h-10 relative rounded-lg">
                                <div>
                                    {avatarURLUser && (
                                        <Avatar
                                            src={avatarURLUser}
                                            sx={{width: 40, height: 40}}
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                        <div className={`max-w-[70%] p-4 rounded-lg ${
                            (message.sender === selectedUser) ? 'bg-zinc-100 text-black' : 'bg-zinc-100 text-black'
                        }`}>
                            <div className="text-sm font-normal font-['Inter'] leading-[21px]">{message.mes}</div>
                            <div className="text-xs text-gray-500 mt-2">
                                {new Date(message.createAt).toLocaleString()}
                            </div>
                        </div>
                        {message.sender === selectedUser && (
                            <div className="w-10 h-10 relative rounded-lg">
                                <div>
                                    {avatarURLfriend && (
                                        <Avatar
                                            src={avatarURLfriend}
                                            sx={{width: 40, height: 40}}
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div className="self-stretch py-2 flex justify-center">
                    <span className="text-gray-500">No messages available</span>
                </div>
            );
        } else if (selectedRoom && roomChatData) {
            console.log('roomChatData:', roomChatData);
            const sortedRoomMessages = [...roomChatData].sort((a, b) => new Date(a.createAt).getTime() - new Date(b.createAt).getTime());
            return sortedRoomMessages.length > 0 ? (
                sortedRoomMessages.map((message, index) => (
                    console.log('message:', message.name),
                        console.log('loggedInUser:', loggedInUser),
                        <div
                            key={index}
                            className={`self-stretch py-2 flex ${
                                (message.name === loggedInUser) ? 'justify-end' : 'justify-start'
                            }`}
                        >
                            {message.name !== loggedInUser && (
                                <div className="w-10 h-10 relative rounded-lg">
                                    {avatarURLfriend && (
                                        <Avatar
                                            src={avatarURLfriend}
                                            sx={{width: 40, height: 40}}
                                        />
                                    )}
                                </div>
                            )}
                            <div className={`max-w-[70%] p-4 rounded-lg ${
                                (message.name === loggedInUser) ? 'bg-zinc-100 text-black' : 'bg-zinc-100 text-black'
                            }`}>
                                {message.name !== loggedInUser && (
                                    <div className="text-xs font-semibold text-black mb-1">{message.name}</div>
                                )}

                                <div className="text-sm font-normal font-['Inter'] leading-[21px]">{message.mes}</div>
                                <div className="text-xs text-gray-500 mt-2">
                                    {new Date(message.createAt).toLocaleString()}
                                </div>
                            </div>
                            {message.name === loggedInUser && (
                                <div className="w-10 h-10 relative rounded-lg">
                                    {avatarURLUser && (
                                        <Avatar
                                            src={avatarURLUser}
                                            sx={{width: 40, height: 40}}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                ))
            ) : (
                <div className="self-stretch py-2 flex justify-center">
                    <span className="text-gray-500">No messages available</span>
                </div>
            );
        } else {
            return (
                <div className="self-stretch py-2 flex justify-center">
                    <span className="text-gray-500">No messages available</span>
                </div>
            );
        }
    };

    return (
        <MessageMainStyled>
            <div className="w-[640px] h-[700px] bg-white flex-col justify-between items-start inline-flex">
                <div className="flex-col justify-start items-start flex overflow-y-auto">
                    <div
                        className="w-[640px] h-20 p-6 justify-between items-center inline-flex sticky top-0 bg-white z-10">
                        <div className="justify-start items-start gap-4 flex">
                            <div>
                                {avatarURLfriend && (
                                    <Avatar
                                        src={avatarURLfriend}
                                        sx={{width: 40, height: 40}}
                                    />
                                )}
                            </div>
                            <div className="flex-col justify-start items-start inline-flex">
                                <div className="text-black text-xl font-semibold font-['Inter'] leading-[25px]">
                                    {friendName || selectedRoom || 'No User available'}
                                </div>
                                {selectedUser && (
                                    <div className="justify-start items-center gap-2 inline-flex">
                                        <div className={`w-2.5 h-2.5 rounded-full ${onlineStatusClassName}`}></div>
                                        <div
                                            className="opacity-60 text-black text-xs font-semibold font-['Inter'] leading-[18px]">
                                            {isUserOnline ? 'Online' : 'Offline'}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div
                            className="px-4 py-2.5 bg-indigo-500/opacity-10 rounded-lg justify-start items-center gap-2 flex">
                            <div className="w-6 h-6 relative">
                                <FontAwesomeIcon icon={faPhone}/>
                            </div>
                            <div className="text-indigo-500 text-base font-semibold font-['Inter'] leading-tight">Call
                            </div>
                        </div>
                    </div>
                    <div className="w-[640px] h-px opacity-10 bg-black"></div>
                    <div className="w-[640px] h-[693px] p-6 flex-col justify-start items-start gap-8 flex pt-[80px]">
                        {renderMessages()}
                    </div>
                </div>
                <div className="self-stretch p-6 justify-start items-center gap-6 inline-flex">
                    <div className="w-6 h-6 relative">
                        <FontAwesomeIcon icon={faLink}/>
                    </div>
                    <div
                        className="grow shrink basis-0 h-12 px-5 py-2.5 bg-white rounded-xl border-2 border-slate-200 justify-between items-center flex">
                        <input
                            className="w-full bg-transparent outline-none text-black text-sm font-normal font-['Inter'] leading-[21px]"
                            placeholder="Nhập tin nhắn..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <div className="w-6 h-6 relative cursor-pointer" onClick={handleSendMessage}>
                            <FontAwesomeIcon icon={faPaperPlane}/>
                        </div>
                    </div>
                </div>
            </div>
        </MessageMainStyled>

    );
};

export default MessageMain;
