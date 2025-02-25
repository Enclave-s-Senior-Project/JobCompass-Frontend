import { AuthAxios } from '@/lib/axios';
import { ApiResponse, DetailedRequest } from '@/types';
import { AxiosError } from 'axios';
import NextError from 'next/error';

const authAxios = new AuthAxios('apply-job');

export class ApplyJobService {
    public static async applyJobCoverLetter(data: DetailedRequest.ApplyJobCoverLette) {
        try {
            const dataResponse = await authAxios.post<ApiResponse<null>>('/', data);
            return dataResponse.payload;
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
