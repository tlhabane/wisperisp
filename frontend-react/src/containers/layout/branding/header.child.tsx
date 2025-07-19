import React from 'react';
import { ReactLogo } from './react-logo';
import { HeaderExitLink } from './header-exit-link';

export const HeaderChild: React.FC = () => (
    <div className="header-inner">
        <ReactLogo />
        <HeaderExitLink />
    </div>
);
