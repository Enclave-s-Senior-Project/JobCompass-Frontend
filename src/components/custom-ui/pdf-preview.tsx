import React from 'react';

type Props = {
    linkUrl: string;
};

export default function PDFPreview({ linkUrl }: Props) {
    return (
        <iframe
            className="w-full h-full"
            src={`https://docs.google.com/gview?url=${encodeURIComponent(linkUrl)}&embedded=true`}
        ></iframe>
    );
}
