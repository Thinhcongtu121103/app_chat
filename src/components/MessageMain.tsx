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
    content: string;
    timestamp: string;
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
            setInputMessage('');
        }
    };

    return (
        <MessageMainStyled>
            <div className="flex-col justify-start items-start flex">
                {selectedUser ? (
                    <>
                        <div className="w-[640px] h-20 p-6 justify-between items-center inline-flex sticky top-0 bg-white">
                            <div className="justify-start items-start gap-4 flex">
                                <img className="w-10 h-10 relative rounded-[10px]" src="https://via.placeholder.com/40x40" alt="avatar"/>
                                <div className="flex-col justify-start items-start inline-flex">
                                    <div className="text-black text-xl font-semibold font-['Inter'] leading-[25px]">{selectedUser}</div>
                                    <div className="justify-start items-center gap-2 inline-flex">
                                        <div className="w-2.5 h-2.5 bg-green-400 rounded-full"/>
                                        <div className="opacity-60 text-black text-xs font-semibold font-['Inter'] leading-[18px]">Online</div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-2.5 bg-indigo-500/opacity-10 rounded-lg justify-start items-center gap-2 flex">
                                <FontAwesomeIcon icon={faPhone} className="text-indigo-500 text-base font-semibold" />
                                <div className="text-indigo-500 text-base font-semibold font-['Inter'] leading-tight">Call</div>
                            </div>
                        </div>
                        <div className="h-[700px] p-6 flex-col justify-start items-start gap-8 flex overflow-y-auto">
                            {messages.map((message, index) => (
                                <div key={index} className={`self-stretch ${message.sender === 'me' ? 'justify-end' : 'justify-start'} items-start gap-4 inline-flex`}>
                                    {message.sender !== 'me' && (
                                        <img className="w-10 h-10 relative rounded-lg" src="https://via.placeholder.com/40x40" alt="avatar"/>
                                    )}
                                    <div className={`flex-col justify-start items-${message.sender === 'me' ? 'end' : 'start'} gap-2.5 inline-flex`}>
                                        <div className={`px-4 py-2 ${message.sender === 'me' ? 'bg-indigo-500 text-white' : 'bg-zinc-100 text-black'} rounded-xl justify-start items-start gap-2.5 inline-flex`}>
                                            <div className="text-sm font-normal font-['Inter'] leading-[21px]">{message.content}</div>
                                        </div>
                                    </div>
                                    {message.sender === 'me' && (
                                        <img className="w-10 h-10 relative rounded-lg" src="https://via.placeholder.com/40x40" alt="avatar"/>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="self-stretch p-6 justify-start items-center gap-6 inline-flex sticky bottom-0 bg-white">
                            <div className="w-6 h-6 relative"/>
                            <div className="grow shrink basis-0 h-12 px-5 py-2.5 bg-white rounded-xl border-2 border-slate-200 justify-between items-center flex">
                                <input
                                    type="text"
                                    placeholder="Type a message"
                                    className="w-full bg-transparent outline-none"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSendMessage();
                                        }
                                    }}
                                />
                                <FontAwesomeIcon icon={faPaperPlane} className="text-indigo-500 cursor-pointer" onClick={handleSendMessage} />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex justify-center items-center h-full">
                        <p>Select a user to start conversation</p>
                    </div>
                )}
            </div>
        </MessageMainStyled>
    );
};

export default MessageMain;
