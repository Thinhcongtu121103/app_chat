// src/websocket/WebSocketProvider.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import WebSocketService from "../websocket/Websocket";

interface WebSocketContextValue {
    sendMessage: (message: any) => void;
    lastMessage: any;
    isLoggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
    userList: any[];
    createRoom: (roomName: string) => void;
    fetchPeopleChatMessages: (userName: string, page: number) => Promise<any[]>;
    sendChatMessage: (type: string, to: string, mes: string) => void; // Thêm sendChatMessage vào context
    onMessage: (listener: (message: any) => void) => void;
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
    const [userList, setUserList] = useState<any[]>([]);
    const webSocketServiceInstance = WebSocketService.getInstance(); // Thay đổi hàm khởi tạo WebSocketService theo cách thích hợp

    useEffect(() => {
        const messageListener = (message: any) => {
            console.log('Received message:', message);
            setLastMessage(message);

            switch (message.event) {
                case 'GET_USER_LIST':
                    handleUserListMessage(message.data);
                    break;
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

        return () => {
            webSocketServiceInstance.removeMessageListener('message', messageListener);
            webSocketServiceInstance.removeMessageListener('login', loginListener);
            webSocketServiceInstance.removeMessageListener('logout', logoutListener);
        };
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            console.log('Fetching user list...');
            fetchUserList();
        }
    }, [isLoggedIn]);

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

    const fetchPeopleChatMessages = (userName: string, page: number): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            const message = {
                action: 'onchat',
                data: {
                    event: 'GET_PEOPLE_CHAT_MES',
                    data: {
                        name: userName,
                        page: page
                    }
                }
            };

            const messageListener = (response: any) => {
                if (response.event === 'GET_PEOPLE_CHAT_MES' && response.data.name === userName) {
                    resolve(response.data.messages);
                    webSocketServiceInstance.removeMessageListener('message', messageListener);
                }
            };

            webSocketServiceInstance.addMessageListener('message', messageListener);
            sendMessage(message);
        });
    };

    const sendChatMessage = (type: string, to: string, mes: string) => {
        webSocketServiceInstance.sendChatMessage(type, to, mes);
    };

    const onMessage = (listener: (message: any) => void) => {
        webSocketServiceInstance.addMessageListener('message', listener);
    };

    const value = { sendMessage, lastMessage, isLoggedIn, setLoggedIn: setIsLoggedIn, userList, createRoom, fetchPeopleChatMessages, sendChatMessage, onMessage };

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
};
