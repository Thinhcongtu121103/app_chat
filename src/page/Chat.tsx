
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import MessagesComponent from '../components/Messages';
import MessageMain from '../components/MessageMain';
import MessageSetting from '../components/MessageSetting';
import { useWebSocket } from "../context/WebSocketContext";
import { database } from '../firebase'; // Import ứng dụng Firebase đã khởi tạo
import { ref, query, orderByChild, equalTo, get } from "firebase/database";

const ChatContainer = styled.div`
    position: absolute;
    top: 10px;
    margin: 0;
    padding: 0;
    width: 1340px;
    height: 700px;
    overflow: hidden;
    display: flex;
    font-family: 'Roboto', sans-serif; /* Sử dụng font Roboto */
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
const Chat = () => {
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [showUserSelection, setShowUserSelection] = useState<boolean>(true);
    const [loggedInUser, setLoggedInUser] = useState<string>(''); // Lưu trữ tên người dùng đăng nhập ở đây
    const [roomData, setRoomData] = useState<Message[]>([]);

    useEffect(() => {
        // Lấy username từ localStorage khi thành phần Chat được khởi tạo
        const username = localStorage.getItem('username');
        if (username) {
            setLoggedInUser(username);
        } else {
            // Xử lý trường hợp không tìm thấy username trong localStorage
            console.error('No username found in localStorage');
        }
    }, []);
    const handleSelectUser = (userName: string, userMessages: Message[]) => {
        if (userName && userName.trim() !== '' && userMessages.length > 0) {
            setSelectedUser(userName);
            setMessages(userMessages);
        } else {
            setSelectedUser(null);
            setMessages([]);
        }
        setShowUserSelection(false);
    };

    const handleSelectRoom = (roomName: string, roomMessages: Message[]) => {
        if (roomName && roomName.trim() !== '') {
            setSelectedRoom(roomName);
            // console.log('Room messages:', roomMessages.length);
            // console.log('Room messages:', roomMessages);
            setRoomData(roomMessages.length > 0 ? roomMessages : []);
        } else {
            setSelectedRoom(null);
            setRoomData([]);
        }
        setShowUserSelection(false);
    };

    const handleSendMessage = (message: string) => {
        // console.log('Send message:', message);
        // console.log('Selected user:', selectedUser);
        // console.log('Selected room:', selectedRoom);
        if ((selectedUser || selectedRoom) && message.trim()) {
            const newMessage: Message = {
                sender: 'me',
                name: loggedInUser,
                mes: message,
                createAt: new Date().toISOString(),
                to: selectedUser || selectedRoom || '',
            };
            setMessages([...messages, newMessage]);
            setRoomData([...roomData, newMessage]);
            // Send message via WebSocket
        }
    };

    return (
        <ChatContainer>
            <div className="w-[1400px] h-[900px] bg-zinc-100 justify-center items-start inline-flex">
                <MessagesComponent
                    onSelectUser={handleSelectUser}
                    onSelectRoom={handleSelectRoom}
                    showUserSelection={showUserSelection}
                />
                <MessageMain
                    selectedUser={selectedUser}
                    selectedRoom={selectedRoom}
                    messages={messages}
                    onSendMessage={handleSendMessage}
                    loggedInUser={loggedInUser}
                    roomChatData={roomData}
                />
                <MessageSetting />
            </div>
        </ChatContainer>
    );
};

export default Chat;
