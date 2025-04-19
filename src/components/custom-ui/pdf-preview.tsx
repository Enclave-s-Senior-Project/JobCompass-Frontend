import React from 'react';

type Props = {
    linkUrl: string;
};

export default function PDFPreview({ linkUrl }: Props) {
    return (
        <iframe
            className="h-full w-full"
            src={`https://docs.google.com/gview?url=${encodeURIComponent(linkUrl)}&embedded=true`}
        ></iframe>
    );
}
