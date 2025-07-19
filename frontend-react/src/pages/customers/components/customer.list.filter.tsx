import React from 'react';
import { Button, SearchBar } from '../../../components';
import { ButtonClickFn, InputChangeFn } from '../../../types';

interface Props extends React.HTMLProps<HTMLInputElement> {
    clearSearchHandler: ButtonClickFn<void>
    refreshDataHandler: ButtonClickFn<void>;
    showFilterOptionsHandler: ButtonClickFn<void>
    searchHandler: InputChangeFn<HTMLInputElement>;
}

export const CustomerListFilter = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
    const { disabled, clearSearchHandler, refreshDataHandler, searchHandler, showFilterOptionsHandler } = props;
    
    return (
        <div className="row">
            <div className="col-9 pr-0">
                <SearchBar
                    ref={ref}
                    clearSearchHandler={clearSearchHandler}
                    onChange={searchHandler}
                />
            </div>
            <div className="col-3 pl-0">
                <div className="row">
                    <div className="col-6 pl-0 pr-0">
                        <Button
                            disabled={disabled}
                            style={{ height: 52 }}
                            className="btn-default btn-block border-0 tooltip-bottom"
                            data-tooltip="Filter Options"
                            onClick={showFilterOptionsHandler}
                        >
                            <div className="d-flex align-items-center justify-content-center">
                                <i className="custom-icon icon icon-only customise" />
                            </div>
                        </Button>
                    </div>
                    <div className="col-6 pl-0 pr-0">
                        <Button
                            disabled={disabled}
                            style={{ height: 52 }}
                            className="btn-default btn-block border-0 tooltip-bottom"
                            data-tooltip="Refresh"
                            onClick={refreshDataHandler}
                        >
                            <div className="d-flex align-items-center justify-content-center">
                                <i className="custom-icon icon icon-only refresh" />
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
});
