import { InternalAxiosRequestConfig } from 'axios';
import { BaseAxios } from './base-axios';
import { AuthService } from '@/services';

export class AuthAxios extends BaseAxios {
    constructor(prefix: string) {
        super(prefix);
        this._initRequestInterceptor();
    }

    private _initRequestInterceptor() {
        this.axiosInstance.interceptors.request.use(
            async (config: InternalAxiosRequestConfig) => {
                const { isLogged, accessToken, accessType, tokenExpires } = this.getStoredTokenInfo();
                if (isLogged && tokenExpires && tokenExpires < Date.now()) {
                    const res = await AuthService.refreshToken();
                    if (res) {
                        this.storeTokenInfo(res.accessToken, res.tokenType, res.accessTokenExpires);
                        config.headers['Authorization'] = `${res.tokenType} ${res.accessToken}`;
                        return config;
                    }
                }

                if (accessToken && accessType) {
                    console.log({ accessToken, accessType });
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
