import React, { useRef, useState } from 'react';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import { HeaderBranding, HeaderChild } from './branding';
import { getHttpRequestConfig, useAxios } from '../../utils';
import { usePromiseToast } from '../../hooks';
import { ButtonClickFn, InputChangeFn, SetState } from '../../types';
import './styles.scss';

type RefreshDataHandler = () => void;
type Props = {
    childPage?: boolean;
}
export const Layout: React.FC<Props> = ({ childPage }) => {
    const [refreshDataHandler, setRefreshDataHandler] = useState<RefreshDataHandler | null>(null);
    const navigate = useNavigate();
    const handleAddCustomer: ButtonClickFn<void> = (event) => {
        event.preventDefault()
        navigate('/customer-management');
    };
    
    const uploadInput = useRef<HTMLInputElement | null>(null);
    const handleUploadCustomer: ButtonClickFn<void> = (event) => {
        event.preventDefault()
        uploadInput.current?.click();
    };
    
    const axios = useAxios();
    const toast = usePromiseToast();
    const [uploading, setUploading] = useState(false);
    const onUpload: InputChangeFn<HTMLInputElement> = async (event) => {
        try {
            const { files } = event.currentTarget;
            if (files) {
                setUploading(true);
                const formData = new FormData();
                for (let i = 0; i < files.length; i++) {
                    formData.append('file[]', files[i]);
                }
                
                const httpRequestConfig = {
                    ...getHttpRequestConfig('POST'),
                    url: '/customer/load',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    data: formData
                };
                
                await toast(axios(httpRequestConfig), 'Uploading...');
                setUploading(false);
                refreshDataHandler && refreshDataHandler();
            }
        } catch (e) {
            setUploading(false);
        }
    }
    
    return (
        <main>
            <header>
                {childPage ? <HeaderChild /> : (
                    <HeaderBranding
                        ref={uploadInput}
                        addCustomerHandler={handleAddCustomer}
                        uploadCustomerData={handleUploadCustomer}
                        onUpload={onUpload}
                        uploading={uploading}
                    />
                )}
            </header>
            <div className="content">
                <Outlet context={{
                    setIsRefreshing: setUploading,
                    setRefreshDataHandler,
                    addCustomerHandler: handleAddCustomer,
                    uploadCustomerDataHandler: handleUploadCustomer
                }} />
            </div>
        </main>
    );
}

type OutletContextProps = {
    addCustomerHandler: ButtonClickFn<void>;
    setIsRefreshing: SetState<boolean>;
    setRefreshDataHandler: SetState<RefreshDataHandler | null>;
    uploadCustomerDataHandler: ButtonClickFn<void>;
}

export function useLayoutContext() {
    return useOutletContext<OutletContextProps>();
}
