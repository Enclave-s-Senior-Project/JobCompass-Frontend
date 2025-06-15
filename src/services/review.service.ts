import { AuthAxios } from '@/lib/axios';
import { ApiResponse, DetailedResponse } from '@/types';
import { AxiosError } from 'axios';
import NextError from 'next/error';
import { handleErrorApi } from '.';

const authAxios = new AuthAxios('user-ratings');

export class ReviewService {
    public static async getByEnterprise(enterpriseId: string) {
        try {
            const dataResponse = await authAxios.get<ApiResponse<DetailedResponse.UserRating[]>>(
                `/enterprise/${enterpriseId}`
            );
            return dataResponse?.payload.value;
        } catch (err) {
            handleErrorApi(err);
        }
    }

    public static async getSummaryReviewByEnterpriseId(enterpriseId: string) {
        try {
            const dataResponse = await authAxios.get<ApiResponse<DetailedResponse.ReviewSummary>>(
                `/enterprise/${enterpriseId}/summary`
            );
            return dataResponse?.payload.value;
        } catch (err) {
            handleErrorApi(err);
        }
    }

    public static async createReview(enterpriseId: string, data: { rating: number; comment?: string }) {
        try {
            const dataResponse = await authAxios.post<ApiResponse<DetailedResponse.UserRating>>('', {
                ...data,
                enterpriseId: enterpriseId,
            });
            return dataResponse?.payload.value;
        } catch (err) {
            handleErrorApi(err);
        }
    }

    public static async updateReview(id: string, data: { rating: number; comment?: string }) {
        try {
            const dataResponse = await authAxios.patch<ApiResponse<DetailedResponse.UserRating>>(`/${id}`, data);
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

    public static async deleteReview(id: string) {
        try {
            const dataResponse = await authAxios.delete<ApiResponse<void>>(`/${id}`);
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
