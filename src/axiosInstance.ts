import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
        'Content-Type': 'application/json',
    }
});
instance.defaults.withCredentials = true;
instance.defaults.withXSRFToken = true;

export async function apiFetch<T>(
    url: string,
    {payload, method}: {payload?: Record<string, unknown> | FormData, method?: string}
): Promise<T> {
    method ??= payload ? 'POST' : 'GET';

    // Set appropriate Content-Type header based on payload type
    if (payload instanceof FormData) {
        instance.defaults.headers['Content-Type'] = 'multipart/form-data';
    } else {
        instance.defaults.headers['Content-Type'] = 'application/json';
    }

    // Get CSRF cookie for non-GET requests
    if (['PUT', 'POST', 'PATCH', 'DELETE'].includes(method)) {
        await axios.get("http://localhost:8000/api/csrf-cookie", { withCredentials: true });
    }

    try {
        const response = await instance.request({
            method: method,
            url: url,
            data: {...payload},
        });

        return response.data.data as Promise<T>;
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}
