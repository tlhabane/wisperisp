import React from 'react';
import './styles.scss';

export const StickyFooter: React.FC<React.HTMLProps<HTMLDivElement>> = ({ children, className, ...rest }) => (
    <footer {...rest} className={`sticky-footer ${className || ''}`}>
        <div className="footer-inner">
            {children}
        </div>
    </footer>
);
