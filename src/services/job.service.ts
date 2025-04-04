import { AuthAxios, BaseAxios } from '@/lib/axios';
import { ApiResponse, DetailedRequest, DetailedResponse, Job } from '@/types';
import { AxiosError } from 'axios';
import NextError from 'next/error';

const axios = new BaseAxios('job');
const authAxios = new AuthAxios('job');

export class JobService {
    public static async getAllJobs(data: DetailedRequest.ParamListJobsCredentials) {
        try {
            const temp = await axios.get<ApiResponse<DetailedResponse.GetAllJobs>>('search', { params: data });
            return temp.payload.value;
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
            const dataResponse = await authAxios.get<ApiResponse<DetailedResponse.FavoriteJobs>>('/wishlist', {
                params: {
                    ...data,
                },
            });
            return dataResponse.payload.value;
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

    public static async addFavoriteJob(data: { jobId: string }) {
        try {
            const dataResponse = await authAxios.post<ApiResponse<null>>('/wishlist', data);
            return dataResponse.payload.value;
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

    public static async removeFavoriteJob(data: { jobId: string }) {
        try {
            const dataResponse = await authAxios.delete<ApiResponse<null>>(`/wishlist/${data.jobId}`);
            return dataResponse.payload.value;
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
    public static async postJob(data: DetailedRequest.postJobCredentials) {
        try {
            const dataResponse = await authAxios.post<ApiResponse<null>>('/', data);
            return dataResponse.payload.value;
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

    public static async detailJob(id: string, data: DetailedRequest.CheckWishlist) {
        try {
            const dataResponse = await axios.get<ApiResponse<Job>>(`/${id}`, { params: data });
            return dataResponse.payload.value;
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

    public static async filterJob(data: DetailedRequest.ParamListJobsCredentials) {
        try {
            const temp = await axios.get<ApiResponse<DetailedResponse.GetAllJobs>>('', { params: data });
            return temp.payload.value;
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

    public static async updateJob(idJob: string, data: DetailedRequest.postJobCredentials) {
        try {
            const dataResponse = await authAxios.put<ApiResponse<null>>(`/${idJob}`, data);
            return dataResponse.payload.value;
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
