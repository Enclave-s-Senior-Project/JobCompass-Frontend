import { AuthAxios, BaseAxios } from '@/lib/axios';
import { ApiResponse, DetailedRequest, DetailedResponse, User } from '@/types';
import { AxiosError } from 'axios';
import NextError from 'next/error';
import { handleErrorApi } from '.';

const axios = new BaseAxios('auth');
const authAxios = new AuthAxios('auth');

export class AuthService {
    public static async login(data: DetailedRequest.SignInRequest) {
        try {
            const temp = await axios.post<ApiResponse<DetailedResponse.SignIn>>('/login', data);
            return temp.payload;
        } catch (err) {
            if (err instanceof AxiosError) {
                throw new NextError({
                    statusCode: Number(err.status || err.response?.status),
                    title: err.response?.data.message,
                });
            }
            throw err;
        }
    }

    public static async logout() {
        try {
            await authAxios.post<ApiResponse<null>>('/logout');
            return axios;
        } catch (err) {
            if (err instanceof AxiosError) {
                throw new NextError({
                    statusCode: Number(err.status || err.response?.status),
                    title: err.response?.data.message,
                });
            }
            throw err;
        }
    }

    public static async register(data: Omit<DetailedRequest.SignUpRequest, 'confirmPassword'>) {
        try {
            const temp = await axios.post<ApiResponse<DetailedResponse.SignUp>>('/register', data);
            return temp.payload;
        } catch (err: any) {
            if (err instanceof AxiosError) {
                throw new NextError({
                    statusCode: Number(err.status || err.response?.status),
                    title: err.response?.data.message,
                });
            }
            throw err;
        }
    }

    public static async refreshToken(): Promise<DetailedResponse.RefreshToken | undefined> {
        try {
            const res = await axios.post<ApiResponse<DetailedResponse.RefreshToken>>('/refresh-token');
            return res.payload.value;
        } catch (error) {
            console.error('Refresh token call API :', error);
            throw new Error(String(error));
        }
    }

    public static async verifyEmail(data: DetailedRequest.VerifyEmailRequest) {
        try {
            const temp = await axios.post<ApiResponse<DetailedResponse.VerifyEmail>>('/verify-email', data);
            return temp.payload;
        } catch (err: any) {
            if (err instanceof AxiosError) {
                throw new NextError({
                    statusCode: Number(err.status || err.response?.status),
                    title: err.response?.data.message,
                });
            }
            throw err;
        }
    }

    public static async reSendEmail(data: { email: string }) {
        try {
            const temp = await axios.post<ApiResponse<any>>('/resend-email', data);
            return temp.payload;
        } catch (err) {
            if (err instanceof AxiosError) {
                throw new NextError({
                    statusCode: Number(err.status || err.response?.status),
                    title: err.response?.data.message,
                });
            }
            throw err;
        }
    }

    public static async forgetPassword(data: DetailedRequest.ForgetPasswordRequest) {
        try {
            const dataResponse = await axios.post<ApiResponse<DetailedResponse.ForgetPassword>>('/forget-password', {
                email: data.email,
            });
            return dataResponse.payload;
        } catch (err) {
            if (err instanceof AxiosError) {
                throw new NextError({
                    statusCode: Number(err.status || err.response?.status),
                    title: err.response?.data.message,
                });
            }
            throw err;
        }
    }

    public static async resetPassword(data: DetailedRequest.ResetPasswordRequest) {
        try {
            const dataResponse = await axios.post<ApiResponse<DetailedResponse.ResetPassword>>('/reset-password', data);
            return dataResponse.payload;
        } catch (err) {
            if (err instanceof AxiosError) {
                throw new NextError({
                    statusCode: Number(err.status || err.response?.status),
                    title: err.response?.data.message,
                });
            }
            throw err;
        }
    }

    public static async getMe() {
        try {
            const dataResponse = await authAxios.get<ApiResponse<User>>('/me');
            return dataResponse.payload;
        } catch (err) {
            if (err instanceof AxiosError) {
                throw new NextError({
                    statusCode: Number(err.status || err.response?.status),
                    title: err.response?.data.message,
                });
            }
            throw err;
        }
    }

    public static async loginViaFacebook() {
        try {
            const dataResponse = await axios.get<ApiResponse<User>>('/facebook');
            return dataResponse.payload;
        } catch (err) {
            if (err instanceof AxiosError) {
                throw new NextError({
                    statusCode: Number(err.status || err.response?.status),
                    title: err.response?.data.message,
                });
            }
            throw err;
        }
    }

    public static async confirmOAuth2Login(data: DetailedRequest.ConfirmOAuth2Login) {
        try {
            const { provider, ...payload } = data;
            const dataResponse = await axios.post<ApiResponse<DetailedResponse.SignIn>>(
                `/${provider}/confirm`,
                payload
            );
            return dataResponse.payload.value;
        } catch (err) {
            handleErrorApi(err);
        }
    }
}
