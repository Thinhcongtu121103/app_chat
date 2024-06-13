import React from 'react';

import styled from "styled-components";

import Messages from "../components/Messages";
import MessageSetting from "../components/MessageSetting";
import MessageMain from "../components/MessageMain";


const ChatContainer = styled.div`
    position: absolute;
    top: 10px;
    //overflow: hidden;
    margin: 0;
    padding: 0;
    width: 1340px; /* Đặt kích thước cố định cho trang */
    height: 700px; /* Đặt kích thước cố định cho trang */
    overflow: hidden;
/
`;

const Chat = () => {
    return (
        <ChatContainer>
            <div className="w-[140 0px] h-[900px] bg-zinc-100 justify-center items-start inline-flex">
                <Messages/>
                <MessageMain/>
                <MessageSetting/>
            </div>
        </ChatContainer>
    );
}

export default Chat;
