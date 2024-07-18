import React, { useState, useEffect } from 'react';
import { useWebSocket } from '../context/WebSocketContext';
import { useNavigate } from 'react-router-dom';
import { equalTo, get, orderByChild, query, ref } from "firebase/database";
import { database } from "../firebase";
import { ReactComponent as LoginIcon } from '../assets/register.svg'; // Import SVG vào đây



interface LoginProps {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
    const { sendMessage, lastMessage, isLoggedIn } = useWebSocket();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [reloginPerformed, setReloginPerformed] = useState(false);
    const navigate = useNavigate();

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        sendMessage({
            action: 'onchat',
            data: {
                event: 'LOGIN',
                data: { user: username, pass: password }
            }
        });
    };

    // Handle re-login if login code is available
    useEffect(() => {
        const loginCode = localStorage.getItem('loginCode');
        if (loginCode != null) {
            setIsLoggedIn(true);
            navigate('/');
        }
    }, [navigate, setIsLoggedIn]);

    useEffect(() => {
        if (lastMessage && lastMessage.event === 'LOGIN' && lastMessage.status === 'success') {
            setIsLoggedIn(true);
            localStorage.setItem('loginCode', lastMessage.data.RE_LOGIN_CODE);
            localStorage.setItem('username', username);
            setReloginPerformed(false);
            const keyQueryUserName = localStorage.getItem('username');

            if (keyQueryUserName) {
                const usersRef = ref(database, 'users');
                let usernameQuery;
                const usernameAsNumber = Number(keyQueryUserName);

                if (!isNaN(usernameAsNumber)) {
                    usernameQuery = query(usersRef, orderByChild('username'), equalTo(usernameAsNumber));
                } else {
                    usernameQuery = query(usersRef, orderByChild('username'), equalTo(keyQueryUserName));
                }

                get(usernameQuery).then((snapshot) => {
                    if (snapshot.exists()){
                        snapshot.forEach((childSnapshot) => {
                            const userData = childSnapshot.val();
                            localStorage.setItem('currentUserName', userData.name);
                            localStorage.setItem('img', userData.img);
                            localStorage.setItem('address', userData.address);
                            localStorage.setItem('phone', userData.phone);
                            localStorage.setItem('describe', userData.describe);

                        });
                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                    console.error(error);
                });
            }
            navigate('/');
        }
    }, [lastMessage, navigate, setIsLoggedIn, username]);

    const handleSignUpClick = () => {
        navigate('/register');
    };
    return (
        // eslint-disable-next-line react/style-prop-object
            <div className="flex h-screen">
            {/*Left Pane*/}
                <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
                    <div className="max-w-md text-center">
                        <LoginIcon/>
                    </div>
            </div>
            {/*Right Pane*/}
            <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
                <div className="max-w-md w-full p-6">
                    <h1 className="text-3xl font-semibold mb-6 text-black text-center">ĐĂNG NHẬP</h1>
                    <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
                        Chào mừng trở lại! Hãy đăng nhập để tiếp tục khám phá và trải nghiệm những điều thú vị cùng chúng tôi!
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/*Your form elements go here*/}
                        <div>
                            <label htmlFor="username"
                                   className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                value={username}
                                onChange={handleUsernameChange}
                                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>
                        </div>
                        {/*<div>*/}
                        {/*    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>*/}
                        {/*    <input type="text" id="email" name="email"*/}
                        {/*           className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>*/}
                        {/*</div>*/}
                        <div>
                            <label htmlFor="password"
                                   className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={handlePasswordChange}
                                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>
                        </div>
                        <div>
                            <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
                                <div className="w-full lg:w-1/2 mb-2 lg:mb-0">
                                    <button type="button"
                                            className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4"
                                             id="google">
                                            <path fill="#fbbb00"
                                                  d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"></path>
                                            <path fill="#518ef8"
                                                  d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"></path>
                                            <path fill="#28b446"
                                                  d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"></path>
                                            <path fill="#f14336"
                                                  d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"></path>
                                        </svg>
                                        Đăng nhập bằng Google
                                    </button>
                                </div>
                                <div className="w-full lg:w-1/2 ml-0 lg:ml-2">
                                    <button type="button"
                                            className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="github"
                                             className="w-4">
                                            <path
                                                d="M7.999 0C3.582 0 0 3.596 0 8.032a8.031 8.031 0 0 0 5.472 7.621c.4.074.546-.174.546-.387 0-.191-.007-.696-.011-1.366-2.225.485-2.695-1.077-2.695-1.077-.363-.928-.888-1.175-.888-1.175-.727-.498.054-.488.054-.488.803.057 1.225.828 1.225.828.714 1.227 1.873.873 2.329.667.072-.519.279-.873.508-1.074-1.776-.203-3.644-.892-3.644-3.969 0-.877.312-1.594.824-2.156-.083-.203-.357-1.02.078-2.125 0 0 .672-.216 2.2.823a7.633 7.633 0 0 1 2.003-.27 7.65 7.65 0 0 1 2.003.271c1.527-1.039 2.198-.823 2.198-.823.436 1.106.162 1.922.08 2.125.513.562.822 1.279.822 2.156 0 3.085-1.87 3.764-3.652 3.963.287.248.543.738.543 1.487 0 1.074-.01 1.94-.01 2.203 0 .215.144.465.55.386A8.032 8.032 0 0 0 16 8.032C16 3.596 12.418 0 7.999 0z"></path>
                                        </svg>
                                        Đăng nhập bằng Github
                                    </button>
                                </div>
                            </div>
                            <button type="submit"
                                    className="mt-4 w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">
                                Đăng Nhập
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-sm text-gray-600 text-center">
                        <p>Bạn chưa có tài khoản?
                            <a href="#"
                               className="text-black hover:underline"
                               onClick={handleSignUpClick}
                            > Đăng ký tại đây</a>
                        </p>
                    </div>
                </div>
            </div>
            </div>
    );
};

export default Login;
