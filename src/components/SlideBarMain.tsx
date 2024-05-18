import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faCommentDots, faGear, faHouse, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

const SlideBarMain = () => {
    return (
        <div
            className="w-[88px] h-[725px] px-4 pt-4 pb-6 bg-white shadow flex-col justify-between items-center inline-flex">
            <div className="flex-col justify-center items-center gap-12 flex">
                <div
                    className="w-14 h-14 py-[12.25px] bg-indigo-500 rounded-[14px] justify-center items-center inline-flex">
                    <div
                        className="w-[15.75px] h-[31.50px] text-white text-[21px] font-bold font-['Asap'] leading-loose">Q
                    </div>
                </div>
                <div className="flex-col justify-center items-center gap-8 flex">
                    <div className="w-6 h-6 relative">
                        <FontAwesomeIcon icon={faHouse}/>
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
            <div className="w-6 h-6 relative">
                <FontAwesomeIcon icon={faGear} />
            </div>
        </div>
    )
}
export default SlideBarMain
