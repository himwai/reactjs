import { useCallback, useState } from 'react';
import { useWebService } from '..';

export interface CounterRequest extends RequestObject<number> {}
export interface CounterResult extends ResultObject<number> {}

export interface UseCountReturn {
    count: number;
    loading: boolean;
    updateHandler: (amount: number) => Promise<void>;
    refreshHandler: () => Promise<void>; // getData
}

export const useCounter = (apiBaseUrl: string = ''): UseCountReturn => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [handleRequest] = useWebService<CounterResult>(apiBaseUrl);

    const refreshHandler = useCallback(async () => {
        setLoading(true);
        
        try {
            const countResult = await handleRequest('/count');
            setCount(countResult.dataContent ?? 0);
        } catch (error) {
            console.error('Failed to update count:', error);
            throw error;            
        } finally {
            setLoading(false);
        }

    }, [handleRequest]);

    const updateHandler = useCallback(async (increment: number) => {
        setLoading(true);
        
        try {
            await handleRequest('/count', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ dataContent: increment }),
            });
            // Auto-refresh after update
            await refreshHandler();
        } catch (error) {
            console.error('Failed to update count:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [handleRequest, refreshHandler]);

    console.log("useCount Rednering");

    return {
        count,
        loading,
        updateHandler,
        refreshHandler,
    };
};