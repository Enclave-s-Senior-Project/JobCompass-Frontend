import { AuthAxios, BaseAxios } from '@/lib/axios';
import { ApiResponse, DetailedResponse, DetailedRequest } from '@/types';
import { AxiosError } from 'axios';
import NextError from 'next/error';
import { handleErrorApi } from '.';

const axios = new BaseAxios('category');
const authAxios = new AuthAxios('category');

export class CategoryService {
    public static async getPrimaryCategories(pagination: DetailedRequest.Pagination) {
        try {
            const temp = await authAxios.get<ApiResponse<DetailedResponse.GetCategoriesPrimary>>('/primary', {
                params: pagination,
            });
            return temp?.payload?.value;
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

    public static async updateCategory(data: DetailedRequest.UpdateCategory) {
        try {
            const temp = await authAxios.put<ApiResponse<null>>(`/${data.categoryId}`, {
                categoryName: data.categoryName,
            });
            return temp.payload.value;
        } catch (error) {
            handleErrorApi(error);
        }
    }

    public static async createCategory(data: DetailedRequest.CreateCategory) {
        try {
            const temp = await authAxios.post<ApiResponse<null>>('/', {
                categoryName: data.categoryName,
                parentId: data.parentId,
            });
            return temp.payload.value;
        } catch (error) {
            handleErrorApi(error);
        }
    }

    public static async deleteOne(data: DetailedRequest.DeleteCategory) {
        try {
            const temp = await authAxios.delete<ApiResponse<null>>(`/${data.categoryId}`);
            return temp.payload.value;
        } catch (error) {
            handleErrorApi(error);
        }
    }

    public static async deleteMany(data: DetailedRequest.DeleteCategories) {
        try {
            const temp = await authAxios.delete<ApiResponse<null>>('/', {
                data: { categoryIds: data.categoryIds },
            });
            return temp.payload.value;
        } catch (error) {
            handleErrorApi(error);
        }
    }
}
