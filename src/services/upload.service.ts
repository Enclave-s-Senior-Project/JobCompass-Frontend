import { AuthAxios } from '@/lib/axios';
import { ApiResponse } from '@/types';
import axios, { AxiosError } from 'axios';
import Error from 'next/error';

const authAxios = new AuthAxios('upload');

export class UploadService {
    private static async handleCallPresignedUrl(
        url: string,
        key: string,
        file: File
    ): Promise<{ success: boolean; key: string; fileUrl: string }> {
        await axios.put(url, file, {
            headers: { 'Content-Type': file.type },
            withCredentials: false,
        });
        const fileUrl = `${process.env.NEXT_PUBLIC_APP_AWS_S3_STORAGE_URL}/${key}`;

        return { success: true, key, fileUrl };
    }

    public static uploadFile = async (file: File) => {
        try {
            // Step 1: Get the presigned URL from the backend
            const res = await authAxios.get<ApiResponse<{ url: string; key: string }>>('/presigned-url/avatar', {
                params: { filename: file.name, 'content-type': file.type },
            });

            if (!res.payload.value?.url) {
                return { success: false };
            }

            const { url, key } = res.payload.value;

            // Step 2: Upload the file to S3
            const { fileUrl, key: keyUrl, success } = await this.handleCallPresignedUrl(url, key, file);
            return { fileUrl, keyUrl, success };
        } catch (err) {
            if (err instanceof AxiosError) {
                throw new Error({
                    statusCode: Number(err.status || err.response?.status),
                    title: err.response?.data.message,
                });
            }
            throw err;
        }
    };

    public static presignedCV = async (file: File) => {
        try {
            // Step 1: Get the presigned URL from the backend
            const res = await authAxios.get<ApiResponse<{ url: string; key: string }>>('/presigned-url/cv', {
                params: { filename: file.name, 'content-type': file.type },
            });

            if (!res.payload.value?.url) {
                return { success: false };
            }

            const { url, key } = res.payload.value;

            // Step 2: Upload the file to S3
            const { fileUrl, key: keyUrl, success } = await this.handleCallPresignedUrl(url, key, file);
            return { fileUrl, keyUrl, success };
        } catch (err) {
            if (err instanceof AxiosError) {
                throw new Error({
                    statusCode: Number(err.status || err.response?.status),
                    title: err.response?.data.message,
                });
            }
            throw err;
        }
    };
}
