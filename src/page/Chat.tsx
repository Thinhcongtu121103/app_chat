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
    width: 1340px; /* Đặt kích thước cố định cho trang */
    height: 700px; /* Đặt kích thước cố định cho trang */
    overflow: hidden;
`;

const Chat = () => {
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [showUserSelection, setShowUserSelection] = useState<boolean>(true);

    const handleSelectUser = (userName: string, userMessages: any[]) => {
        setSelectedUser(userName);
        setMessages(userMessages);
        setShowUserSelection(false); // Ẩn lựa chọn người dùng sau khi chọn
    };

    const handleSendMessage = (message: string) => {
        if (selectedUser && message.trim()) {
            const newMessage = {
                sender: 'me',
                content: message,
                timestamp: new Date().toISOString(),
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
