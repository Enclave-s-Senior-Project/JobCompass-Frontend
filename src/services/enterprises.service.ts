import { AuthAxios, BaseAxios } from '@/lib/axios';
import { ApiResponse, DetailedRequest, DetailedResponse } from '@/types';
import { AxiosError } from 'axios';
import Error from 'next/error';
import NextError from 'next/error';

const authAxios = new AuthAxios('enterprise');
const axios = new BaseAxios('enterprise');

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
                await authAxios.get<ApiResponse<DetailedResponse.GetDataRegisterEnterprise>>('/me/check');
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
            const dataResponse = await authAxios.get<ApiResponse<DetailedResponse.GetDataRegisterEnterprise>>('/me');
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

    public static async getListEnterprise(data: DetailedRequest.ParamListJobsCredentials) {
        try {
            const temp = await axios.get<ApiResponse<DetailedResponse.GetDataEnterprises>>('', { params: data });
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
    public static async getAllJobsByEnterpriseId(data: DetailedRequest.ParamListJobsOfEnterprise) {
        try {
            const params = {
                page: data.page,
                take: data.take,
                ...(typeof data.query === 'object' && data.query ? data.query : {}),
            };
            const temp = await axios.get<ApiResponse<DetailedResponse.GetAllJobs>>(`/${data.enterpriseId}/jobs`, {
                params,
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
    public static async countJobsByEnterpriseId(id: string) {
        try {
            const temp = await axios.get<ApiResponse<any>>(`/${id}/total-jobs`);
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
    public static async getEnterpriseJob(data: DetailedRequest.GetEnterpriseJobs) {
        try {
            const { enterpriseId, ...pagination } = data;
            const dataRes = await axios.get<ApiResponse<DetailedResponse.EnterpriseJobs>>(`/${enterpriseId}/jobs`, {
                params: pagination,
            });
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

    public static async saveWishlistCandidates(id: string) {
        try {
            const dataResponse = await authAxios.post<ApiResponse<null>>('/wishlist/', { profileId: id });
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

    public static async removeWishlistCandidates(id: string) {
        try {
            const dataResponse = await authAxios.delete<ApiResponse<null>>(`/wishlist/${id}`);
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

    public static async getCandidates(data: DetailedRequest.GetCandidates) {
        try {
            let query = `order=${data.order || 'ASC'}&page=${data.page}&take=${data.take}`;
            if (data.gender) {
                query += `&gender=${data.gender}`;
            }
            if (data.maritalStatus) {
                query += `&isMaried=${data.maritalStatus}`;
            }
            if (Array.isArray(data.categories) && data.categories.length > 0) {
                const industryIds = data.categories.map((cat) => `industryId=${cat}`).join('&');
                query += `&${industryIds}`;
            }
            const temp = await authAxios.get<ApiResponse<DetailedResponse.GetCandidates>>(`/candidate?${query}`);
            return temp.payload.value;
        } catch (err) {
            if (err instanceof AxiosError) {
                throw new Error({
                    statusCode: Number(err.status || err.response?.status),
                    title: err.response?.data.message,
                });
            }
            throw err;
        }
    }
}
