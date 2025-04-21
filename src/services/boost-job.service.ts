import { AuthAxios } from '@/lib/axios';
import { ApiResponse, DetailedRequest } from '@/types';
import { AxiosError } from 'axios';
import NextError from 'next/error';
import { handleErrorApi } from '.';

const authAxios = new AuthAxios('boost-job');

export class BoostJobService {
    public static async bootJob(data: DetailedRequest.BoostJob) {
        try {
            const dataResponse = await authAxios.post<ApiResponse<null>>('/', data);
            return dataResponse.payload.value;
        } catch (err) {
            handleErrorApi(err);
        }
    }

    public static async checkBoostJob(jobId: string) {
        try {
            const dataResponse = await authAxios.get<ApiResponse<null>>(`/${jobId}`);
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
