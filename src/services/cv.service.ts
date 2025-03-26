import { AuthAxios } from '@/lib/axios';
import { ApiResponse, DetailedRequest, DetailedResponse } from '@/types';
import { AxiosError } from 'axios';
import NextError from 'next/error';

const authAxios = new AuthAxios('cv');

export class CVService {
    public static async getOwnCV() {
        try {
            const temp = await authAxios.get<ApiResponse<DetailedResponse.GetAllCvByIdProfile>>('/me');
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

    public static async uploadCV(payload: DetailedRequest.CVUpload) {
        try {
            const dataRes = await authAxios.post<ApiResponse<DetailedResponse.UploadCV>>('', payload);
            return dataRes.payload.value;
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

    public static async deleteCV(payload: DetailedRequest.DeleteCv) {
        try {
            const dataRes = await authAxios.delete<ApiResponse<DetailedResponse.DeleteEntityResponse>>(
                `/${payload.cvId}`
            );
            return dataRes.payload.value;
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

    public static async updateCV(payload: DetailedRequest.CVUpdate) {
        console.log(payload);
        try {
            const dataRes = await authAxios.patch<ApiResponse<DetailedResponse.UpdateEntityResponse>>(
                `/${payload.cvId}`,
                {
                    cvName: payload.cvName,
                    isPublished: payload.isPublished,
                }
            );
            return dataRes.payload.value;
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
