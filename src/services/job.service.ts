import { BaseAxios } from '@/lib/axios';
import { ApiResponse, DetailedRequest, DetailedResponse, Job } from 'api-types';
import { AxiosError } from 'axios';
import NextError from 'next/error';

const axios = new BaseAxios('job');

export class JobService {
    public static async getAllJobs(data: DetailedRequest.ParamListJobsCredentials) {
        try {
            const temp = await axios.get<ApiResponse<DetailedResponse.GetAllJobs>>('', { params: data });
            return temp.payload;
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
