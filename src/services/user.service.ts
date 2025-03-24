import { AuthAxios, BaseAxios } from '@/lib/axios';
import { ApiResponse, DetailedRequest, DetailedResponse, User } from '@/types';
import { AxiosError } from 'axios';
import Error from 'next/error';

const authAxios = new AuthAxios('user');
const axios = new BaseAxios('user');

export class UserService {
    public static async updatePersonalProfile(data: DetailedRequest.UpdatePersonalProfile) {
        try {
            const res = await authAxios.patch<ApiResponse<Partial<User>>>('/personal', data);
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

    public static async updateCandidateProfile(data: DetailedRequest.UpdateCandidateProfile) {
        try {
            const res = await authAxios.patch<ApiResponse<Partial<User>>>('/candidate', data);
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

    public static async getCandidates(data: DetailedRequest.GetCandidates) {
        try {
            // Xây dựng query string thủ công
            let query = `order=${data.order || 'ASC'}&page=${data.page}&take=${data.take}`;
            if (data.gender) {
                query += `&gender=${data.gender}`;
            }
            if (data.maritalStatus) {
                query += `&isMaried=${data.maritalStatus}`;
            }
            if (Array.isArray(data.categories) && data.categories.length > 0) {
                const industryIds = data.categories.map((cat) => `industryId=${cat}`).join('&');
                query += `&${industryIds}`;
            }
            const temp = await axios.get<ApiResponse<DetailedResponse.GetCandidates>>(`/candidate?${query}`);

            return temp.payload.value;
        } catch (err) {
            if (err instanceof AxiosError) {
                throw new Error({
                    statusCode: Number(err.status || err.response?.status),
                    title: err.response?.data.message,
                });
            }
            throw err;
        }
    }
}
