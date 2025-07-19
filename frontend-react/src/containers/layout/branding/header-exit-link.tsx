import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LinkClickFn } from '../../../types';

export const HeaderExitLink: React.FC = () => {
    const navigate = useNavigate();
    const handleExit: LinkClickFn = (event) => {
        event.preventDefault();
        navigate(-1);
    };
    
    return (
        <Link to='/' onClick={handleExit}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#353f4d"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x"
            >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
        </Link>
    );
}
