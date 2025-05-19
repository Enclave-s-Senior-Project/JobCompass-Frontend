'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import DOMPurify from 'dompurify';
import { format } from 'date-fns';
import { memo } from 'react';
import { DotLoading } from '../loading';
import { LocalMessage } from './chatbox';
import { User } from '@/types';

export const ConversationalMessage = memo(
    ({
        message,
        userInfo,
        isMessageLoading = false,
    }: {
        message: LocalMessage;
        userInfo?: User | null;
        isMessageLoading?: boolean;
    }) => {
        // Sanitize HTML content for assistant messages
        const sanitizeHTML = (html: string) => {
            return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
        };

        return (
            <div
                className={cn('flex max-w-[90%] items-start gap-2', message.role === 'user' ? 'ml-auto' : '')}
            >
                {message.role === 'assistant' && (
                    <Avatar>
                        <AvatarImage className="scale-150" src="/images/chat-bot-icon.jpg" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                )}
                <div
                    className={cn(
                        'relative min-w-14 max-w-full cursor-pointer text-wrap break-words rounded-b-xl px-3 py-2 text-sm transition-all',
                        message.role === 'user'
                            ? 'rounded-t-none rounded-tl-2xl bg-primary text-primary-foreground hover:bg-primary-600'
                            : message.failed
                              ? 'rounded-t-none rounded-tr-2xl border border-danger-500 bg-white text-start text-danger-500 hover:bg-danger-50'
                              : 'rounded-t-none rounded-tr-2xl bg-gray-50 text-start hover:bg-gray-100',
                        isMessageLoading ? 'p-4' : ''
                    )}
                >
                    {isMessageLoading ? (
                        <DotLoading />
                    ) : message.role === 'assistant' ? (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: sanitizeHTML(message.content),
                            }}
                        />
                    ) : (
                        message.content
                    )}
                    <span
                        className={cn(
                            'absolute -bottom-4 text-[10px] italic text-gray-500',
                            message.role === 'user' ? 'right-2' : 'left-2'
                        )}
                    >
                        {format(message.timestamp, 'h:mm a')}
                    </span>
                </div>
                {message.role === 'user' && (
                    <Avatar>
                        <AvatarImage src={userInfo?.profileUrl} alt={userInfo?.fullName} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                )}
            </div>
        );
    }
);

ConversationalMessage.displayName = 'ConversationalMessage';