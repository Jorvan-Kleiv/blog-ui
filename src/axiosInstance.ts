import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:8000/api/',
});
instance.defaults.withCredentials = true;
instance.defaults.withXSRFToken = true;

export async function apiFetch<T>(
    url: string,
    {payload, method}: {payload?: Object | FormData, method?: string}
): Promise<T> {
    method ??= payload ? 'POST' : 'GET';
    // Get CSRF cookie for non-GET requests
    if (['PUT', 'POST', 'PATCH', 'DELETE'].includes(method)) {
        await axios.get("http://localhost:8000/api/csrf-cookie", { withCredentials: true });
    }

    try {
        const response = await instance({
            method: method,
            url: url,
            data: payload,
        });

        return response.data as Promise<T>;
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}
