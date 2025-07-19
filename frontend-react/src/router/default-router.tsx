import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../containers';
import { FullPageSpinner } from '../components';

const CustomerPage = lazy(() => import('../pages/customers'));
const CustomerManagementPage = lazy(() => import('../pages/customer-management'));

export const DefaultRouter = () => (
    <BrowserRouter>
        <Suspense fallback={<FullPageSpinner />}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<CustomerPage />} />
                </Route>
                <Route path="/customer-management" element={<Layout childPage />}>
                    <Route index element={<CustomerManagementPage />} />
                    <Route path=":id" element={<CustomerManagementPage />} />
                </Route>
            </Routes>
        </Suspense>
    </BrowserRouter>
);
