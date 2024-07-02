import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useWebSocket } from '../context/WebSocketContext';

type MessagesComponentProps = {
    onSelectUser: (userName: string, messages: any[]) => void;
    showUserSelection: boolean;
};

const MessagesComponent: React.FC<MessagesComponentProps> = ({ onSelectUser }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState<any[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [roomCreated, setRoomCreated] = useState(false);
    const { sendMessage, userList, createRoom, fetchPeopleChatMessages, onMessage } = useWebSocket();

    const [currentSelectedUser, setCurrentSelectedUser] = useState<string>(''); // State để lưu trữ người dùng hiện tại được chọn

    useEffect(() => {
        if (isLoggedIn) {
            console.log('Fetching user list...');
            sendMessage({
                action: 'onchat',
                data: {
                    event: 'GET_USER_LIST'
                }
            });
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (roomCreated) {
            console.log('Room created, fetching user list again...');
            sendMessage({
                action: 'onchat',
                data: {
                    event: 'GET_USER_LIST'
                }
            });
            setRoomCreated(false);
        }
    }, [roomCreated, sendMessage]);

    useEffect(() => {
        const handleNewMessage = (data: any) => {
            if (data.event === 'GET_PEOPLE_CHAT_MES') {
                if (data.data && data.data.length > 0) {
                    onSelectUser(currentSelectedUser, data.data);
                } else {
                    onSelectUser('', []);
                }
            }

            // Kiểm tra xem tin nhắn mới nhận có phải của người dùng hiện tại hay không
            if (data.sender === currentSelectedUser || data.to === currentSelectedUser) {
                // Xử lý tin nhắn mới ở đây (ví dụ: cập nhật state messages)
            }
        };

        onMessage(handleNewMessage);

        return () => {
            // Cleanup listener
        };
    }, [onMessage, onSelectUser, currentSelectedUser]);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const handleCreateRoom = () => {
        createRoom(roomName);
        setRoomCreated(true);
        setIsPopupOpen(false);
        setRoomName('');
    };

    const handleUserClick = (userName: string) => {
        setCurrentSelectedUser(userName); // Cập nhật người dùng hiện tại được chọn
        fetchPeopleChatMessages(userName, 1)
            .then(messages => {
                setMessages(messages);
            })
            .catch(() => {
                alert('User is unavailable');
            });
    };

    useEffect(() => {
        setIsLoggedIn(true);
    }, []);

    return (
        <div className="w-[349px] h-[700px] overflow-y-auto bg-white shadow flex-col justify-start items-center inline-flex">
            <div className="flex-col justify-start items-start flex w-full">
                <div className="w-full justify-between items-center inline-flex sticky top-0 bg-white z-10 px-7">
                    <div className="justify-start items-center gap-2.5 flex">
                        <div className="justify-start items-center gap-1.5 flex">
                            <div className="text-black text-xl font-semibold font-['Inter'] leading-[30px]">
                                Messages
                            </div>
                            <div className="w-4 h-4 relative" />
                        </div>
                        <div className="px-2 py-0.5 bg-slate-100 rounded-3xl flex-col justify-start items-start gap-2.5 inline-flex">
                            <div className="text-black text-xs font-semibold font-['Inter'] leading-[18px]">{userList.length}</div>
                        </div>
                    </div>
                    <div
                        className="flex items-center justify-center w-16 h-16 relative text-blue-500 text-3xl cursor-pointer"
                        onClick={togglePopup}
                    >
                        <FontAwesomeIcon icon={faCirclePlus} />
                    </div>
                </div>
            </div>
            <div className="self-stretch flex-col justify-start items-start flex overflow-y-auto">
                <div className="self-stretch h-[72px] px-6 py-3 flex-col justify-center items-start gap-2.5 flex">
                    <input
                        className="flex-1 text-neutral-500 text-base font-normal font-['Inter'] leading-normal outline-none"
                        placeholder="Search"
                        type="text"
                    />
                </div>
                {userList.map((user, index) => (
                    <div
                        key={index}
                        className="self-stretch justify-between items-center inline-flex cursor-pointer"
                        onClick={() => handleUserClick(user.name)}
                    >
                        <div className="px-6 py-3 justify-start items-center gap-2.5 flex">
                            <div className="w-11 h-11 relative">
                                <img className="w-10 h-10 relative rounded-[10px]"
                                     src="https://via.placeholder.com/40x40" alt="user"/>
                            </div>
                            <div className="flex-col justify-start items-start gap-1 flex">
                            <div className="text-neutral-900 text-base font-semibold font-['Inter'] leading-normal">
                                    {user.name}
                                </div>
                                {/*<div className="text-neutral-700 text-sm font-normal font-['Inter'] leading-tight">*/}
                                {/*    Online*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {isPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-80">
                        <h2 className="text-lg font-semibold mb-4">Create New Room</h2>
                        <input
                            type="text"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 w-full mb-4"
                            placeholder="Enter room name"
                        />
                        <button
                            onClick={handleCreateRoom}
                            className="bg-blue-500 text-white rounded-md px-4 py-2"
                        >
                            Create Room
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessagesComponent;
