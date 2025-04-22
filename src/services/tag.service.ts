import { AuthAxios, BaseAxios } from '@/lib/axios';
import { ApiResponse, DetailedRequest, DetailedResponse, Tag } from '@/types';
import { AxiosError } from 'axios';
import NextError from 'next/error';
import { handleErrorApi } from '.';

const axios = new BaseAxios('tag');
const authAxios = new AuthAxios('tag');

export class TagService {
    public static async getAllTags(pagination: DetailedRequest.Pagination) {
        try {
            const temp = await axios.get<ApiResponse<DetailedResponse.GetAllTags>>('', {
                params: {
                    ...pagination,
                    name: pagination.options,
                },
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

    public static async searchTag(data: DetailedRequest.GetTagsByName) {
        try {
            const temp = await axios.get<ApiResponse<DetailedResponse.GetAllTag>>('', { params: data });
            return temp.payload.value?.data;
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

    public static async addTag(data: Omit<Tag, 'isActive' | 'tagId' | 'createdAt' | 'updatedAt'>[]) {
        try {
            const temp = await axios.post<ApiResponse<null>>('/', data);
            return temp.payload.value;
        } catch (err) {
            handleErrorApi(err);
        }
    }

    public static async updateTag(tagId: string, data: DetailedRequest.UpdateTag) {
        try {
            const temp = await authAxios.put<ApiResponse<null>>(`/${tagId}`, data);
            return temp.payload.value;
        } catch (err) {
            handleErrorApi(err);
        }
    }

    public static async deleteOne(data: DetailedRequest.DeleteOneTag) {
        try {
            const temp = await authAxios.delete<ApiResponse<null>>(`/${data.tagId}`);
            return temp?.payload?.value;
        } catch (err) {
            handleErrorApi(err);
        }
    }

    public static async deleteMany(data: DetailedRequest.DeleteManyTag) {
        try {
            const temp = await authAxios.delete<ApiResponse<null>>('/', { data: { tagIds: data.tagIds } });
            return temp?.payload?.value;
        } catch (err) {
            handleErrorApi(err);
        }
    }
}
