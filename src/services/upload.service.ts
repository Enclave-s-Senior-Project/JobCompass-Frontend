import { AuthAxios } from '@/lib/axios';
import { ApiResponse } from '@/types';
import { AxiosError } from 'axios';
import Error from 'next/error';

const authAxios = new AuthAxios('upload');

export  class UploadService {
    public static uploadFile = async (file: File) => {
        try {
            // Step 1: Get the presigned URL from the backend
            const res = await authAxios.get<ApiResponse<{ url: string; key: string }>>('/presigned-url', {
                params: { filename: file.name, 'content-type': file.type },
            });

            if (!res.payload.value?.url) {
                console.error('Presigned URL not received:', res.payload);
                return { success: false };
            }

            const { url, key } = res.payload.value;
            console.log('Presigned URL:', url);

            // Step 2: Upload the file to S3
            await authAxios.put(url, file, {
                headers: { 'Content-Type': file.type },
            });
            const fileUrl = `${process.env.AWS_S3_STORAGE_URL}/${key}`;

            return { success: true, key, fileUrl };
        } catch (err) {
            console.error('Upload failed:', err);
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
