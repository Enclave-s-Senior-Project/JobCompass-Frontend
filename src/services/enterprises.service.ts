import { AuthAxios } from '@/lib/axios';
import { ApiResponse, DetailedRequest, DetailedResponse } from '@/types';
import { AxiosError } from 'axios';
import NextError from 'next/error';

const authAxios = new AuthAxios('enterprise');

export class EnterpriseService {
    public static async postEnterprise(data: DetailedRequest.PostEnterprisesCredentials) {
        try {
            const dataResponse = await authAxios.post<ApiResponse<null>>('/', data);
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

    public static async checkEnterprise() {
        try {
            const dataResponse =
                await authAxios.get<ApiResponse<DetailedResponse.getDataRegisterEnterprise>>('/me/check');
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

    public static async updateEnterprise(data: DetailedRequest.PostEnterprisesCredentials, id: string) {
        try {
            const dataResponse = await authAxios.patch<ApiResponse<null>>(`/update-enterprise/${id}`, data);
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
    public static async updateEnterpriseCompany(data: DetailedRequest.UpdateEnterprisesCompany) {
        try {
            const dataResponse = await authAxios.patch<ApiResponse<null>>(`/company`, data);
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
    public static async getEnterprise() {
        try {
            const dataResponse = await authAxios.get<ApiResponse<DetailedResponse.getDataRegisterEnterprise>>('/me');
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

    public static async deleteEnterprise(id: string) {
        try {
            const dataResponse = await authAxios.delete<ApiResponse<null>>(`/cancel-enterprise/${id}`);
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
    public static async updateEnterpriseCompanyFounding(data: DetailedRequest.UpdateEnterprisesCompanyFounding) {
        try {
            const dataResponse = await authAxios.patch<ApiResponse<null>>(`/founding`, data);
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
