import React, { useState } from 'react';
import styled from 'styled-components';
import MessagesComponent from '../components/Messages';
import MessageMain from '../components/MessageMain';
import MessageSetting from '../components/MessageSetting';

const ChatContainer = styled.div`
    position: absolute;
    top: 10px;
    margin: 0;
    padding: 0;
    width: 1340px;
    height: 700px;
    overflow: hidden;
    display: flex; /* Thêm display: flex để các phần tử bên trong tự căn chỉnh */
`;


type Message = {
    sender: string;
    mes: string;
    createAt: string;
    to: string;
};

const Chat = () => {
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [showUserSelection, setShowUserSelection] = useState<boolean>(true);

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

    const handleSendMessage = (message: string) => {
        if (selectedUser && message.trim()) {
            const newMessage: Message = {
                sender: 'me',
                mes: message,
                createAt: new Date().toISOString(),
                to: selectedUser,
            };
            setMessages([...messages, newMessage]);
            // Send message via WebSocket
        }
    };

    return (
        <ChatContainer>
            <div className="w-[1400px] h-[900px] bg-zinc-100 justify-center items-start inline-flex">
                <MessagesComponent onSelectUser={handleSelectUser} showUserSelection={showUserSelection} />
                <MessageMain selectedUser={selectedUser} messages={messages} onSendMessage={handleSendMessage} />
                <MessageSetting />
            </div>
        </ChatContainer>
    );
};

export default Chat;
