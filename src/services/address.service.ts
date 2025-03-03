import { AuthAxios } from '@/lib/axios';
import { ApiResponse, DetailedResponse } from '@/types';
import { AxiosError } from 'axios';
import NextError from 'next/error';

const authAxios = new AuthAxios('enterprise');

export class AddressService {
    public static async getAllAddressByEnterprise() {
        try {
            const dataResponse =
                await authAxios.get<ApiResponse<DetailedResponse.GetAddressByEnterprisesId>>('me/addresses');
            return dataResponse?.payload.value?.addresses;
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
