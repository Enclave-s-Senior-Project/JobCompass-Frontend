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

    protected handleErrorRequest(response: ApiResponse<any>) {
        if (response.payload?.code >= 400 || response.payload?.code < 200) {
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
