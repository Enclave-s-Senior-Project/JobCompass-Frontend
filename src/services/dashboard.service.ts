import { AuthAxios, BaseAxios } from '@/lib/axios';
import { ApiResponse, DetailedResponse } from '@/types';
import NextError from 'next/error';
import { AxiosError } from 'axios';

const authAxios = new AuthAxios('dashboard');
const axios = new BaseAxios('dashboard');
export class DashboardService {
    public static async getTotal() {
        try {
            const dataResponse = await authAxios.get<ApiResponse<DetailedResponse.GetTotal>>('total-user');
            return dataResponse?.payload.value;
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

    public static async getListCandidateApply(company?: string) {
        try {
            const dataResponse = await authAxios.get<ApiResponse<DetailedResponse.GetListCandidateApply>>('apply-job', {
                params: { company: company ?? null },
            });
            return dataResponse?.payload.value;
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

    public static async getListTopApplyJob() {
        try {
            const dataResponse = await authAxios.get<ApiResponse<DetailedResponse.GetListTopApplyJob[]>>('top-apply');
            return dataResponse?.payload.value;
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

    public static async getDataRevenue() {
        try {
            const dataResponse = await authAxios.get<ApiResponse<DetailedResponse.GetDataRevenue[]>>('revenue');
            return dataResponse?.payload.value;
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

    public static async getTotalHomePage() {
        try {
            const dataResponse = await axios.get<ApiResponse<DetailedResponse.GetTotalHomePage>>('total-home-page');
            return dataResponse?.payload.value;
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

    public static async getCategoryChildHomePage() {
        try {
            const dataResponse = await axios.get<ApiResponse<string[]>>('categories-child-home-page');
            return dataResponse?.payload.value;
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

    public static async getCategoryHomePage() {
        try {
            const dataResponse =
                await axios.get<ApiResponse<DetailedResponse.GetCategoryHomePage[]>>('categories-home-page');
            return dataResponse?.payload.value;
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

    public static async getJobHomePage() {
        try {
            const dataResponse = await axios.get<ApiResponse<DetailedResponse.GetJobHomePage[]>>('job-home-page');
            return dataResponse?.payload.value;
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
