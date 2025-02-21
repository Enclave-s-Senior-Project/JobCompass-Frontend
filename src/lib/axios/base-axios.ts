import { ApiResponse } from '@/types';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Error from 'next/error';

export class BaseAxios {
    protected axiosInstance: AxiosInstance;
    constructor(prefix: string) {
        this.axiosInstance = axios.create({
            baseURL: `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/${prefix}`,
            timeout: 10000,
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
        });

        this._initResponseInterceptor();
    }

    protected _initResponseInterceptor() {
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                this.handleErrorRequest(response.data);
                return response;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        );
    }

    public getStoredTokenInfo() {
        return {
            isLogged: JSON.parse(localStorage.getItem('logged') || 'false'),
            accessToken: JSON.parse(localStorage.getItem('access_token') || ''),
            accessType: JSON.parse(localStorage.getItem('access_type') || 'Bearer'),
            tokenExpires: parseInt(JSON.parse(localStorage.getItem('access_expires') || '0')),
        };
    }

    public storeTokenInfo(accessToken: string, accessType: string, expires: number) {
        localStorage.setItem('logged', JSON.stringify(true));
        localStorage.setItem('access_token', JSON.stringify(accessToken));
        localStorage.setItem('access_type', JSON.stringify(accessType));
        localStorage.setItem('access_expires', JSON.stringify(Date.now() + expires));
    }

    public clearTokenInfo() {
        localStorage.removeItem('logged');
        localStorage.removeItem('access_token');
        localStorage.removeItem('access_type');
        localStorage.removeItem('access_expires');
    }

    protected handleErrorRequest(response: ApiResponse<any>) {
        if (response.payload?.code >= 400) {
            throw new Error({
                statusCode: response.payload.code,
                title: response.payload.message_code,
            });
        }
    }

    public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.get<T>(url, config).then((res) => res.data);
    }

    public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.post<T>(url, data, config).then((res) => res.data);
    }

    public put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.put<T>(url, data, config).then((res) => res.data);
    }

    public patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.patch<T>(url, data, config).then((res) => res.data);
    }

    public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.delete<T>(url, config).then((res) => res.data);
    }
}
