import { AuthAxios, BaseAxios } from '@/lib/axios';
import { ApiResponse, DetailedRequest, SocialLink, User } from '@/types';
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

    public static async getCandidateSocialLinks(data: Pick<User, 'profileId'>) {
        try {
            const res = await baseAxios.get<ApiResponse<SocialLink[]>>(`/profile/${data.profileId}`);
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
