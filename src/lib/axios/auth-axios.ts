import { InternalAxiosRequestConfig } from 'axios';
import { BaseAxios } from './base-axios';
import {
    clearLoginCookie,
    clearTokenInfo,
    clearUserAndEnterpriseInfoLocalStorage,
    getStoredTokenInfo,
    storeTokenInfo,
} from '../auth';
import { toast } from '@/lib/toast';

// Global variable to store the refresh token promise
let isRefreshing = false;
let refreshTokenPromise: Promise<any> | null = null;

export class AuthAxios extends BaseAxios {
    constructor(prefix: string) {
        super(prefix);
        this._initRequestInterceptor();
    }

    private async _refreshToken() {
        // If already refreshing, return existing promise
        if (isRefreshing) {
            return refreshTokenPromise;
        }

        // Set refreshing flag and create new promise
        isRefreshing = true;

        // Create new refresh token promise
        refreshTokenPromise = (async () => {
            try {
                const { AuthService } = await import('@/services/auth.service');
                return await AuthService.refreshToken();
            } catch (error) {
                console.error('Failed to refresh token:', error);
                toast.error('Session expired. Please log in again.');
                clearLoginCookie();
                clearTokenInfo();
                clearUserAndEnterpriseInfoLocalStorage();
                throw error; // Re-throw to handle in the interceptor
            } finally {
                // Reset refreshing state regardless of outcome
                isRefreshing = false;
                setTimeout(() => {
                    refreshTokenPromise = null;
                }, 1000); // Clear after a delay
            }
        })();

        return refreshTokenPromise;
    }

    private _initRequestInterceptor() {
        this.axiosInstance.interceptors.request.use(
            async (config: InternalAxiosRequestConfig) => {
                const { isLogged, accessToken, accessType, tokenExpires } = getStoredTokenInfo();

                // Check if token refresh is needed
                if (isLogged && accessToken && accessType && tokenExpires < Date.now()) {
                    try {
                        const res = await this._refreshToken();
                        if (res) {
                            storeTokenInfo(res.accessToken, res.tokenType, res.accessTokenExpires);
                            config.headers['Authorization'] = `${res.tokenType} ${res.accessToken}`;
                            return config;
                        }
                    } catch (error) {
                        // Error already handled in _refreshToken
                        // Just continue without setting Authorization header
                        console.error('Error refreshing token:', error);
                    }
                }

                // Set Authorization header if we have token
                if (accessToken && accessType) {
                    config.headers['Authorization'] = `${accessType} ${accessToken}`;
                }

                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }
}
