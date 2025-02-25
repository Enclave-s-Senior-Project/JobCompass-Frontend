import { AuthAxios, BaseAxios } from '@/lib/axios';
import { ApiResponse, DetailedResponse } from '@/types';
import { AxiosError } from 'axios';
import NextError from 'next/error';

const axios = new BaseAxios('tag');
const authAxios = new AuthAxios('tag');

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
}
