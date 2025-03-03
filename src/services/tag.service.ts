import { BaseAxios } from '@/lib/axios';
import { ApiResponse, DetailedResponse, Tag } from '@/types';
import { AxiosError } from 'axios';
import NextError from 'next/error';

const axios = new BaseAxios('tag');

export class TagService {
    public static async getAllTags() {
        try {
            const temp = await axios.get<ApiResponse<DetailedResponse.GetAllCvByIdProfile>>('');
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

    public static async searchTag(name: string) {
        try {
            const temp = await axios.get<ApiResponse<DetailedResponse.GetAllTag>>(`/filter/${name}`);
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

    public static async addTag(data: Omit<Tag, 'isActive' | 'tagId'>[]) {
        try {
            const temp = await axios.post<ApiResponse<null>>('/', data);
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
