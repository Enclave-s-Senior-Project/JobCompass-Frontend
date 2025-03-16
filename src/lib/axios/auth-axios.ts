import { InternalAxiosRequestConfig } from 'axios';
import { BaseAxios } from './base-axios';
import { clearLoginCookie, clearTokenInfo, getStoredTokenInfo, storeTokenInfo } from '../auth';
import { toast } from 'sonner';

export class AuthAxios extends BaseAxios {
    constructor(prefix: string) {
        super(prefix);
        this._initRequestInterceptor();
    }

    private async _refreshToken() {
        const { AuthService } = await import('@/services/auth.service');
        return AuthService.refreshToken();
    }

    private _initRequestInterceptor() {
        this.axiosInstance.interceptors.request.use(
            async (config: InternalAxiosRequestConfig) => {
                const { isLogged, accessToken, accessType, tokenExpires } = getStoredTokenInfo();
                if (isLogged && accessToken && accessType && tokenExpires < Date.now()) {
                    try {
                        const res = await this._refreshToken();
                        if (res) {
                            storeTokenInfo(res.accessToken, res.tokenType, res.accessTokenExpires);
                            config.headers['Authorization'] = `${res.tokenType} ${res.accessToken}`;
                            return config;
                        }
                    } catch {
                        toast.error('Session is out');
                        clearLoginCookie();
                        clearTokenInfo();
                    }
                }

                if (accessToken && accessType) {
                    config.headers['Authorization'] = `${accessType} ${accessToken}`;
                }
                return config;
            },
            (error) => {
                console.log('Error here', error);
                return Promise.reject(error);
            }
        );
    }
}
