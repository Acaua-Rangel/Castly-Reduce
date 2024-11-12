import React, { useState } from "react";
import './PlatformManage.css';
import EditPlatform from '../Edit_Plataform/Edit_platform';

const PlatformManage = ({ name, url, streamKey: initialStreamKey, checked: initialChecked = false, onRemove, onState, onStreamKey }) => {
    const [checked, setChecked] = useState(initialChecked);
    const [streamKey, setStreamKey] = useState(initialStreamKey);
    const [showEdit, setShowEdit] = useState(false);

    const icons = {
        YouTube: 'bx bxl-youtube',
        Twitch: 'bx bxl-twitch',
        Facebook: 'bx bxl-facebook-square',
        Kick: 'bx bxl-kickstarter',
        TikTok: null,
        other: 'bx bx-shape-square'
    };

    const icon = name in icons ? icons[name] : icons.other;

    const handleChange = () => {
        setChecked(!checked);
        if (onState) {
            onState(!checked);
        }
    };

    const toggleEdit = () => {
        setShowEdit(!showEdit);
    };

    const handleRemove = () => {
        if (onRemove) {
            onRemove();
        }
    };

    const updateParentState = (newValue) => {
        setStreamKey(newValue);
        if (onStreamKey) {
            onStreamKey(newValue);
        }
    };

    return (
        <div className='flex flex-col w-full'>
            <div className="platform-item w-full">
            <div className="flex flex-row gap-5 items-center overflow-hidden">
                {icon ? (
                    <i className={`${icon} text-5xl text-black dark:text-white`}></i>
                ) : (
                    name === "TikTok" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74a2.89 2.89 0 0 1 2.31-4.64a2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="currentColor"/></svg>
                    )
                )}
                <div className='left-it'>
                    <h4 className="text-black dark:text-white font-medium text-base"><strong>{name}</strong></h4>
                    <h5 className="text-black dark:text-white font-normal text-sm">RTMP URL: {url.substring(0, 15)}...</h5>
                </div>
            </div>
                <div className="right-it items-center">
                    <button className="edit justify-center" onClick={toggleEdit}>
                        <i className='bx bxs-edit'></i>
                    </button>
                    <label className="inline-flex items-center mb-1 cursor-pointer">
                        <input type="checkbox" checked={checked} onChange={handleChange} value="" className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-gray peer-focus:outline-none rounded-full peer dark:bg-gray peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple"></div>
                    </label>
                    <button onClick={handleRemove} className="trash justify-center"><i className='bx bx-trash'></i></button>
                </div>
            </div>

            <div className={`edit-platform-container ${showEdit ? 'open' : ''}`}>
                <EditPlatform updateParentState={updateParentState} streamKey={streamKey}/>
            </div>
        </div>
    );
};

export default PlatformManage;
