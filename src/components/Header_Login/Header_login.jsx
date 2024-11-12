import React from "react";
import './Header_login.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";

function Header({ title }) {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className='header'>
            <button onClick={handleBack} className='back-button'>
                <FaArrowLeftLong className='back' style={{ color: 'white', width: '30px', height: '30px' }} />
            </button>
            <h1>{title}</h1>
        </div>
    );
}

export default Header;