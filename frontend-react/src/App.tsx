import React from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DefaultRouter as Router} from './router';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster position="top-center" reverseOrder={false} />
            <Router />
        </QueryClientProvider>
    );
}

export default App;
