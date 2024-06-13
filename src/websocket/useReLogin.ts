import { useEffect } from 'react';
import { useWebSocket } from '../context/WebSocketContext';  // Đảm bảo import đúng từ WebSocketContext

const useReLogin = (setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>) => {
    const { sendMessage, lastMessage } = useWebSocket();

    useEffect(() => {
        const handleReLogin = () => {
            const reLoginCode = localStorage.getItem('reLoginCode');
            const username = localStorage.getItem('username');

            if (reLoginCode && username) {
                sendMessage({
                    action: 'onchat',
                    data: {
                        event: 'RE_LOGIN',
                        data: { user: username, code: reLoginCode }
                    }
                });
            }
        };

        handleReLogin();
    }, [sendMessage]);

    useEffect(() => {
        if (lastMessage && lastMessage.event === 'LOGIN') {
            if (lastMessage.status === 'success') {
                console.log('Re-login successful');
                setIsLoggedIn(true);
            } else {
                console.log('Re-login status:', lastMessage.status);
                localStorage.removeItem('reLoginCode');
                localStorage.removeItem('username');
            }
        }
    }, [lastMessage, setIsLoggedIn]);
};

export default useReLogin;
