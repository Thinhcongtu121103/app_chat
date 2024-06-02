import React from 'react';

import styled from "styled-components";

const ChatContainer = styled.div`
    position: absolute;
    top: 10px;
    //overflow: hidden;
    margin: 0;
    padding: 0;
    width: 1340px; /* Đặt kích thước cố định cho trang */
    height: 700px; /* Đặt kích thước cố định cho trang */
    overflow: hidden; /
`;

const Chat = () => {
    return (
        <ChatContainer>
            <div className="w-[140 0px] h-[900px] bg-zinc-100 justify-center items-start inline-flex">
                <div className="w-[349px] h-[700px] overflow-y-auto bg-white shadow flex-col justify-start items-center inline-flex">
                    <div className="flex-col justify-start items-start flex w-full">
                        <div className="w-full p-5 justify-between items-center inline-flex sticky top-0 bg-white z-10">
                            <div className="justify-start items-center gap-2.5 flex">
                                <div className="justify-start items-center gap-1.5 flex">
                                    <div className="text-black text-xl font-semibold font-['Inter'] leading-[30px]">
                                        Messages
                                    </div>
                                    <div className="w-4 h-4 relative"/>
                                </div>
                                <div
                                    className="px-2 py-0.5 bg-slate-100 rounded-3xl flex-col justify-start items-start gap-2.5 inline-flex">
                                    <div className="text-black text-xs font-semibold font-['Inter'] leading-[18px]">12
                                    </div>
                                </div>
                            </div>
                            <div className="w-10 h-10 relative"/>
                        </div>
                        <div className="w-full h-px opacity-10 bg-black"/>
                    </div>
                    <div className="self-stretch flex-col justify-start items-start flex overflow-y-auto">
                        <div className="self-stretch h-[72px] px-6 py-3 flex-col justify-start items-start gap-2.5 flex">
                            <div
                                className="self-stretch h-12 px-5 py-2.5 bg-zinc-100 rounded-xl justify-start items-center gap-2.5 inline-flex">
                                <div className="opacity-40 text-black text-sm font-normal font-['Inter']">search</div>
                                <div
                                    className="opacity-40 text-black text-sm font-normal font-['Inter'] leading-[21px]">
                                    Search messages
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch px-4 flex-col justify-start items-start gap-2 flex">
                            <div className="self-stretch p-3 justify-start items-start gap-4 inline-flex">
                                <img className="w-12 h-12 relative rounded-xl" src="https://via.placeholder.com/48x48"/>
                                <div
                                    className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                    <div className="self-stretch h-[39px] flex-col justify-start items-start flex">
                                        <div className="self-stretch justify-start items-start gap-3 inline-flex">
                                            <div
                                                className="grow shrink basis-0 text-black text-sm font-semibold font-['Inter'] leading-[21px]">
                                                Elmer Laverty
                                            </div>
                                            <div
                                                className="opacity-30 text-black text-sm font-semibold font-['Inter'] leading-[21px]">12m
                                            </div>
                                        </div>
                                        <div
                                            className="self-stretch text-black/opacity-40 text-xs font-semibold font-['Inter'] leading-[18px]">
                                            Haha oh man 🔥
                                        </div>
                                    </div>
                                    <div className="justify-start items-start gap-2 inline-flex">
                                        <div
                                            className="px-2 py-0.5 bg-amber-100 rounded-xl justify-start items-start gap-2.5 flex">
                                            <div
                                                className="text-amber-600 text-xs font-semibold font-['Inter'] leading-[18px]">Question
                                            </div>
                                        </div>
                                        <div
                                            className="px-2 py-0.5 bg-green-200 rounded-xl justify-start items-start gap-2.5 flex">
                                            <div
                                                className="text-green-500 text-xs font-semibold font-['Inter'] leading-[18px]">Help
                                                wanted
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="self-stretch p-3 bg-indigo-500/opacity-5 rounded-xl justify-start items-start gap-4 inline-flex">
                                <img className="w-12 h-12 relative rounded-xl" src="https://via.placeholder.com/48x48"/>
                                <div
                                    className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                    <div className="self-stretch h-[39px] flex-col justify-start items-start flex">
                                        <div className="self-stretch justify-start items-start gap-3 inline-flex">
                                            <div
                                                className="grow shrink basis-0 text-black text-sm font-semibold font-['Inter'] leading-[21px]">
                                                Florencio Dorrance
                                            </div>
                                            <div
                                                className="opacity-30 text-black text-sm font-semibold font-['Inter'] leading-[21px]">24m
                                            </div>
                                        </div>
                                        <div
                                            className="self-stretch text-black/opacity-40 text-xs font-semibold font-['Inter'] leading-[18px]">
                                            woohoooo
                                        </div>
                                    </div>
                                    <div className="justify-start items-start gap-2 inline-flex">
                                        <div
                                            className="px-2 py-0.5 rounded-xl border border-slate-300 justify-start items-start gap-2.5 flex">
                                            <div
                                                className="text-slate-500 text-xs font-semibold font-['Inter'] leading-[18px]">Some
                                                content
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="self-stretch p-3 justify-start items-start gap-4 inline-flex">
                                <img className="w-12 h-12 relative rounded-xl" src="https://via.placeholder.com/48x48"/>
                                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                    <div className="self-stretch h-[39px] flex-col justify-start items-start flex">
                                        <div className="self-stretch justify-start items-start gap-3 inline-flex">
                                            <div className="grow shrink basis-0 text-black text-sm font-semibold font-['Inter'] leading-[21px]">
                                                Lavern Laboy
                                            </div>
                                            <div className="opacity-30 text-black text-sm font-semibold font-['Inter'] leading-[21px]">1h
                                            </div>
                                        </div>
                                        <div className="self-stretch text-black/opacity-40 text-xs font-semibold font-['Inter'] leading-[18px]">
                                            Haha that's terrifying 😂
                                        </div>
                                    </div>
                                    <div className="justify-start items-start gap-2 inline-flex">
                                    <div
                                        className="px-2 py-0.5 bg-amber-100 rounded-xl justify-start items-start gap-2.5 flex">
                                        <div
                                            className="text-amber-600 text-xs font-semibold font-['Inter'] leading-[18px]">Bug
                                        </div>
                                    </div>
                                    <div
                                        className="px-2 py-0.5 bg-green-200 rounded-xl justify-start items-start gap-2.5 flex">
                                        <div
                                            className="text-green-500 text-xs font-semibold font-['Inter'] leading-[18px]">Hacktoberfest
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch p-3 justify-start items-start gap-4 inline-flex">
                            <img className="w-12 h-12 relative rounded-xl" src="https://via.placeholder.com/48x48"/>
                            <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                <div className="self-stretch h-[39px] flex-col justify-start items-start flex">
                                    <div className="self-stretch justify-start items-start gap-3 inline-flex">
                                        <div
                                            className="grow shrink basis-0 text-black text-sm font-semibold font-['Inter'] leading-[21px]">
                                            Titus Kitamura
                                        </div>
                                        <div
                                            className="opacity-30 text-black text-sm font-semibold font-['Inter'] leading-[21px]">5h
                                        </div>
                                    </div>
                                    <div
                                        className="self-stretch text-black/opacity-40 text-xs font-semibold font-['Inter'] leading-[18px]">
                                        omg, this is amazing
                                    </div>
                                </div>
                                <div className="justify-start items-start gap-2 inline-flex">
                                    <div
                                        className="px-2 py-0.5 bg-amber-100 rounded-xl justify-start items-start gap-2.5 flex">
                                        <div
                                            className="text-amber-600 text-xs font-semibold font-['Inter'] leading-[18px]">Question
                                        </div>
                                    </div>
                                    <div
                                        className="px-2 py-0.5 rounded-xl border border-slate-300 justify-start items-start gap-2.5 flex">
                                        <div
                                            className="text-slate-500 text-xs font-semibold font-['Inter'] leading-[18px]">Some
                                            content
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch p-3 justify-start items-start gap-4 inline-flex">
                            <img className="w-12 h-12 relative rounded-xl" src="https://via.placeholder.com/48x48"/>
                            <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                <div className="self-stretch h-[39px] flex-col justify-start items-start flex">
                                    <div className="self-stretch justify-start items-start gap-3 inline-flex">
                                        <div
                                            className="grow shrink basis-0 text-black text-sm font-semibold font-['Inter'] leading-[21px]">
                                            Geoffrey Mott
                                        </div>
                                        <div
                                            className="opacity-30 text-black text-sm font-semibold font-['Inter'] leading-[21px]">2d
                                        </div>
                                    </div>
                                    <div
                                        className="self-stretch text-black/opacity-40 text-xs font-semibold font-['Inter'] leading-[18px]">
                                        aww 😍
                                    </div>
                                </div>
                                <div className="justify-start items-start gap-2 inline-flex">
                                    <div
                                        className="px-2 py-0.5 bg-green-200 rounded-xl justify-start items-start gap-2.5 flex">
                                        <div
                                            className="text-green-500 text-xs font-semibold font-['Inter'] leading-[18px]">Request
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch p-3 justify-start items-start gap-4 inline-flex">
                            <img className="w-12 h-12 relative rounded-xl" src="https://via.placeholder.com/48x48"/>
                            <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                <div className="self-stretch h-[39px] flex-col justify-start items-start flex">
                                    <div className="self-stretch justify-start items-start gap-3 inline-flex">
                                        <div
                                            className="grow shrink basis-0 text-black text-sm font-semibold font-['Inter'] leading-[21px]">
                                            Alfonzo Schuessler
                                        </div>
                                        <div
                                            className="opacity-30 text-black text-sm font-semibold font-['Inter'] leading-[21px]">1m
                                        </div>
                                    </div>
                                    <div
                                        className="self-stretch text-black/opacity-40 text-xs font-semibold font-['Inter'] leading-[18px]">
                                        perfect!
                                    </div>
                                </div>
                                <div className="justify-start items-start gap-2 inline-flex">
                                    <div
                                        className="px-2 py-0.5 rounded-xl border border-slate-300 justify-start items-start gap-2.5 flex">
                                        <div
                                            className="text-slate-500 text-xs font-semibold font-['Inter'] leading-[18px]">Follow
                                            up
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div className="w-[700px] h-[700px] self-stretch overflow-y-auto bg-white flex-col justify-between items-start inline-flex">
                <div className="flex-col justify-start items-start flex">
                    <div className="w-[640px] h-20 p-6 justify-between items-center inline-flex sticky top-0 bg-white">
                        <div className="justify-start items-start gap-4 flex">
                            <img className="w-10 h-10 relative rounded-[10px]"
                                 src="https://via.placeholder.com/40x40"/>
                            <div className="flex-col justify-start items-start inline-flex">
                                <div
                                    className="text-black text-xl font-semibold font-['Inter'] leading-[25px]">Florencio
                                    Dorrance
                                </div>
                                <div className="justify-start items-center gap-2 inline-flex">
                                    <div className="w-2.5 h-2.5 bg-green-400 rounded-full"/>
                                    <div
                                        className="opacity-60 text-black text-xs font-semibold font-['Inter'] leading-[18px]">Online
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="px-4 py-2.5 bg-indigo-500/opacity-10 rounded-lg justify-start items-center gap-2 flex">
                            <div className="w-6 h-6 relative"/>
                            <div
                                className="text-indigo-500 text-base font-semibold font-['Inter'] leading-tight">Call
                            </div>
                        </div>
                    </div>
                    <div className="w-[640px] h-px opacity-10 bg-black"/>
                    <div className="h-[700px] p-6 flex-col justify-start items-start gap-8 flex overflow-y-auto">
                        <div className="self-stretch justify-start items-start gap-4 inline-flex">
                            <img className="w-10 h-10 relative rounded-lg" src="https://via.placeholder.com/40x40"/>
                            <div className="flex-col justify-start items-start gap-2.5 inline-flex">
                                <div
                                    className="px-4 py-2 bg-zinc-100 rounded-xl justify-start items-start gap-2.5 inline-flex">
                                    <div
                                        className="text-black text-sm font-normal font-['Inter'] leading-[21px]">omg,
                                        this is amazing
                                    </div>
                                </div>
                                <div
                                    className="px-4 py-2 bg-zinc-100 rounded-xl justify-start items-start gap-2.5 inline-flex">
                                    <div
                                        className="text-black text-sm font-normal font-['Inter'] leading-[21px]">perfect!
                                        ✅
                                    </div>
                                </div>
                                <div
                                    className="px-4 py-2 bg-zinc-100 rounded-xl justify-start items-start gap-2.5 inline-flex">
                                    <div
                                        className="text-black text-sm font-normal font-['Inter'] leading-[21px]">Wow,
                                        this is really epic
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[600px] self-stretch justify-end items-start gap-4 inline-flex">
                            <div className="flex-col justify-start items-start gap-2.5 inline-flex">
                                <div
                                    className="px-4 py-2 bg-indigo-500 rounded-xl justify-start items-start gap-2.5 inline-flex">
                                    <div
                                        className="text-white text-sm font-normal font-['Inter'] leading-[21px]">How
                                        are you?
                                    </div>
                                </div>
                            </div>
                            <img className="w-10 h-10 relative rounded-lg" src="https://via.placeholder.com/40x40"/>
                        </div>
                        <div className="self-stretch justify-start items-start gap-4 inline-flex">
                            <img className="w-10 h-10 relative rounded-lg" src="https://via.placeholder.com/40x40"/>
                            <div className="flex-col justify-start items-start gap-2.5 inline-flex">
                                <div
                                    className="px-4 py-2 bg-zinc-100 rounded-xl justify-start items-start gap-2.5 inline-flex">
                                    <div
                                        className="text-black text-sm font-normal font-['Inter'] leading-[21px]">just
                                        ideas for next time
                                    </div>
                                </div>
                                <div
                                    className="px-4 py-2 bg-zinc-100 rounded-xl justify-start items-start gap-2.5 inline-flex">
                                    <div
                                        className="text-black text-sm font-normal font-['Inter'] leading-[21px]">I'll
                                        be there in 2 mins ⏰
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch justify-end items-start gap-4 inline-flex">
                            <div className="flex-col justify-start items-end gap-2.5 inline-flex">
                                <div
                                    className="px-4 py-2 bg-indigo-500 rounded-xl justify-start items-start gap-2.5 inline-flex">
                                    <div
                                        className="text-white text-sm font-normal font-['Inter'] leading-[21px]">woohoooo
                                    </div>
                                </div>
                                <div
                                    className="px-4 py-2 bg-indigo-500 rounded-xl justify-start items-start gap-2.5 inline-flex">
                                    <div
                                        className="text-white text-sm font-normal font-['Inter'] leading-[21px]">Haha
                                        oh man
                                    </div>
                                </div>
                                <div
                                    className="px-4 py-2 bg-indigo-500 rounded-xl justify-start items-start gap-2.5 inline-flex">
                                    <div
                                        className="text-white text-sm font-normal font-['Inter'] leading-[21px]">Haha
                                        that's terrifying 😂
                                    </div>
                                </div>
                            </div>
                            <img className="w-10 h-10 relative rounded-lg" src="https://via.placeholder.com/40x40"/>
                        </div>
                        <div className="self-stretch justify-start items-start gap-4 inline-flex">
                            <img className="w-10 h-10 relative rounded-lg" src="https://via.placeholder.com/40x40"/>
                            <div className="flex-col justify-start items-start gap-2.5 inline-flex">
                                <div
                                    className="px-4 py-2 bg-zinc-100 rounded-xl justify-start items-start gap-2.5 inline-flex">
                                    <div
                                        className="text-black text-sm font-normal font-['Inter'] leading-[21px]">aww
                                    </div>
                                </div>
                                <div
                                    className="px-4 py-2 bg-zinc-100 rounded-xl justify-start items-start gap-2.5 inline-flex">
                                    <div
                                        className="text-black text-sm font-normal font-['Inter'] leading-[21px]">omg,
                                        this is amazing
                                    </div>
                                </div>
                                <div
                                    className="px-4 py-2 bg-zinc-100 rounded-xl justify-start items-start gap-2.5 inline-flex">
                                    <div
                                        className="text-black text-sm font-normal font-['Inter'] leading-[21px]">woohoooo
                                        🔥
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="self-stretch p-6 justify-start items-center gap-6 inline-flex sticky bottom-0 bg-white">
                    <div className="w-6 h-6 relative"/>
                    <div
                        className="grow shrink basis-0 h-12 px-5 py-2.5 bg-white rounded-xl border-2 border-slate-200 justify-between items-center flex">
                        <div
                            className="opacity-40 text-black text-sm font-normal font-['Inter'] leading-[21px]">Type
                            a message
                        </div>
                        <div className="w-6 h-6 relative"/>
                    </div>
                </div>
            </div>
                <div className="w-[362px] h-[700px] self-stretch overflow-y-auto bg-white shadow flex-col justify-start items-start gap-6 inline-flex">
                <div className="self-stretch h-[81px] flex-col justify-start items-start flex">
                        <div className="self-stretch h-20 p-6 justify-between items-center inline-flex">
                            <div className="justify-start items-center gap-2.5 flex">
                                <div className="justify-start items-center gap-1.5 flex">
                                    <div
                                        className="text-black text-xl font-semibold font-['Inter'] leading-[30px]">Directory
                                    </div>
                                </div>
                            </div>
                            <div className="w-10 h-10 relative">
                                <div className="w-10 h-10 left-[40px] top-0 absolute origin-top-left rotate-90"/>
                                <div
                                    className="w-1 h-[18px] left-[18px] top-[11px] absolute flex-col justify-start items-start gap-[3px] inline-flex">
                                    <div className="w-1 h-1 bg-indigo-500 rounded-full"/>
                                    <div className="w-1 h-1 bg-indigo-500 rounded-full"/>
                                    <div className="w-1 h-1 bg-indigo-500 rounded-full"/>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch h-px opacity-10 bg-black"/>
                    </div>
                    <div className="self-stretch h-[502px] px-4 flex-col justify-start items-start gap-2 flex">
                        <div className="justify-start items-center gap-2 inline-flex">
                            <div className="text-black text-sm font-semibold font-['Inter'] leading-[21px]">Team
                                Members
                            </div>
                            <div
                                className="px-2 py-0.5 bg-slate-100 rounded-3xl flex-col justify-start items-start gap-2.5 inline-flex">
                                <div className="text-black text-xs font-semibold font-['Inter'] leading-[18px]">6</div>
                            </div>
                        </div>
                        <div className="self-stretch p-3 justify-start items-start gap-4 inline-flex">
                            <img className="w-12 h-12 relative rounded-xl" src="https://via.placeholder.com/48x48"/>
                            <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                <div className="self-stretch h-[39px] flex-col justify-start items-start flex">
                                    <div className="self-stretch justify-start items-start gap-3 inline-flex">
                                        <div
                                            className="grow shrink basis-0 text-black text-sm font-semibold font-['Inter'] leading-[21px]">Florencio
                                            Dorrance
                                        </div>
                                    </div>
                                    <div
                                        className="self-stretch text-black/opacity-40 text-xs font-semibold font-['Inter'] leading-[18px]">Market
                                        Development Manager
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch p-3 justify-start items-start gap-4 inline-flex">
                            <img className="w-12 h-12 relative rounded-xl" src="https://via.placeholder.com/48x48"/>
                            <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                <div className="self-stretch h-[39px] flex-col justify-start items-start flex">
                                    <div className="self-stretch justify-start items-start gap-3 inline-flex">
                                        <div
                                            className="grow shrink basis-0 text-black text-sm font-semibold font-['Inter'] leading-[21px]">Benny
                                            Spanbauer
                                        </div>
                                    </div>
                                    <div
                                        className="self-stretch text-black/opacity-40 text-xs font-semibold font-['Inter'] leading-[18px]">Area
                                        Sales Manager
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch p-3 justify-start items-start gap-4 inline-flex">
                            <img className="w-12 h-12 relative rounded-xl" src="https://via.placeholder.com/48x48"/>
                            <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                <div className="self-stretch h-[39px] flex-col justify-start items-start flex">
                                    <div className="self-stretch justify-start items-start gap-3 inline-flex">
                                        <div
                                            className="grow shrink basis-0 text-black text-sm font-semibold font-['Inter'] leading-[21px]">Jamel
                                            Eusebio
                                        </div>
                                    </div>
                                    <div
                                        className="self-stretch text-black/opacity-40 text-xs font-semibold font-['Inter'] leading-[18px]">Administrator
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch p-3 justify-start items-start gap-4 inline-flex">
                            <img className="w-12 h-12 relative rounded-xl" src="https://via.placeholder.com/48x48"/>
                            <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                <div className="self-stretch h-[39px] flex-col justify-start items-start flex">
                                    <div className="self-stretch justify-start items-start gap-3 inline-flex">
                                        <div
                                            className="grow shrink basis-0 text-black text-sm font-semibold font-['Inter'] leading-[21px]">Lavern
                                            Laboy
                                        </div>
                                    </div>
                                    <div
                                        className="self-stretch text-black/opacity-40 text-xs font-semibold font-['Inter'] leading-[18px]">Account
                                        Executive
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch p-3 justify-start items-start gap-4 inline-flex">
                            <img className="w-12 h-12 relative rounded-xl" src="https://via.placeholder.com/48x48"/>
                            <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                <div className="self-stretch h-[39px] flex-col justify-start items-start flex">
                                    <div className="self-stretch justify-start items-start gap-3 inline-flex">
                                        <div
                                            className="grow shrink basis-0 text-black text-sm font-semibold font-['Inter'] leading-[21px]">Alfonzo
                                            Schuessler
                                        </div>
                                    </div>
                                    <div
                                        className="self-stretch text-black/opacity-40 text-xs font-semibold font-['Inter'] leading-[18px]">Proposal
                                        Writer
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch p-3 justify-start items-start gap-4 inline-flex">
                            <img className="w-12 h-12 relative rounded-xl" src="https://via.placeholder.com/48x48"/>
                            <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                <div className="self-stretch h-[39px] flex-col justify-start items-start flex">
                                    <div className="self-stretch justify-start items-start gap-3 inline-flex">
                                        <div
                                            className="grow shrink basis-0 text-black text-sm font-semibold font-['Inter'] leading-[21px]">Daryl
                                            Nehls
                                        </div>
                                    </div>
                                    <div
                                        className="self-stretch text-black/opacity-40 text-xs font-semibold font-['Inter'] leading-[18px]">Nursing
                                        Assistant
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch h-px bg-black/opacity-10"/>
                    <div className="self-stretch h-[422px] px-4 flex-col justify-start items-start gap-2 flex">
                        <div className="justify-start items-center gap-2 inline-flex">
                            <div className="text-black text-sm font-semibold font-['Inter'] leading-[21px]">Files</div>
                            <div
                                className="px-2 py-0.5 bg-slate-100 rounded-3xl flex-col justify-start items-start gap-2.5 inline-flex">
                                <div className="text-black text-xs font-semibold font-['Inter'] leading-[18px]">125
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch p-3 justify-start items-center gap-4 inline-flex">
                            <div
                                className="w-12 h-12 p-[17px] bg-red-50 rounded-xl flex-col justify-center items-center gap-2.5 inline-flex">
                                <div className="w-6 h-6 relative"/>
                            </div>
                            <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                <div className="self-stretch h-[39px] flex-col justify-start items-start flex">
                                    <div className="self-stretch justify-start items-start gap-3 inline-flex">
                                        <div
                                            className="grow shrink basis-0 text-black text-sm font-semibold font-['Inter'] leading-[21px]">i9.pdf
                                        </div>
                                    </div>
                                    <div className="justify-start items-start gap-2.5 inline-flex">
                                        <div
                                            className="text-black/opacity-40 text-xs font-semibold font-['Inter'] leading-[18px]">PDF
                                        </div>
                                        <div
                                            className="text-black/opacity-40 text-xs font-semibold font-['Inter'] leading-[18px]">9mb
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-6 h-6 relative"/>
                        </div>
                        <div className="self-stretch p-3 justify-start items-center gap-4 inline-flex">
                            <div
                                className="w-12 h-12 p-[17px] bg-green-50 rounded-xl flex-col justify-center items-center gap-2.5 inline-flex">
                                <div className="w-6 h-6 relative"/>
                            </div>
                            <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                <div className="self-stretch h-[39px] flex-col justify-start items-start flex">
                                    <div className="self-stretch justify-start items-start gap-3 inline-flex">
                                        <div
                                            className="grow shrink basis-0 text-black text-sm font-semibold font-['Inter'] leading-[21px]">Screenshot-3817.png
                                        </div>
                                    </div>
                                    <div className="justify-start items-start gap-2.5 inline-flex">
                                        <div
                                            className="text-black/opacity-40 text-xs font-semibold font-['Inter'] leading-[18px]">PNG
                                        </div>
                                        <div
                                            className="text-black/opacity-40 text-xs font-semibold font-['Inter'] leading-[18px]">4mb
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-6 h-6 relative"/>
                        </div>
                        <div className="self-stretch p-3 justify-start items-center gap-4 inline-flex">
                            <div
                                className="w-12 h-12 p-[17px] bg-blue-50 rounded-xl flex-col justify-center items-center gap-2.5 inline-flex">
                                <div className="w-6 h-6 relative"/>
                            </div>
                            <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                <div className="self-stretch h-[39px] flex-col justify-start items-start flex">
                                    <div className="self-stretch justify-start items-start gap-3 inline-flex">
                                        <div
                                            className="grow shrink basis-0 text-black text-sm font-semibold font-['Inter'] leading-[21px]">sharefile.docx
                                        </div>
                                    </div>
                                    <div className="justify-start items-start gap-2.5 inline-flex">
                                        <div
                                            className="text-black/opacity-40 text-xs font-semibold font-['Inter'] leading-[18px]">DOC
                                        </div>
                                        <div
                                            className="text-black/opacity-40 text-xs font-semibold font-['Inter'] leading-[18px]">555kb
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-6 h-6 relative"/>
                        </div>
                        <div className="self-stretch p-3 justify-start items-center gap-4 inline-flex">
                            <div
                                className="w-12 h-12 p-[17px] bg-purple-50 rounded-xl flex-col justify-center items-center gap-2.5 inline-flex">
                                <div className="w-6 h-6 relative"/>
                            </div>
                            <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                <div className="self-stretch h-[39px] flex-col justify-start items-start flex">
                                    <div className="self-stretch justify-start items-start gap-3 inline-flex">
                                        <div
                                            className="grow shrink basis-0 text-black text-sm font-semibold font-['Inter'] leading-[21px]">Jerry-2020_I-9_Form.xxl
                                        </div>
                                    </div>
                                    <div className="justify-start items-start gap-2.5 inline-flex">
                                        <div
                                            className="text-black/opacity-40 text-xs font-semibold font-['Inter'] leading-[18px]">XXL
                                        </div>
                                        <div
                                            className="text-black/opacity-40 text-xs font-semibold font-['Inter'] leading-[18px]">24mb
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-6 h-6 relative"/>
                        </div>
                        <div className="self-stretch p-3 justify-start items-center gap-4 inline-flex">
                            <div
                                className="w-12 h-12 p-[17px] bg-red-50 rounded-xl flex-col justify-center items-center gap-2.5 inline-flex">
                                <div className="w-6 h-6 relative"/>
                            </div>
                            <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                <div className="self-stretch h-[39px] flex-col justify-start items-start flex">
                                    <div className="self-stretch justify-start items-start gap-3 inline-flex">
                                        <div
                                            className="grow shrink basis-0 text-black text-sm font-semibold font-['Inter'] leading-[21px]">i9.pdf
                                        </div>
                                    </div>
                                    <div className="justify-start items-start gap-2.5 inline-flex">
                                        <div
                                            className="text-black/opacity-40 text-xs font-semibold font-['Inter'] leading-[18px]">PDF
                                        </div>
                                        <div
                                            className="text-black/opacity-40 text-xs font-semibold font-['Inter'] leading-[18px]">9mb
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-6 h-6 relative"/>
                        </div>
                    </div>
                </div>
            </div>
        </ChatContainer>
    );
}

export default Chat;
