import { useCallback, useState } from 'react';
import { handleRequest as _handleRequest } from "@cap-view/components";

export interface ApiRequestOptions extends RequestInit {
    timeout?: number;
}

export const useWebService = <T,>(baseUrl?: string) => {

    const handleRequest = useCallback(async (
        serviceUrl: string,
        options: ApiRequestOptions = {}
    ): Promise<T> => {

        const url = `${baseUrl??''}${serviceUrl??''}`||'/';
        return await _handleRequest<T>(url, options)
    }, [baseUrl]);

    console.log(`useWebService ${baseUrl} Rednering`);

    return [
        handleRequest
    ];
}

