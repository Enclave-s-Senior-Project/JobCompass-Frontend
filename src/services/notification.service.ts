import { AuthAxios } from '@/lib/axios';
import { ApiResponse, DetailedRequest, DetailedResponse } from '@/types';
import { handleErrorApi } from '.';

const authAxios = new AuthAxios('notification');
export class NotificationService {
    public static async getNotifications(pagination: DetailedRequest.Pagination) {
        try {
            const res = await authAxios.get<ApiResponse<DetailedResponse.GetNotifications>>('', { params: pagination });
            return res.payload.value;
        } catch (error) {
            handleErrorApi(error);
        }
    }

    public static async hasUnreadNotification() {
        try {
            const res = await authAxios.get<ApiResponse<boolean>>('/status/unread');
            return res.payload.value;
        } catch (error) {
            handleErrorApi(error);
        }
    }

    public static async getNotificationById(notificationId: string) {
        try {
            const res = await authAxios.get<ApiResponse<DetailedResponse.GetNotification>>(`/${notificationId}`);
            return res.payload.value;
        } catch (error) {
            handleErrorApi(error);
        }
    }

    public static async markAsRead(notificationIds: string[]) {
        try {
            const res = await authAxios.patch<ApiResponse<null>>('/mark-read', {
                notificationIds,
            });
            return res.payload.value;
        } catch (error) {
            handleErrorApi(error);
        }
    }

    public static async markAsReadAll() {
        try {
            const res = await authAxios.patch<ApiResponse<null>>('/mark-all-read');
            return res.payload.value;
        } catch (error) {
            handleErrorApi(error);
        }
    }
}
