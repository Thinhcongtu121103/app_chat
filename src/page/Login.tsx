import React, { useState, useEffect } from 'react';
import { useWebSocket } from '../context/WebSocketContext';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}


const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
    const { sendMessage, lastMessage, isLoggedIn, reconnect, disconnect } = useWebSocket();
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
    // chuyển tab khi relogin
    useEffect(() => {
        const loginCode = localStorage.getItem('loginCode');
        if (loginCode != null) {
            setIsLoggedIn(true);
            navigate('/');
        }
    }, []);

    useEffect(() => {
        if (lastMessage && lastMessage.event === 'LOGIN') {
            if (lastMessage.status === 'success') {
                setIsLoggedIn(true);
                localStorage.setItem('loginCode', lastMessage.data.RE_LOGIN_CODE);
                localStorage.setItem('username', username);
                setReloginPerformed(false);
                navigate('/');
            }
        }
    }, [lastMessage, navigate, username, reloginPerformed]);


    const handleSignUpClick = () => {
        navigate('/register');
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Log in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                value={username}
                                onChange={handleUsernameChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500" onClick={handleSignUpClick}>
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={handlePasswordChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Log in
                        </button>
                    </div>
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <a href="" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={handleSignUpClick}>
                        Sign up now
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
