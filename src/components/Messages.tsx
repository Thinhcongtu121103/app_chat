import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useWebSocket } from '../context/WebSocketContext'; // Import the useWebSocket hook

const MessagesComponent = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState<any[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Thêm trạng thái để theo dõi trạng thái đăng nhập
    const [roomCreated, setRoomCreated] = useState(false); // Thêm trạng thái để theo dõi việc tạo phòng thành công
    const { sendMessage, userList, createRoom } = useWebSocket(); // Sử dụng hook useWebSocket để gửi tin nhắn và lấy danh sách người dùng

    useEffect(() => {
        if (isLoggedIn) { // Chỉ gọi API lấy danh sách người dùng khi đã đăng nhập
            console.log('Fetching user list...');
            sendMessage({
                action: 'onchat',
                data: {
                    event: 'GET_USER_LIST'
                }
            });
        }
    }, [isLoggedIn]); // Chỉ gọi lại khi isLoggedIn thay đổi

    useEffect(() => {
        if (roomCreated) { // Gọi lại API lấy danh sách người dùng khi tạo phòng thành công
            console.log('Room created, fetching user list again...');
            sendMessage({
                action: 'onchat',
                data: {
                    event: 'GET_USER_LIST'
                }
            });
            setRoomCreated(false); // Reset trạng thái để tránh gọi API không cần thiết
        }
    }, [roomCreated, sendMessage]);

    const handleNewMessage = (message: any) => {
        setMessages(prevMessages => [...prevMessages, message]);
    };

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const handleCreateRoom = () => {
        createRoom(roomName); // Gọi hàm createRoom từ hook useWebSocket
        setRoomCreated(true); // Đánh dấu rằng phòng đã được tạo
        setIsPopupOpen(false);
        setRoomName('');
    };

    // Giả lập đăng nhập thành công (thay thế bằng logic đăng nhập thực tế)
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
                <div className="self-stretch h-[72px] px-6 py-3 flex-col justify-start items-start gap-2.5 flex">
                    <div className="self-stretch h-12 px-5 py-2.5 bg-zinc-100 rounded-xl justify-start items-center gap-2.5 inline-flex">
                        <div className="opacity-40 text-black text-sm font-normal font-['Inter']">search</div>
                        <div className="opacity-40 text-black text-sm font-normal font-['Inter'] leading-[21px]">
                            Search messages
                        </div>
                    </div>
                </div>
                <div className="self-stretch px-4 flex-col justify-start items-start gap-2 flex">
                    <ul className="divide-y divide-gray-200">
                        {userList.map((user, index) => (
                            <div className="self-stretch px-4 flex-col justify-start items-start gap-2 flex" key={index}>
                                <div className="self-stretch p-3 justify-start items-start gap-4 inline-flex">
                                    <img className="w-12 h-12 relative rounded-xl" src="https://via.placeholder.com/48x48" />
                                    <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                        <div className="self-stretch h-[39px] flex-col justify-start items-start flex">
                                            <div className="self-stretch justify-start items-start gap-3 inline-flex">
                                                <div className="grow shrink basis-0 text-black text-sm font-semibold font-['Inter'] leading-[21px]">
                                                    {user.name}
                                                </div>
                                                <div className="opacity-30 text-black text-sm font-semibold font-['Inter'] leading-[21px]">12m</div>
                                            </div>
                                            <div className="self-stretch text-black/opacity-40 text-xs font-semibold font-['Inter'] leading-[18px]">Haha oh man 🔥</div>
                                        </div>
                                        <div className="justify-start items-start gap-2 inline-flex">
                                            <div className="px-2 py-0.5 bg-amber-100 rounded-xl justify-start items-start gap-2.5 flex">
                                                <div className="text-amber-600 text-xs font-semibold font-['Inter'] leading-[18px]">Question</div>
                                            </div>
                                            <div className="px-2 py-0.5 bg-green-200 rounded-xl justify-start items-start gap-2.5 flex">
                                                <div className="text-green-500 text-xs font-semibold font-['Inter'] leading-[18px]">Help wanted</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>

            {isPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Create Room</h2>
                            <button onClick={togglePopup} className="text-black text-2xl">&times;</button>
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="text-sm font-semibold">Room name</label>
                            <input
                                type="text"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                                className="p-2 border border-gray-300 rounded"
                                placeholder="Enter room name"
                            />
                            <button
                                onClick={handleCreateRoom}
                                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessagesComponent;
