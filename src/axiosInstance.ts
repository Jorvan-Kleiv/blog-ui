import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:8000/api/',
});
instance.defaults.withCredentials=true;
instance.defaults.withXSRFToken=true;
export async function apiFetch<T>(
    url: string,
    {payload, method}: {payload?: Record<string, unknown>, method?: string}
): Promise<T> {
    await axios.get("http://localhost:8000/api/csrf-cookie", { withCredentials: true });
    method ??= payload ? 'POST' : 'GET';
    const response = await instance.request(
    {
        method: method,
        url: url,
        data: payload,
    }
    );
    return response.data.data  as Promise<T>;
}