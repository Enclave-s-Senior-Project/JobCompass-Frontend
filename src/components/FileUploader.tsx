'use client';
import { useState } from 'react';
import { uploadFile } from '@/utils/uploadFile';
import Image from 'next/image';

export default function FileUploader() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return alert('Please select a file.');
        setUploading(true);

        const result = await uploadFile(file);
        console.log('image', result);

        setUploading(false);

        if (result.success) {
            alert(`Uploaded successfully: ${result.key}`);
            setUploadedImageUrl(result.fileUrl);
        } else {
            alert('Upload failed.');
        }
    };

    return (
        <div className="p-4 rounded-lg shadow-md max-w-md mx-auto">
            <input type="file" onChange={handleFileChange} className="mb-2" />
            <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded" disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>

            {uploadedImageUrl && (
                <div className="mt-4">
                    <h3 className="font-semibold">Uploaded Image:</h3>
                    <Image
                        src={uploadedImageUrl}
                        alt="Uploaded"
                        className="mt-2 rounded shadow-md max-w-full"
                        width={300}
                        height={300}
                    />
                </div>
            )}
        </div>
    );
}
