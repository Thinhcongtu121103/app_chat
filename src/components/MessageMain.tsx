import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink, faPaperPlane, faPhone} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const MessageMainStyled = styled.div`
    /* Add CSS styles for message main */
    width: 640px;
    height: 1024px;
    background-color: white;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
`;
const MessageMain = () => {
    return (
        <div className="w-[640px] h-[1024px] bg-white flex-col justify-between items-start inline-flex">
            <div className="flex-col justify-start items-start flex">
                <div className="w-[640px] h-20 p-6 justify-between items-center inline-flex">
                    <div className="justify-start items-start gap-4 flex">
                        <img className="w-10 h-10 relative rounded-[10px]" src="https://via.placeholder.com/40x40" alt="user" />
                        <div className="flex-col justify-start items-start inline-flex">
                            <div className="text-black text-xl font-semibold font-['Inter'] leading-[25px]">Florencio Dorrance</div>
                            <div className="justify-start items-center gap-2 inline-flex">
                                <div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div>
                                <div className="opacity-60 text-black text-xs font-semibold font-['Inter'] leading-[18px]">Online</div>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-2.5 bg-indigo-500/opacity-10 rounded-lg justify-start items-center gap-2 flex">
                        <div className="w-6 h-6 relative">
                            <FontAwesomeIcon icon={faPhone} />
                        </div>
                        <div className="text-indigo-500 text-base font-semibold font-['Inter'] leading-tight">Call</div>
                    </div>
                </div>
                <div className="w-[640px] h-px opacity-10 bg-black"></div>
                <div className="w-[640px] h-[693px] p-6 flex-col justify-start items-start gap-8 flex">
                    <div className="self-stretch justify-start items-start gap-4 inline-flex">
                        <img className="w-10 h-10 relative rounded-lg" src="https://via.placeholder.com/40x40" alt="user" />
                        <div className="flex-col justify-start items-start gap-2.5 inline-flex">
                            <div className="px-4 py-2 bg-zinc-100 rounded-xl justify-start items-start gap-2.5 inline-flex">
                                <div className="text-black text-sm font-normal font-['Inter'] leading-[21px]">omg, this is amazing</div>
                            </div>
                            <div className="px-4 py-2 bg-zinc-100 rounded-xl justify-start items-start gap-2.5 inline-flex">
                                <div className="text-black text-sm font-normal font-['Inter'] leading-[21px]">perfect! ✅</div>
                            </div>
                            <div className="px-4 py-2 bg-zinc-100 rounded-xl justify-start items-start gap-2.5 inline-flex">
                                <div className="text-black text-sm font-normal font-['Inter'] leading-[21px]">Wow, this is really epic</div>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch justify-end items-start gap-4 inline-flex">
                        <div className="flex-col justify-start items-start gap-2.5 inline-flex">
                            <div className="px-4 py-2 bg-indigo-500 rounded-xl justify-start items-start gap-2.5 inline-flex">
                                <div className="text-white text-sm font-normal font-['Inter'] leading-[21px]">How are you?</div>
                            </div>
                        </div>
                        <img className="w-10 h-10 relative rounded-lg" src="https://via.placeholder.com/40x40" alt="user" />
                    </div>
                    <div className="self-stretch justify-start items-start gap-4 inline-flex">
                        <img className="w-10 h-10 relative rounded-lg" src="https://via.placeholder.com/40x40" alt="user" />
                        <div className="flex-col justify-start items-start gap-2.5 inline-flex">
                            <div className="px-4 py-2 bg-zinc-100 rounded-xl justify-start items-start gap-2.5 inline-flex">
                                <div className="text-black text-sm font-normal font-['Inter'] leading-[21px]">just ideas for next time</div>
                            </div>
                            <div className="px-4 py-2 bg-zinc-100 rounded-xl justify-start items-start gap-2.5 inline-flex">
                                <div className="text-black text-sm font-normal font-['Inter'] leading-[21px]">I'll be there in 2 mins ⏰</div>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch justify-end items-start gap-4 inline-flex">
                        <div className="flex-col justify-start items-end gap-2.5 inline-flex">
                            <div className="px-4 py-2 bg-indigo-500 rounded-xl justify-start items-start gap-2.5 inline-flex">
                                <div className="text-white text-sm font-normal font-['Inter'] leading-[21px]">woohoooo</div>
                            </div>
                            <div className="px-4 py-2 bg-indigo-500 rounded-xl justify-start items-start gap-2.5 inline-flex">
                                <div className="text-white text-sm font-normal font-['Inter'] leading-[21px]">Haha oh man</div>
                            </div>
                            <div className="px-4 py-2 bg-indigo-500 rounded-xl justify-start items-start gap-2.5 inline-flex">
                                <div className="text-white text-sm font-normal font-['Inter'] leading-[21px]">Haha that's terrifying 😂</div>
                            </div>
                        </div>
                        <img className="w-10 h-10 relative rounded-lg" src="https://via.placeholder.com/40x40" alt="user" />
                    </div>
                    <div className="self-stretch justify-start items-start gap-4 inline-flex">
                        <img className="w-10 h-10 relative rounded-lg" src="https://via.placeholder.com/40x40" alt="user" />
                        <div className="flex-col justify-start items-start gap-2.5 inline-flex">
                            <div className="px-4 py-2 bg-zinc-100 rounded-xl justify-start items-start gap-2.5 inline-flex">
                                <div className="text-black text-sm font-normal font-['Inter'] leading-[21px]">aww</div>
                            </div>
                            <div className="px-4 py-2 bg-zinc-100 rounded-xl justify-start items-start gap-2.5 inline-flex">
                                <div className="text-black text-sm font-normal font-['Inter'] leading-[21px]">omg, this is amazing</div>
                            </div>
                            <div className="px-4 py-2 bg-zinc-100 rounded-xl justify-start items-start gap-2.5 inline-flex">
                                <div className="text-black text-sm font-normal font-['Inter'] leading-[21px]">woohoooo 🔥</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="self-stretch p-6 justify-start items-center gap-6 inline-flex">
                <div className="w-6 h-6 relative">
                    <FontAwesomeIcon icon={faLink} />
                </div>
                <div className="grow shrink basis-0 h-12 px-5 py-2.5 bg-white rounded-xl border-2 border-slate-200 justify-between items-center flex">
                    <input
                        className="w-full bg-transparent outline-none text-black text-sm font-normal font-['Inter'] leading-[21px]"
                        placeholder="Type a message"
                    />
                    <div className="w-6 h-6 relative">
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessageMain;
