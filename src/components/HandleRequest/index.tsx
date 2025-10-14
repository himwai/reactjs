export interface ApiRequestOptions extends RequestInit {
    timeout?: number;
}

export const handleRequest = async <T,> (
    url: string,
    options: ApiRequestOptions = {}
): Promise<T> => {
    const {
        timeout = 8000,
        ...requestOptions
    } = options;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
        const response = await fetch(url, {
            ...requestOptions,
            signal: controller.signal
        });

        if (!response.ok) {
            // Enhanced error handling
            let errorData: string | object = '';

            try {
                errorData = await response.json().catch(() => response.text());
            } catch {
                errorData = 'Failed to parse error response';
            }

            const errorMsg = typeof errorData === 'object'
                ? JSON.stringify(errorData, null, 2)
                : errorData.substring(0, 200);

            throw new Error(`Request failed (${response.status}): ${errorMsg}`);
        }

        // Handle non-JSON responses
        const contentType = response.headers.get('content-type') || '';
        return contentType.includes('application/json')
            ? (response.json() as Promise<T>)
            : (response.text() as unknown as T);

    } finally {
        clearTimeout(timeoutId);
    }
}

export default handleRequest;