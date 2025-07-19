import React from 'react';

export const DropdownToggle = React.forwardRef<HTMLButtonElement, React.HTMLProps<HTMLButtonElement>>((props, ref) => {
    const { children, className, onClick, style } = props;
    return (
        <button
            style={style}
            className={className}
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            aria-label="dropdown"
            ref={ref}
            onClick={onClick}
            type="button"
        >
            {children}
        </button>
    );
});
