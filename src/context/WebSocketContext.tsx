import React, { createContext, useContext, useEffect, useState } from 'react';
import WebSocketService from '../websocket/Websocket';

interface WebSocketContextValue {
    sendMessage: (message: any) => void;
    lastMessage: any;
    isLoggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
    userList: any[]; // Danh sách người dùng
}

const WebSocketContext = createContext<WebSocketContextValue | null>(null);

export const useWebSocket = (): WebSocketContextValue => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};

interface WebSocketProviderProps {
    children: React.ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
    const [lastMessage, setLastMessage] = useState<any>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userList, setUserList] = useState<any[]>([]); // State để lưu danh sách người dùng
    const webSocketServiceInstance = WebSocketService.getInstance();

    useEffect(() => {
        const messageListener = (message: any) => {
            console.log('Received message:', message);
            setLastMessage(message);

            // Xử lý tin nhắn nhận được từ server
            switch (message.event) {
                case 'GET_USER_LIST':
                    handleUserListMessage(message.data);
                    break;
                case 'CREATE_ROOM_SUCCESS':
                    fetchUserList();
                    break;
                // Xử lý các tin nhắn khác nếu cần
                default:
                    break;
            }
        };

        const loginListener = () => {
            console.log('Logged in');
            setIsLoggedIn(true);
        };

        const logoutListener = () => {
            console.log('Logged out');
            setIsLoggedIn(false);
        };

        webSocketServiceInstance.addMessageListener('message', messageListener);
        webSocketServiceInstance.addMessageListener('login', loginListener);
        webSocketServiceInstance.addMessageListener('logout', logoutListener);

        // Clean up listeners
        return () => {
            webSocketServiceInstance.removeMessageListener('message', messageListener);
            webSocketServiceInstance.removeMessageListener('login', loginListener);
            webSocketServiceInstance.removeMessageListener('logout', logoutListener);
        };
    }, [webSocketServiceInstance]);

    const sendMessage = (message: any) => {
        webSocketServiceInstance.sendMessage(message);
    };

    const fetchUserList = () => {
        sendMessage({
            action: 'onchat',
            data: {
                event: 'GET_USER_LIST'
            }
        });
    };

    // Xử lý tin nhắn GET_USER_LIST từ server
    const handleUserListMessage = (data: any) => {
        if (data && Array.isArray(data)) {
            setUserList(data);
        } else {
            console.error('Invalid user list data format:', data);
        }
    };

    const createRoom = (roomName: string) => {
        webSocketServiceInstance.createRoom(roomName);
    };

    const value = { sendMessage, lastMessage, isLoggedIn, setLoggedIn: setIsLoggedIn, userList, createRoom };

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
};
