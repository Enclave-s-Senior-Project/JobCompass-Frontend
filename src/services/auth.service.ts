import { BaseAxios } from '@/lib/axios';
import { ApiResponse, DetailedRequest, DetailedResponse } from 'api-types';
import { AxiosError } from 'axios';
import NextError from 'next/error';

const axios = new BaseAxios('api/v1/auth');

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

    public static async logout() {}

    public static async register(data: Omit<DetailedRequest.SignUpRequest, 'confirmPassword'>) {
        try {
            console.log('register', data);
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
            console.log('Run refresh api');
            const res = await axios.post<ApiResponse<DetailedResponse.RefreshToken>>('/refresh-token', {});
            return res.payload.value;
        } catch (error) {
            console.error('Refresh token call API :', error);
            throw new Error(String(error));
        }
    }

    public static async verifyEmail(data: DetailedRequest.VerifyEmailRequest) {
        try {
            console.log('data', data);
            const temp = await axios.post<ApiResponse<DetailedResponse.VerifyEmail>>('/verify-email', data);
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
}
