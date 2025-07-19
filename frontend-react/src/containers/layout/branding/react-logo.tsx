import React from 'react';
import logo from '../../../static/images/logo.svg';
import { APP_NAME } from '../../../config';

export const ReactLogo: React.FC = () => (
    <div className="d-flex flex-row align-items-center">
        <img src={logo} alt={APP_NAME} style={{ maxHeight: 50 }}/>
        <div className="d-flex flex-column pl-2">
            <span className="font-weight-bold text-nowrap">
                Code Assignment
            </span>
            <span className="small">Wisper ISP</span>
        </div>
    </div>
);
