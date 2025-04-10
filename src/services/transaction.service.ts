import NextError from 'next/error';
import { AuthAxios, BaseAxios } from '@/lib/axios';
import { ApiResponse, DetailedRequest } from '@/types';
import { AxiosError } from 'axios';

const axios = new BaseAxios('transaction');
const authAxios = new AuthAxios('transaction');

export class TransactionService {
    public static async createOrder(data: DetailedRequest.CreateOrder): Promise<string> {
        try {
            const temp = await authAxios.post<ApiResponse<string>>('create-order', data);
            if (!temp?.payload?.value) {
                throw new Error();
            }

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
