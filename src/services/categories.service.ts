import { BaseAxios } from '@/lib/axios';
import { ApiResponse, DetailedResponse, DetailedRequest } from '@/types';
import { AxiosError } from 'axios';
import NextError from 'next/error';

const axios = new BaseAxios('category');

export class CategoryService {
    public static async getPrimaryCategories(pagination: DetailedRequest.Pagination) {
        try {
            const temp = await axios.get<ApiResponse<DetailedResponse.GetCategoriesPrimary>>('/primary', {
                params: pagination,
            });
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

    public static async getCategoriesChildren(id: string, data: DetailedRequest.Pagination) {
        try {
            const temp = await axios.get<ApiResponse<DetailedResponse.GetCategoriesChild>>(`/${id}/children`, {
                params: data,
            });
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
}
