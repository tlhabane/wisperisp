import React from 'react';
import {
    FormInput,
    FormState,
    InputChangeFn,
    InputFocusFn,
    ReactSelectFn
} from '../../types';

type Props = {
    getElement: (name: any, props: FormInput<string>, handlers?: any) => React.JSX.Element;
    formConfig: FormState<any>;
    onBlur?: InputFocusFn<HTMLInputElement | HTMLTextAreaElement, void>;
    onSelect: ReactSelectFn<void>;
    onChange: InputChangeFn<HTMLInputElement | HTMLTextAreaElement, void>;
    mobilePadding: string;
    tabletPadding: string;
};

export const CustomerForm: React.FC<Props> = (props) => {
    const { formConfig, getElement, onBlur, onChange, onSelect, mobilePadding, tabletPadding } = props;
    
    const getElementProps = (name?: any) => {
        const props = formConfig[name];
        if (!props) {
            throw new Error(`Form config does not contain element with name: ${name}`);
        }
        return props;
    };
    
    const StatusSelect = getElement('status', getElementProps('status'), { onSelect });
    const LastNameInput = getElement('lastName', getElementProps('lastName'), { onBlur, onChange });
    const FirstNameInput = getElement('firstName', getElementProps('firstName'), { onBlur, onChange });
    const TelInput = getElement('phone', getElementProps('phone'), { onBlur, onChange });
    const EmailInput = getElement('email', getElementProps('email'), { onBlur, onChange });
    const AddressLine1Input = getElement('addressLine1', getElementProps('addressLine1'), { onBlur, onChange });
    const AddressLine2Input = getElement('addressLine2', getElementProps('addressLine2'), { onBlur, onChange });
    const CityInput = getElement('city', getElementProps('city'), { onBlur, onChange });
    const StateInput = getElement('state', getElementProps('state'), { onBlur, onChange });
    const ZipInput = getElement('zip', getElementProps('zip'), { onBlur, onChange });
    
    return (
        <div className="row mb-5 pb-5">
            <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1 mb-5">
                {StatusSelect}
                <div className="row">
                    <div className={`col-md-6 col-sm-12 pr-0 pl-0 ${tabletPadding} ${mobilePadding}`}>
                        {FirstNameInput}
                    </div>
                    <div className={`col-md-6 col-sm-12 pr-0 pl-0 ${tabletPadding} ${mobilePadding}`}>
                        {LastNameInput}
                    </div>
                </div>
                <div className="form-group form-group-default bg-transparent pt-2 pb-2">
                    <div className="d-flex flex-row align-items-center">
                            <span className="pr-3">
                                <i className="custom-icon icon phone" />
                            </span>
                        <h6>Contact Info</h6>
                    </div>
                    <hr className="default" />
                    <div className="row">
                        <div className="col-md-6 col-sm-12 pr-sm-0 pl-sm-0">
                            {TelInput}
                        </div>
                        <div className="col-md-6 col-sm-12 pr-sm-0 pl-sm-0">
                            {EmailInput}
                        </div>
                    </div>
                </div>
                <div className="form-group form-group-default bg-transparent pt-2 pb-2">
                    <div className="d-flex flex-row align-items-center">
                            <span className="pr-3">
                                <i className="custom-icon icon map-pin" />
                            </span>
                        <h6>Address Info</h6>
                    </div>
                    <hr className="default" />
                    {AddressLine1Input}
                    {AddressLine2Input}
                    <div className="row">
                        <div className={`col-lg-4 col-sm-12 pr-0 pl-0 ${tabletPadding} ${mobilePadding}`}>
                            {CityInput}
                        </div>
                        <div className={`col-lg-4 col-sm-12 pr-0 pl-0 ${tabletPadding} ${mobilePadding}`}>
                            {StateInput}
                        </div>
                        <div className={`col-lg-4 col-sm-12 pr-0 pl-0 ${tabletPadding} ${mobilePadding}`}>
                            {ZipInput}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
