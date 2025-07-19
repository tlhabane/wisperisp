import { FormState } from '../../../types';
import { Customer } from '../../../models';
import { statusOptions } from '../../../data';

export const formConfig: FormState<Customer> = {
    id: {
        error:'',
        value: '',
        label: '',
        type: 'text',
    },
    status: {
        error:'',
        value: 'active',
        label: 'Status',
        type: 'select',
        options: statusOptions,
    },
    firstName: {
        error:'',
        value: '',
        label: 'First Name',
        type: 'text',
        placeholder: 'John',
        required: true,
    },
    lastName: {
        error:'',
        value: '',
        label: 'Last Name',
        type: 'text',
        placeholder: 'Doe',
    },
    phone: {
        error:'',
        value: '',
        label: 'Mobile No.',
        type: 'text',
        placeholder: '0829874321',
        required: true,
    },
    email: {
        error:'',
        value: '',
        label: 'Email',
        type: 'email',
        placeholder: 'john.doe@acme.com',
        required: true,
    },
    addressLine1: {
        error:'',
        value: '',
        label: 'Address Line 1',
        type: 'text',
        placeholder: 'Suite 101, City Towers',
    },
    addressLine2: {
        error:'',
        value: '',
        label: 'Address Line 2',
        type: 'text',
        placeholder: '123 Main Street, City, Country',
    },
    city: {
        error:'',
        value: '',
        label: 'city',
        type: 'text',
        placeholder: 'Chicago',
    },
    state: {
        error:'',
        value: '',
        label: 'State',
        type: 'text',
        placeholder: 'Illinois',
    },
    zip: {
        error:'',
        value: '',
        label: 'Zip',
        type: 'text',
        placeholder: '60007',
    },
}
