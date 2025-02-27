import { AuthAxios } from '@/lib/axios';
import { ApiResponse, DetailedRequest, UserProfile } from '@/types';
import { AxiosError } from 'axios';
import Error from 'next/error';

const authAxios = new AuthAxios('website');

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
}
