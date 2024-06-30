import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPhone } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

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

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            onSendMessage(inputMessage);
            setInputMessage(''); // Clear input after sending message
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <MessageMainStyled>
            <div className="flex-col justify-start items-start flex">
                <>
                    <div className="w-[640px] h-20 p-6 justify-between items-center inline-flex sticky top-0 bg-white">
                        <div className="justify-start items-start gap-4 flex">
                            <img className="w-10 h-10 relative rounded-[10px]" src="https://via.placeholder.com/40x40" alt="avatar"/>
                            <div className="flex-col justify-start items-start inline-flex">
                                <div className="text-black text-xl font-semibold font-['Inter'] leading-[25px]">{selectedUser || 'User Name'}</div>
                                <div className="justify-start items-center gap-2 inline-flex">
                                    <div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div>
                                    <div className="opacity-60 text-black text-xs font-semibold font-['Inter'] leading-[18px]">Online</div>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-2.5 bg-indigo-500/opacity-10 rounded-lg justify-start items-center gap-2 flex">
                            <FontAwesomeIcon icon={faPhone} className="text-indigo-500 text-base font-semibold" />
                            <div className="text-indigo-500 text-base font-semibold font-['Inter'] leading-tight">Call</div>
                        </div>
                    </div>
                    <div className="h-[700px] w-full overflow-y-auto p-4">
                        {messages.length > 0 ? (
                            messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`w-full py-2 flex ${
                                        message.to === selectedUser ? 'justify-end' : 'justify-start'
                                    }`}
                                >
                                    <div
                                        className={`max-w-[70%] p-4 rounded-lg ${
                                            message.to === selectedUser ? 'bg-blue-200' : 'bg-gray-200'
                                        }`}
                                    >
                                        <div>{message.mes}</div>
                                        <div className="text-xs text-gray-500 mt-2">
                                            {new Date(message.createAt).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="w-full py-2 flex justify-center">
                                <span className="text-gray-500">No messages available</span>
                            </div>
                        )}
                    </div>
                </>
            </div>
            <div className="w-full p-4 border-t border-gray-200 flex">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md p-2 mr-2"
                    placeholder="Type a message"
                    onKeyDown={handleKeyDown} // Handle Enter key press
                />
                <button onClick={handleSendMessage} className="bg-blue-500 text-white rounded-md px-4 py-2 flex items-center">
                    <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                    Send
                </button>
            </div>
        </MessageMainStyled>
    );
};

export default MessageMain;
