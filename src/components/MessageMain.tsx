import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPhone, faLink } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useWebSocket } from "../context/WebSocketContext";

const MessageMainStyled = styled.div`
    width: 640px;
    height: 1024px;
    background-color: white;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
`;

type Message = {
    sender: string;
    mes: string;
    createAt: string;
    to: string;
};

type MessageMainProps = {
    selectedUser: string | null;
    messages: Message[];
    onSendMessage: (message: string) => void;
};

const MessageMain: React.FC<MessageMainProps> = ({ selectedUser, messages, onSendMessage }) => {
    const [inputMessage, setInputMessage] = useState('');
    const { sendChatMessage } = useWebSocket();

    const handleSendMessage = () => {
        if (inputMessage.trim() && selectedUser) {
            sendChatMessage('people', selectedUser, inputMessage);
            onSendMessage(inputMessage);
            setInputMessage('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const sortedMessages = [...messages].sort((a, b) => new Date(a.createAt).getTime() - new Date(b.createAt).getTime());

    return (
        <MessageMainStyled>
            <div className="w-[640px] h-[700px] bg-white flex-col justify-between items-start inline-flex">
                <div className="flex-col justify-start items-start flex overflow-y-auto">
                    <div className="w-[640px] h-20 p-6 justify-between items-center inline-flex sticky top-0 bg-white">
                        <div className="justify-start items-start gap-4 flex">
                            <img className="w-10 h-10 relative rounded-[10px]" src="https://via.placeholder.com/40x40" alt="user"/>
                            <div className="flex-col justify-start items-start inline-flex">
                                <div className="text-black text-xl font-semibold font-['Inter'] leading-[25px]">
                                    {selectedUser || 'No User available'}
                                </div>
                                <div className="justify-start items-center gap-2 inline-flex">
                                    <div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div>
                                    <div className="opacity-60 text-black text-xs font-semibold font-['Inter'] leading-[18px]">Online</div>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-2.5 bg-indigo-500/opacity-10 rounded-lg justify-start items-center gap-2 flex">
                            <div className="w-6 h-6 relative">
                                <FontAwesomeIcon icon={faPhone}/>
                            </div>
                            <div className="text-indigo-500 text-base font-semibold font-['Inter'] leading-tight">Call</div>
                        </div>
                    </div>
                    <div className="w-[640px] h-px opacity-10 bg-black"></div>
                    <div className="w-[640px] h-[693px] p-6 flex-col justify-start items-start gap-8 flex">
                        {sortedMessages.length > 0 ? (
                            sortedMessages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`self-stretch py-2 flex ${
                                        message.sender === selectedUser || message.to === selectedUser ? 'justify-end' : 'justify-start'
                                    }`}
                                >
                                    {message.sender !== selectedUser && message.to !== selectedUser && (
                                        <img className="w-10 h-10 relative rounded-lg" src="https://via.placeholder.com/40x40" alt="user"/>
                                    )}
                                    <div className={`max-w-[70%] p-4 rounded-lg ${
                                        message.sender === selectedUser || message.to === selectedUser ? 'bg-zinc-100 text-black' : 'bg-zinc-100 text-black'
                                    }`}>
                                        <div className="text-sm font-normal font-['Inter'] leading-[21px]">{message.mes}</div>
                                        <div className="text-xs text-gray-500 mt-2">
                                            {new Date(message.createAt).toLocaleString()}
                                        </div>
                                    </div>
                                    {message.sender === selectedUser || message.to === selectedUser && (
                                        <img className="w-10 h-10 relative rounded-lg" src="https://via.placeholder.com/40x40" alt="user"/>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="self-stretch py-2 flex justify-center">
                                <span className="text-gray-500">No messages available</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="self-stretch p-6 justify-start items-center gap-6 inline-flex">
                    <div className="w-6 h-6 relative">
                        <FontAwesomeIcon icon={faLink}/>
                    </div>
                    <div className="grow shrink basis-0 h-12 px-5 py-2.5 bg-white rounded-xl border-2 border-slate-200 justify-between items-center flex">
                        <input
                            className="w-full bg-transparent outline-none text-black text-sm font-normal font-['Inter'] leading-[21px]"
                            placeholder="Nhập tin nhắn..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <div className="w-6 h-6 relative cursor-pointer" onClick={handleSendMessage}>
                            <FontAwesomeIcon icon={faPaperPlane}/>
                        </div>
                    </div>
                </div>
            </div>
        </MessageMainStyled>
    );
};

export default MessageMain;
