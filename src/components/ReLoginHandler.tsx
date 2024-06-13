import React, { useEffect } from 'react';
import { useWebSocket } from '../context/WebSocketContext';

interface ReLoginHandlerProps {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReLoginHandler: React.FC<ReLoginHandlerProps> = ({ setIsLoggedIn }) => {
    const { sendMessage, lastMessage } = useWebSocket();

    useEffect(() => {
        const reLoginCode = localStorage.getItem('reLoginCode');
        const username = localStorage.getItem('username');
        const reloginPerformed = localStorage.getItem('reloginPerformed');

        // Kiểm tra nếu cần tái đăng nhập và chưa thực hiện
        if (reLoginCode && username && reloginPerformed) {
            sendMessage({
                action: 'onchat',
                data: {
                    event: 'RE_LOGIN',
                    data: { user: username, code: reLoginCode }
                }
            });
        }
    }, [sendMessage]);

    useEffect(() => {
        // Xử lý logic tái đăng nhập khi tải trang lần đầu
        const handleInitialLoad = () => {
            const reLoginCode = localStorage.getItem('reLoginCode');
            const username = localStorage.getItem('username');
            const reloginPerformed = localStorage.getItem('reloginPerformed');

            if (reLoginCode && username && !reloginPerformed) {
                sendMessage({
                    action: 'onchat',
                    data: {
                        event: 'RE_LOGIN',
                        data: { user: username, code: reLoginCode }
                    }
                });
            }
        };

        // Gọi hàm ngay lập tức và khi tải trang lần đầu
        handleInitialLoad();

        // Dọn dẹp trình nghe sự kiện
        return () => {
            window.removeEventListener('load', handleInitialLoad);
        };
    }, [sendMessage]);

    useEffect(() => {
        // Xử lý phản hồi từ việc thử đăng nhập lại
        if (lastMessage && lastMessage.event === 'RE_LOGIN') {
            if (lastMessage.status === 'success') {
                console.log('Đăng nhập lại thành công');
                setIsLoggedIn(true);
                localStorage.setItem('isLoggedIn', 'true');
            } else {
                console.log('Đăng nhập lại thất bại:', lastMessage.status);
                // Xóa các giá trị local storage khi thất bại
                localStorage.removeItem('reLoginCode');
                localStorage.removeItem('username');
                localStorage.removeItem('isLoggedIn');
            }
            // Đánh dấu đã thực hiện tái đăng nhập dù thành công hay không
            localStorage.setItem('reloginPerformed', 'true');
        }
    }, [lastMessage, setIsLoggedIn]);

    return null; // Vì thành phần này chỉ xử lý các hiệu ứng phụ
};

export default ReLoginHandler;
