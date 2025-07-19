import React from 'react';
import { Button, ListItemContainer, ListItemHeader } from '../../../components';
import type { Customer } from '../../../models';
import type { ButtonClickFn } from '../../../types';

type Props = {
    customer: Customer,
    deleteCustomer: ButtonClickFn<void>;
    updateCustomer: ButtonClickFn<void>;
}

export const CustomerListItem: React.FC<Props> = ({ customer, deleteCustomer, updateCustomer}) => {
    const { id, firstName, lastName, addressLine1, addressLine2, city, state, status} = customer;
    const getAddress = (address1 = '', address2 = ''): string => {
        const trimmedAddr1 = address1.trim();
        const trimmedAddr2 = address2.trim();
        if (trimmedAddr1 !== '' && trimmedAddr2 !== '') {
            return `${trimmedAddr1}, ${trimmedAddr2}`;
        } else if (trimmedAddr1 === '' && trimmedAddr2 !== '') {
            return trimmedAddr2;
        }
        
        return trimmedAddr1;
    }
    
    const customerAddress = getAddress(
        getAddress(addressLine1, addressLine2),
        getAddress(city, state)
    );
    
    const getStatusColor = () => {
        switch (status.toLowerCase()) {
            case 'cancelled':
                return 'cancelled';
            case 'inactive':
                return 'pending';
            default:
                return 'success';
        }
    };
    
    const statusColor = getStatusColor();
    
    return (
        <ListItemContainer className={`striped status-indicator status-${statusColor}`}>
            <ListItemHeader>
                <div className="col-4 title">
                    <div>
                        <i className="custom-icon icon user" />
                    </div>
                    <div>
                        <h2>
                            <small className="font-weight-bold text-wrap">
                                {`${firstName} ${lastName}`}
                            </small>
                            <small className="text-wrap small">
                                Name
                            </small>
                        </h2>
                    </div>
                </div>
                <div className="col-4 title">
                    <div>
                        <i className="custom-icon icon map-pin" />
                    </div>
                    <div>
                        <h2>
                            <small className="font-weight-bold text-wrap">
                                {customerAddress}
                            </small>
                            <small className="text-wrap small">
                                Address
                            </small>
                        </h2>
                    </div>
                </div>
                <div className="col-4 action-col">
                    <Button
                        className="btn-link no-text tooltip-top"
                        data-tooltip="Update"
                        data-customer={id || ''}
                        onClick={updateCustomer}
                    >
                        <i className="custom-icon icon icon-only edit" />
                    </Button>
                    <div className="v-divider" />
                    <Button
                        className="btn-link delete-btn no-text tooltip-top"
                        data-tooltip="Delete"
                        data-customer={id || ''}
                        onClick={deleteCustomer}
                    >
                        <i className="custom-icon icon icon-only trash" />
                    </Button>
                </div>
            </ListItemHeader>
        </ListItemContainer>
    )
}
