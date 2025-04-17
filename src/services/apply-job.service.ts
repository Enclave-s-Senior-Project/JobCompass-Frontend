import { AuthAxios } from '@/lib/axios';
import { ApiResponse, DetailedRequest, DetailedResponse, ResponseWithMeta } from '@/types';
import { AxiosError } from 'axios';
import NextError from 'next/error';
import { handleErrorApi } from '.';

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

    public static async getCandidatesApplied(jobId: string, data: DetailedRequest.GetCandidatesApplied) {
        try {
            const educationValue = Array.isArray(data.education) ? data.education[0] : data.education;
            const requestData = {
                ...data,
                education: educationValue,
            };

            const candidates = await authAxios.get<ApiResponse<DetailedResponse.GetCandidatesApplied>>('/', {
                params: requestData,
            });
            return candidates?.payload?.value;
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

    public static async getOwnAppliedJobs(pagination: DetailedRequest.Pagination) {
        try {
            const res = await authAxios.get<ApiResponse<ResponseWithMeta<DetailedResponse.AppliedJobResponse>>>(
                `/own`,
                { params: pagination }
            );
            return res.payload.value;
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

    public static async listCandidatesApplyJob(data: DetailedRequest.GetAppliedJob) {
        try {
            const dataResponse = await authAxios.get<ApiResponse<DetailedRequest.GetAppliedJob>>(`/${data.jobId}`, {
                params: data,
            });
            return dataResponse.payload.value || [];
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
    public static async updateApplicationStatus(payload: DetailedRequest.UpdateApplicationStatus) {
        try {
            const dataResponse = await authAxios.patch<ApiResponse<null>>('/status', {
                applications: payload,
            });
            return dataResponse.payload?.value || null;
        } catch (err) {
            handleErrorApi(err);
        }
    }
}
