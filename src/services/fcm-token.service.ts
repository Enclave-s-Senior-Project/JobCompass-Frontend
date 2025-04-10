import { AuthAxios } from '@/lib/axios';
import { ApiResponse, DetailedRequest } from '@/types';
import { handleErrorApi } from '.';

const authAxios = new AuthAxios('fcm-token');

export class FcmTokenService {
    public static async createFcmToken(data: DetailedRequest.CreateFcmToken) {
        try {
            const res = await authAxios.post<ApiResponse<any>>('', data);
            return res.payload.value;
        } catch (error) {
            handleErrorApi(error);
        }
    }
}
