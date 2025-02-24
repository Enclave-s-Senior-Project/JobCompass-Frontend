import axios from 'axios';

export const uploadFile = async (file: File) => {
    try {
        // Step 1: Get the presigned URL from the backend
        const { data } = await axios.get('http://localhost:3000/api/upload/presigned-url', {
            params: { filename: file.name, contentType: file.type },
        });

        const { url, key } = data.payload;
        if (!url) {
            console.error('Presigned URL not received:', data);
            return { success: false };
        }

        console.log('Presigned URL:', url);

        // Step 2: Upload the file to S3
        await axios.put(url, file, {
            headers: { 'Content-Type': file.type },
        });
        const fileUrl = `https://job-compass-store.s3.ap-southeast-1.amazonaws.com/${key}`;

        return { success: true, key, fileUrl };
    } catch (error) {
        console.error('Upload failed:', error);
        return { success: false };
    }
};
