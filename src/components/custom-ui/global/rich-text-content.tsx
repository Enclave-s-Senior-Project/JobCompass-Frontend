import React from 'react';

type Props = {
    content: string;
    className?: string;
};

export function RichTextContent({ content, className }: Props) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: content }}></div>;
}
