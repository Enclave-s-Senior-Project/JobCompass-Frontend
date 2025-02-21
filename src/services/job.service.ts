import { AuthAxios, BaseAxios } from '@/lib/axios';
import { ApiResponse, DetailedRequest, DetailedResponse } from '@/types';
import { AxiosError } from 'axios';
import NextError from 'next/error';

const axios = new BaseAxios('job');
const authAxios = new AuthAxios('job');

export class JobService {
    public static async getAllJobs(data: DetailedRequest.ParamListJobsCredentials) {
        try {
            const temp = await axios.get<ApiResponse<DetailedResponse.GetAllJobs>>('', { params: data });
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

    public static async getFavoriteJobs(data: DetailedRequest.FavoriteJobs) {
        try {
            const dataResponse = await authAxios.get('/wishlist', {
                params: {
                    order: data.order,
                    take: data.order,
                    page: data.page,
                    option: data.option,
                },
            });
            return dataResponse;
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
