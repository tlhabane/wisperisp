import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHttpRequestConfig, useFetchData, useAxios } from '../../utils';
import { Button, ContainerSpinner, EmptyAdditionalNotice, EmptyListContainer, EmptyNoticeButton, PaginatorHeader,  getRecordsDisplayedOptions, pagingLinkClickHandler, recordsPerPageSelectionHandler } from '../../components';
import { ModalPrompt, StickyContainer, StickyRow, useLayoutContext } from '../../containers';
import { CustomerListFilter, CustomerListItem, CustomerLocationFilter } from './components';
import { usePromiseToast } from '../../hooks';
import type { Customer } from '../../models';
import type { ButtonClickFn, HTMLElementClickFn, InputChangeFn, LinkClickFn, Pagination, ReactSelectFn, ReactSelectSingleOption } from '../../types';
import { APP_NAME, ONE_MINUTE } from '../../config';
import { statusOptions } from '../../data';

export default function Customers(): React.JSX.Element {
    document.title = `Customer :: ${APP_NAME}`;
    const initFilterParams = useMemo<Record<string, any>>(
        () => ({
            city: '0',
            state: '0',
            status: '0',
            search: '',
            page: 1,
            recordsPerPage: 10,
        }),
        [],
    );
    const [filterParams, setFilterParams] = useState(initFilterParams);
    
    const fetchConfig = useMemo(() => ({
        url: '/customer',
        queryKey: ['customers'],
        params: filterParams,
        refetchInterval: 5 * ONE_MINUTE, // 5 minutes
        staleTime: 4.5 * ONE_MINUTE, // 4.5 minutes
    }), [filterParams]);
    
    const [loadCustomerList, setLoadCustomerList] = useState(false);
    const [customerList, setCustomerList] = useState<Customer[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const { data, isLoading, isFetching, refetch } = useFetchData(fetchConfig);
    
    useEffect(() => {
        if (data) {
            const updatedCustomerList = (data?.records || []) as Customer[];
            const updatedPagination = data?.pagination as Pagination;
            setCustomerList(updatedCustomerList);
            setPagination(updatedPagination);
            setLoadCustomerList(false);
        }
    }, [data]);
    
    const [recordsPerPageOptions, setRecordsPerPageOptions] = useState<ReactSelectSingleOption[]>([]);
    useEffect(() => {
        if (pagination) {
            const updatedRecordsPerPageOptions = getRecordsDisplayedOptions(pagination.totalRecords);
            setRecordsPerPageOptions(updatedRecordsPerPageOptions);
        }
    }, [pagination]);
    
    const updateRecords = useCallback(() => {
        setLoadCustomerList(true);
        refetch()
            .then(({ data: updatedData }) => {
                if (updatedData) {
                    const updatedCustomerList = (updatedData?.records || []) as Customer[];
                    const updatedPagination = updatedData?.pagination as Pagination;
                    setCustomerList(updatedCustomerList);
                    setPagination(updatedPagination);
                }
            })
            .finally(() => {
                setLoadCustomerList(false);
            });
    }, [refetch]);
    
    const { setRefreshDataHandler } = useLayoutContext();
    useEffect(() => {
        setRefreshDataHandler(() => updateRecords);
        return () => {
            setRefreshDataHandler(null);
        }
    }, [setRefreshDataHandler, updateRecords])
    
    const resetFilterParams = () => {
        setFilterParams(initFilterParams);
        updateRecords();
    }
    const handleResetFilterParams: LinkClickFn<void> = (event) => {
        event.preventDefault();
        resetFilterParams();
    };
    
    const handlePaginationLinkClick: LinkClickFn<void> = (event) => {
        pagingLinkClickHandler(event, setFilterParams, setLoadCustomerList);
    };
    
    const handleUpdateRecordsPerPage: HTMLElementClickFn<void> = (event) => {
        recordsPerPageSelectionHandler(event, setCustomerList, setFilterParams, setLoadCustomerList);
    };
    
    const handleRefreshClientList: ButtonClickFn<void> = (event) => {
        event.preventDefault();
        updateRecords();
    };
    
    const searchInputElement = useRef<HTMLInputElement | null>(null);
    const handleSearchValueChange: InputChangeFn<HTMLInputElement> = (event) => {
        setFilterParams((currentFilterParams) => ({
            ...currentFilterParams,
            search: event.target.value,
        }));
        updateRecords();
    };
    
    useEffect(() => {
        const searchTimer = setTimeout(() => {
            setLoadCustomerList(true);
        }, 1500);
        
        return () => {
            clearTimeout(searchTimer);
        };
    }, [filterParams.search]);
    
    const handleClearSearch: ButtonClickFn<void> = (event) => {
        event.preventDefault();
        if (
            searchInputElement &&
            searchInputElement.current &&
            (searchInputElement.current as HTMLInputElement).value
        ) {
            (searchInputElement.current as HTMLInputElement).value = '';
        }
        setFilterParams((currentFilterParams) => ({
            ...currentFilterParams,
            search: '',
        }));
        updateRecords();
    };
    
    const handleSelectLocation: ReactSelectFn = (name, option ) => {
        setFilterParams((currentFilterParams) => ({
            ...currentFilterParams,
            [name]: (option as ReactSelectSingleOption).value || ''
        }));
        updateRecords();
    };
    
    const [openFilterOptions, setOpenFilterOptions] = useState(false);
    const toggleFilterOptionsModal = () => {
        setOpenFilterOptions((open) => !open);
    };
    
    const handleClearFilterParams: ButtonClickFn<void> = (event) => {
        event.preventDefault();
        resetFilterParams();
    };
    
    const navigate = useNavigate();
    const handleUpdateCustomer: ButtonClickFn<void> = (event) => {
        event.preventDefault()
        const { customer } = event.currentTarget.dataset;
        if (customer) {
            navigate(`/customer-management/${customer}`);
        }
    }
    
    const [promptUser, setPromptUser] = useState(false);
    const [confirmationButton, setConfirmationButton] = useState(<Button />);
    const customerDeleteMessage = (
        <>
            <h5>Are your sure you want to delete the selected customer?</h5>
            <p className="small">The effects of this action cannot be reversed.</p>
        </>
    );
    
    const handleDismissPromptModal = () => {
        setConfirmationButton(<Button />);
        setPromptUser(false);
    };
    
    const axios = useAxios();
    const toast = usePromiseToast();
    const handleProceedDeletingCustomer: ButtonClickFn<void> = async (event) => {
        event.preventDefault();
        const { customer } = event.currentTarget.dataset;
        const httpRequestConfig = {
            ...getHttpRequestConfig('DELETE'),
            url: 'customer',
            data: { id: customer || ''}
        };
        
        await toast(axios(httpRequestConfig, undefined, event.currentTarget));
        updateRecords();
    };
    
    const handleDeleteCustomer: ButtonClickFn<void> = (event) => {
        event.preventDefault()
        const { customer } = event.currentTarget.dataset;
        if (customer) {
            setConfirmationButton(
                <Button
                    className="btn-danger btn-block"
                    data-customer={customer}
                    onClick={handleProceedDeletingCustomer}
                >
                    <i className="custom-icon icon left-icon trash" />
                    Delete
                </Button>,
            );
            setPromptUser(true);
        }
    }
    
    const locationConfig = useMemo(() => ({
        refetchInterval: 20 * ONE_MINUTE,
        staleTime: 19.5 * ONE_MINUTE,
    }), []);
    
    const fetchStateConfig = useMemo(() => ({
        ...locationConfig,
        url: '/location/state',
        queryKey: ['states'],
    }), [locationConfig]);
    
    const {
        data: stateOptions,
        isLoading: stateOptionsLoading,
        isFetching: stateOptionsReloading
    } = useFetchData(fetchStateConfig);
    
    const [stateOptionsData, setStateOptionData] = useState<ReactSelectSingleOption[]>([]);
    useEffect(() => {
        if (stateOptions) {
            const updatedStateOptionData = [
                { label: 'All', value: '0' },
                ...((stateOptions?.records || []) as string[]).map((state) => ({
                    label: state, value: state.toLowerCase()
                }))
            ];
            setStateOptionData(updatedStateOptionData);
        }
    }, [stateOptions]);
    
    const fetchCityConfig = useMemo(() => ({
        ...locationConfig,
        url: '/location/city',
        params: { state: filterParams.state },
        queryKey: ['states'],
    }), [filterParams.state, locationConfig]);
    
    const {
        data: cityOptions,
        isLoading: cityOptionsLoading,
        isFetching: cityOptionsReloading
    } = useFetchData(fetchCityConfig);
    
    const [cityOptionsData, setCityOptionData] = useState<ReactSelectSingleOption[]>([]);
    useEffect(() => {
        if (cityOptions) {
            const updatedCityOptionData = [
                { label: 'All', value: '0' },
                ...((cityOptions?.records || []) as string[]).map((city) => ({
                    label: city, value: city.toLowerCase()
                }))
            ];
            setCityOptionData(updatedCityOptionData);
        }
    }, [cityOptions]);
    
    const customerStatusOption = [
        { label: 'All', value: '0' },
        ...statusOptions
    ];
    
    const { addCustomerHandler, setIsRefreshing, uploadCustomerDataHandler } = useLayoutContext();
    useEffect(() => {
        setIsRefreshing(isFetching);
        return () => {
            setIsRefreshing(false);
        }
    }, [isFetching, loadCustomerList, setIsRefreshing]);
    
    const RenderCustomers = () => {
        if (isLoading && !data) {
            return <ContainerSpinner />;
        }
        
        if (customerList.length > 0) {
            return (
                <div className="d-block mt-3 mb-5">
                    {customerList.map((customer) => (
                        <CustomerListItem
                            key={customer.email}
                            customer={customer}
                            deleteCustomer={handleDeleteCustomer}
                            updateCustomer={handleUpdateCustomer}
                        />
                    ))}
                </div>
            )
        }
        
        const { search, city, state, status } = filterParams;
        const listFiltered = search.trim().length > 0 || city !== '0' || state !== '0' || status !== '0';

        return (
            <div className="row p-5">
                <div className="col-md-6 offset-md-3">
                    <EmptyListContainer>
                        <i className="custom-icon icon users" style={{ width: 48, height: 48 }} />
                        <p className="hint-text text-center mt-2">
                            {listFiltered ? (
                                <>No customers matching your criteria available</>
                            ) : (
                                <>
                                    No customers currently available.
                                    <br /> Once available, all your customers will be displayed here.
                                </>
                            )}
                        </p>
                        <EmptyNoticeButton onClick={uploadCustomerDataHandler}>
                            Upload {listFiltered ? 'Missing' : 'New'} Customers
                        </EmptyNoticeButton>
                        <EmptyAdditionalNotice>
                            <Button className="btn-link" onClick={addCustomerHandler}>
                                Add One {listFiltered ? 'Missing' : 'New'} Customer
                            </Button>
                        </EmptyAdditionalNotice>
                    </EmptyListContainer>
                </div>
            </div>
        );
    };
    
    return (
        <>
            <CustomerLocationFilter
                cityOptions={cityOptionsData}
                cityOptionsLoading={cityOptionsLoading || cityOptionsReloading}
                statusOptions={customerStatusOption}
                stateOptions={stateOptionsData}
                stateOptionsLoading={stateOptionsLoading || stateOptionsReloading}
                onSelect={handleSelectLocation}
                dismissModalHandler={toggleFilterOptionsModal}
                filterParams={filterParams}
                modalOpen={openFilterOptions}
                clearFilterParamsHandler={handleClearFilterParams}
            />
            <ModalPrompt
                openModalPrompt={promptUser}
                dismissModalPrompt={handleDismissPromptModal}
                promptConfirmationButton={confirmationButton}
            >
                {customerDeleteMessage}
            </ModalPrompt>
            <StickyContainer>
                <StickyRow>
                    <div className="row">
                        <div className="col-8">
                            <CustomerListFilter
                                clearSearchHandler={handleClearSearch}
                                disabled={isLoading || isFetching}
                                ref={searchInputElement}
                                refreshDataHandler={handleRefreshClientList}
                                showFilterOptionsHandler={toggleFilterOptionsModal}
                                searchHandler={handleSearchValueChange}
                            />
                        </div>
                        <div className="col-4">
                            {pagination && (
                                <PaginatorHeader
                                    recordsPerPageOptions={recordsPerPageOptions}
                                    paginationObject={pagination}
                                    recordsPerPage={filterParams.recordsPerPage}
                                    resetListFilterHandler={handleResetFilterParams}
                                    paginationLinkHandler={handlePaginationLinkClick}
                                    updateRecordsPerPageHandler={handleUpdateRecordsPerPage}
                                />
                            )}
                        </div>
                    </div>
                </StickyRow>
            </StickyContainer>
            
            <RenderCustomers />
        </>
    )
}
