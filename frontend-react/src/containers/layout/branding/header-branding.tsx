import React from 'react';
import { GithubLogo } from "./github-logo";
import { ReactLogo } from "./react-logo";
import { Button } from '../../../components';
import { ButtonClickFn, InputChangeFn } from "../../../types";

interface Props extends React.HTMLProps<HTMLInputElement> {
    uploading: boolean;
    addCustomerHandler: ButtonClickFn<void>;
    uploadCustomerData: ButtonClickFn<void>;
    onUpload: InputChangeFn<HTMLInputElement>;
}

export const HeaderBranding = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
    const { addCustomerHandler,  uploading, uploadCustomerData, onUpload } = props;
    
    return (
        <div className="header-inner">
            <ReactLogo />
            <input
                accept=".csv"
                onChange={onUpload}
                type="file"
                style={{ opacity: 0, position: "absolute" }}
                ref={ref}
                multiple
            />
            <div className="d-flex flex-row align-items-center justify-content-end">
                <div className="d-flex flex-row align-items-center mr-4">
                    <Button className={`btn btn-success px-2 ${uploading ? 'loading' : ''}`} onClick={uploadCustomerData} disabled={uploading}>
                        <i
                            className="custom-icon icon left-icon upload"
                            style={{ width: 20, height: 20 }}
                        />
                        <span className="text-right pl-4 pr-2 ml-3">Upload</span>
                    </Button>
                    <div className="btn-divider mx-3" />
                    <button
                        type="button"
                        className="profile-dropdown-toggle tooltip-bottom"
                        data-tooltip="Add Customer"
                        onClick={addCustomerHandler}
                    >
                        <i
                            className="custom-icon icon plus-circle"
                            style={{ width: 30, height: 30 }}
                        />
                    </button>
                </div>
                <div className="btn-divider mx-2" />
                <GithubLogo />
            </div>
        </div>
    );
});
