import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCommentDots, faGear, faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SlideBarMain: React.FC = () => {
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const settingsRef = useRef<HTMLDivElement>(null);

    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
                setShowSettings(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="w-[88px] h-[725px] px-4 pt-4 pb-6 bg-white shadow flex-col justify-between items-center inline-flex">
            <div className="flex-col justify-center items-center gap-12 flex">
                <div className="w-14 h-14 py-[12.25px] bg-indigo-500 rounded-[14px] justify-center items-center inline-flex">
                    <div className="w-[15.75px] h-[31.50px] text-white text-[21px] font-bold font-['Asap'] leading-loose">Q</div>
                </div>
                <div className="flex-col justify-center items-center gap-8 flex">
                    <div className="w-6 h-6 relative">
                        <FontAwesomeIcon icon={faHouse} />
                    </div>
                    <div className="w-6 h-6 relative">
                        <FontAwesomeIcon icon={faCommentDots} />
                    </div>
                    <div className="w-6 h-6 relative">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                    <div className="w-6 h-6 relative">
                        <FontAwesomeIcon icon={faCalendar} />
                    </div>
                </div>
            </div>
            <div
                className="relative w-6 h-6"
                onClick={() => setShowSettings(!showSettings)}
                ref={settingsRef}
            >
                <FontAwesomeIcon icon={faGear} />
                {showSettings && (
                    <div className="absolute bottom-0 left-8 bg-white border border-gray-200 rounded shadow-lg w-32 z-10">
                        <div className="flex flex-col">
                            <button className="py-2 px-4 text-left hover:bg-gray-100">Profile</button>
                            <button className="py-2 px-4 text-left hover:bg-gray-100">Logout</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SlideBarMain;
