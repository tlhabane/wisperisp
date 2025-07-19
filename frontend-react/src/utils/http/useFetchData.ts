import { useCallback } from 'react';
import { QueryKey, useQuery } from '@tanstack/react-query';
import { getHttpRequestConfig } from './getHttpRequestConfig';
import { useAxios } from './useAxios';

type FetchConfig = {
    url: string;
    queryKey: QueryKey;
    params?: Record<string, any>;
    staleTime?: number;
    refetchInterval?: number;
    refetchOnWindowFocus?: boolean;
};

export const useFetchData = (config: FetchConfig) => {
    const { url, queryKey, params = {}, refetchInterval = 0, refetchOnWindowFocus = true, staleTime = 0 } = config;
    const axios = useAxios();
    
    const fetchData = useCallback(async () => {
        const fetchParams = Object.entries(params).reduce(
            (agg: Record<string, any>, [key, value]) => (value ? { ...agg, [key]: value } : agg),
            {},
        );

        const httpRequestConfig = {
            ...getHttpRequestConfig(),
            url,
            params: { ...fetchParams },
        };

        return axios(httpRequestConfig);
    }, [axios, params, url]);
    
    const fetchQuery = useQuery<Record<string, any>, Error>({
        queryKey: [...queryKey, params],
        queryFn: fetchData,
        staleTime,
        refetchInterval,
        refetchOnWindowFocus,
        placeholderData: (previousData) => previousData,
    });

    return { ...fetchQuery };
};
