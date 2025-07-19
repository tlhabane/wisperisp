import React, { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from 'react-router-dom';
import { formConfig } from './config';
import { CustomerForm } from './customer.form';
import { Button, Form, ContainerSpinner } from '../../components';
import { StickyFooter } from '../../containers';
import { useScreenWidth, usePromiseToast } from '../../hooks';
import { getHttpRequestConfig, useAxios, useFetchData, useForm, useFormElements } from '../../utils';
import { ButtonClickFn } from '../../types';
import { Customer } from '../../models';
import { APP_NAME } from '../../config';

let initLoading = true;
export default function CustomerManagement(): React.JSX.Element {
    document.title = `Manage Customer :: ${APP_NAME}`;
    
    const customerForm = useForm(formConfig);
    const {
        formData,
        formInvalid,
        handleSubmit,
        onBlur,
        onChange,
        onReactSelectChange,
        resetForm,
        setFormData
    } = customerForm;
    
    const axios = useAxios();
    const navigate = useNavigate();
    const toast = usePromiseToast();
    const queryClient = useQueryClient();
    
    const onSubmit = handleSubmit((validated, button) => {
        console.log(validated, button);
        button?.classList.add('loading');
        const customerId = (validated?.id?.toString() || '').trim();
        const httpRequestConfig = {
            ...getHttpRequestConfig(customerId === '' ? 'POST' : 'PATCH'),
            url: '/customer',
            data: { ...validated }
        };
        const process = customerId === '' ? 'Adding new customer' : 'Updating customer info';
        toast(axios(httpRequestConfig), `${process}...`)
            .then(() => queryClient.invalidateQueries({
                queryKey: ['customers', 'cities', 'states'],
                refetchType: 'all'
            }))
            .then(() => {
                resetForm();
                navigate('/', { replace: true });
            })
            .finally(() => {
                button?.classList.remove('loading');
                resetForm();
            })
    });
    
    const { id } = useParams();
    const fetchConfig = useMemo(() => ({
        url: '/customer',
        queryKey: ['customers'],
        params: { id },
        staleTime: 60000
    }), [id]);
    const { data, isLoading } = useFetchData(fetchConfig);
    
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const title = id ? 'Add New Customer' : 'Update Customer';
        document.title = `${title} :: ${APP_NAME}`;
    }, [id]);
    
    useEffect(() => {
        if (data && id) {
            if (initLoading) {
                const updatedCustomerList = (data?.records || []) as Customer[];
                if (updatedCustomerList.length === 1) {
                    const updatedFormData = Object.entries(formData).reduce((acc: any, [key, props]) => {
                        const value = (updatedCustomerList[0] as any)[key];
                        acc[key] = { ...props, error: '', value }
                        return acc;
                    }, {});
        
                    setFormData({ ...updatedFormData});
                }

                initLoading = false;
            }
        }
    
        setLoading(false);
    }, [data, formData, loading, id, setFormData]);
    
    const getElement = useFormElements<Customer>();
    const screenWidth = useScreenWidth();
    const mobilePadding = screenWidth <= 768 ? 'pr-sm-0 pl-sm-0' : '';
    const tabletPadding = screenWidth <= 810 ? 'pr-md-0 pl-md-0' : '';
    
    const handleCancel: ButtonClickFn<void> = (event) => {
        event.preventDefault()
        navigate(-1);
    };
    
    console.log('form state', formInvalid);
    
    if (isLoading || loading) {
        return <ContainerSpinner />
    }
    
    return (
        <Form onSubmit={onSubmit}>
            <CustomerForm
                getElement={getElement}
                formConfig={formData}
                onBlur={onBlur}
                onChange={onChange}
                onSelect={onReactSelectChange}
                mobilePadding={mobilePadding}
                tabletPadding={tabletPadding}
            />
            <StickyFooter>
                <div className="row">
                    <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                        <div className="form-group mt-3 mb-3">
                            <div className="row">
                                <div className="col-3 pr-sm-0 pl-sm-0">
                                    <Button type="button" className="btn-default btn-block" onClick={handleCancel}>
                                        Cancel
                                    </Button>
                                </div>
                                <div className="col-8 offset-1 pr-sm-0 pl-sm-0">
                                    <Button type="submit" className="btn-primary btn-block" disabled={formInvalid}>
                                        <i className="custom-icon icon left-icon save"/>
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </StickyFooter>
        </Form>
    )
}
