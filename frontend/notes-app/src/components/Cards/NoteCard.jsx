
import moment from 'moment';
import React, { useState, useEffect, useRef } from 'react';
import { MdOutlinePushPin, MdCreate, MdDelete, MdMoreVert, MdFlag } from "react-icons/md";

const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote,
}) => {
    const [showDateTooltip, setShowDateTooltip] = useState(false);
    const [showPriorityMenu, setShowPriorityMenu] = useState(false);
    const [priority, setPriority] = useState(0); // 0: default, 1: high, 2: medium, 3: low
    const cardRef = useRef(null);

    const handleToggleDate = () => {
        setShowDateTooltip(prev => !prev);
    };

    const handleHideDate = () => {
        setShowDateTooltip(false);
    };

    const handleClickOutside = (event) => {
        if (cardRef.current && !cardRef.current.contains(event.target)) {
            handleHideDate();
            setShowPriorityMenu(false);
        }
    };

    const handlePriorityChange = (level) => {
        setPriority(level);
        setShowPriorityMenu(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const formattedDate = moment(date).isValid() ? moment(date).local().format('Do MMM YYYY') : "Invalid date";

    const priorityColors = ['text-slate-300', 'text-red-500', 'text-orange-500', 'text-blue-500'];
    const priorityFillColors = ['fill-slate-300', 'fill-red-500', 'fill-orange-500', 'fill-blue-500'];

    return (
        <div ref={cardRef} className='border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out w-112 h-32'>
            <div className="flex items-center justify-between">
                <div>
                    <h6 className="text-sm font-medium">{title}</h6>
                </div>
                <div className="flex items-center gap-2">
                    <MdOutlinePushPin className={`icon-btn ${isPinned ? 'text-primary' : 'text-slate-300'}`} onClick={onPinNote} />
                    <div className="relative">
                        <MdFlag className={`icon-btn ${priorityColors[priority]}`} onClick={() => setShowPriorityMenu(prev => !prev)} />
                        {showPriorityMenu && (
                            <div className="absolute bg-white border rounded shadow-lg py-2 px-4 mt-1 right-0 z-20 w-40">
                                <div className="flex flex-col">
                                    <button className="flex items-center gap-2 text-left" onClick={() => handlePriorityChange(1)}>
                                        <MdFlag className="text-red-500" />
                                        Priority 1
                                    </button>
                                    <button className="flex items-center gap-2 text-left" onClick={() => handlePriorityChange(2)}>
                                        <MdFlag className="text-orange-500" />
                                        Priority 2
                                    </button>
                                    <button className="flex items-center gap-2 text-left" onClick={() => handlePriorityChange(3)}>
                                        <MdFlag className="text-blue-500" />
                                        Priority 3
                                    </button>
                                    <button className="flex items-center gap-2 text-left" onClick={() => handlePriorityChange(0)}>
                                        <MdFlag className="text-slate-300" />
                                        Default
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <p className="text-xs text-slate-600 mt-2 overflow-hidden">{content?.slice(0, 60)}</p>
            <div className='flex items-center justify-between mt-2'>
                <div className='text-xs text-slate-500 overflow-hidden'>{tags.map((item) => `#${item}`).join(' ')}</div>
                <div className='flex gap-2 items-center relative'>
                    <MdCreate
                        className='icon-btn hover:text-green-600'
                        onClick={() => {
                            onEdit();
                            handleHideDate();
                        }}
                    />
                    <MdDelete
                        className='icon-btn hover:text-red-500'
                        onClick={() => {
                            onDelete();
                            handleHideDate();
                        }}
                    />
                    <div className='relative'>
                        <MdMoreVert
                            className='icon-btn text-slate-300 cursor-pointer'
                            onClick={handleToggleDate}
                        />
                        {showDateTooltip && (
                            <span className="absolute bg-gray-700 text-white text-xs py-1 px-2 rounded whitespace-nowrap right-0 transform translate-x-1/4 top-full mt-1 z-20">
                                {formattedDate ? `Note Created On: ${formattedDate}` : "Invalid date"}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteCard;
