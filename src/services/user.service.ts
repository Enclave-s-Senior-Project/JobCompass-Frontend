import { AuthAxios } from "@/lib/axios";
import { ApiResponse, DetailedRequest, UserProfile } from "@/types";
import { AxiosError } from "axios";
import Error from "next/error";

const authAxios = new AuthAxios('user')

export class UserService {
    public static async updatePersonalProfile(data: DetailedRequest.UpdatePersonalProfile) {
        try {
            const res = await authAxios.patch<ApiResponse<UserProfile>>('/personal', data)
            return res.payload.value
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error({
                    statusCode: Number(error.status || error.response?.status),
                    title: error.response?.data.message,
                });
            }
            throw error;
        }
    }
}