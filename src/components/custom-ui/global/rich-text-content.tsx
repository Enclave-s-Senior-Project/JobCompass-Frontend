import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
    content: string;
    className?: string;
};

export function RichTextContent({ content, className }: Props) {
    return <div className={cn('rich-text-content', className)} dangerouslySetInnerHTML={{ __html: content }}></div>;
}
