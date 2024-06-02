import React, { createContext, useContext, useEffect, useState } from 'react';
import WebSocketService from '../websocket/Websocket';

interface WebSocketContextValue {
    sendMessage: (message: any) => void;
    lastMessage: any;
    isLoggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
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
    const webSocketServiceInstance = WebSocketService.getInstance();

    useEffect(() => {
        const messageListener = (message: any) => {
            console.log('Received message:', message);
            setLastMessage(message);
        };

        const loginListener = () => {
            console.log('Logged in');
            setIsLoggedIn(true);
        };

        const logoutListener = () => {
            console.log('Logged out');
            setIsLoggedIn(false);
        };

        webSocketServiceInstance.addListener('message', messageListener);
        webSocketServiceInstance.addListener('login', loginListener);
        webSocketServiceInstance.addListener('logout', logoutListener);

        return () => {
            webSocketServiceInstance.removeListener('message', messageListener);
            webSocketServiceInstance.removeListener('login', loginListener);
            webSocketServiceInstance.removeListener('logout', logoutListener);
        };
    }, [webSocketServiceInstance]);

    const sendMessage = (message: any) => {
        webSocketServiceInstance.sendMessage(message);
    };

    const value = { sendMessage, lastMessage, isLoggedIn, setLoggedIn: setIsLoggedIn };

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
};
