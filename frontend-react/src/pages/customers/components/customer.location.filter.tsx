import React from 'react';
import { SelectInput } from '../../../components';
import { ModalFilter } from '../../../containers';
import { ButtonClickFn, ReactSelectFn, ReactSelectSingleOption } from '../../../types';

type Props = {
    cityOptions: ReactSelectSingleOption[];
    cityOptionsLoading: boolean;
    statusOptions: ReactSelectSingleOption[],
    stateOptions: ReactSelectSingleOption[];
    stateOptionsLoading: boolean;
    onSelect: ReactSelectFn<void>;
    dismissModalHandler: () => void;
    filterParams: Record<string, any>;
    modalOpen: boolean;
    clearFilterParamsHandler: ButtonClickFn<void>;
}

export const CustomerLocationFilter: React.FC<Props> = (props) => {
    const {
        cityOptions,
        cityOptionsLoading,
        statusOptions,
        stateOptions,
        stateOptionsLoading,
        onSelect,
        dismissModalHandler,
        filterParams,
        modalOpen,
        clearFilterParamsHandler,
    } = props;
    
    const { city, state, status } = filterParams;
    const selectedState = stateOptions.find(option => option.value === state);
    const selectedStatus = statusOptions.find(option => option.value === status);
    const selectedCity = stateOptions.find(option => option.value === city);
    
    return (
        <ModalFilter
            openModalDataFilter={modalOpen}
            dismissModalDataFilter={dismissModalHandler}
            clearDataFilterParamsHandler={clearFilterParamsHandler}
        >
            <SelectInput
                label="Status"
                defaultValue={selectedStatus}
                options={statusOptions}
                onChange={(option: any) => {
                    onSelect('status', option as ReactSelectSingleOption);
                }}
            />
            <SelectInput
                label="State"
                isLoading={stateOptionsLoading}
                isDisabled={stateOptionsLoading}
                defaultValue={selectedState}
                options={stateOptions}
                onChange={(option: any) => {
                    onSelect('state', option as ReactSelectSingleOption);
                }}
            />
            <SelectInput
                label="City"
                isLoading={cityOptionsLoading}
                isDisabled={cityOptionsLoading}
                defaultValue={selectedCity}
                options={cityOptions}
                onChange={(option: any) => {
                    onSelect('city', option as ReactSelectSingleOption);
                }}
            />
        </ModalFilter>
    )
}
