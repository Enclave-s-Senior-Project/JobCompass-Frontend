import { AuthAxios, BaseAxios } from '@/lib/axios';
import { ApiResponse, DetailedRequest, SocialLink } from '@/types';
import { AxiosError } from 'axios';
import Error from 'next/error';

const authAxios = new AuthAxios('website');
const baseAxios = new BaseAxios('website');

export class WebsiteService {
    public static async updateCandidateSocialLinks(data: DetailedRequest.UpdateCandidateSocialLinks) {
        try {
            const res = await authAxios.post<ApiResponse<null>>('/profile', data);
            return res.payload.value;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error({
                    statusCode: Number(error.status || error.response?.status),
                    title: error.response?.data.message,
                });
            }
            throw error;
        }
    }

    public static async getCandidateSocialLinks(params: { profileId: string }) {
        try {
            const res = await baseAxios.get<ApiResponse<SocialLink[]>>(`/profile/${params.profileId}`);
            return res.payload.value;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error({
                    statusCode: Number(error.status || error.response?.status),
                    title: error.response?.data.message,
                });
            }
            throw error;
        }
    }
    public static async getEmployerSocialLinks(params: { enterpriseId: string }) {
        try {
            const res = await baseAxios.get<ApiResponse<SocialLink[]>>(`/enterprise/${params.enterpriseId}`);
            return res.payload.value;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error({
                    statusCode: Number(error.status || error.response?.status),
                    title: error.response?.data.message,
                });
            }
            throw error;
        }
    }
    public static async updateEmployerSocialLinks(data: DetailedRequest.UpdateEnterpriseSocialLinks) {
        try {
            const res = await authAxios.post<ApiResponse<null>>('/enterprise', data);
            return res.payload.value;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error({
                    statusCode: Number(error.status || error.response?.status),
                    title: error.response?.data.message,
                });
            }
            throw error;
        }
    }
}
