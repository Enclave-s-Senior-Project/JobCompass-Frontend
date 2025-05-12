'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserContext } from '@/contexts';
import { AIService } from '@/services';
import { AIChatMessage, DetailedRequest } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { Loader2, Send } from 'lucide-react';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import { ConversationalMessage } from './conversational-message';

export interface LocalMessage extends Pick<AIChatMessage, 'content' | 'role'> {
    timestamp: number;
    failed?: boolean;
}

const initMessage: LocalMessage = {
    content: 'Hello! How can I help you today?',
    role: 'assistant',
    timestamp: Date.now(),
};

const ChatBox = memo(() => {
    const { userInfo } = useContext(UserContext);

    const [messages, setMessages] = useState<LocalMessage[]>([initMessage]);
    const [inputValue, setInputValue] = useState('');

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const { mutate: conversation, isPending: isConversationPending } = useMutation({
        mutationFn: (data: DetailedRequest.AIConversationRequest) => AIService.conversation(data),
        onSuccess: (data) => {
            if (data?.choices[0].message.content) {
                const newMessage: LocalMessage = {
                    content: data?.choices[0].message.content,
                    role: 'assistant',
                    timestamp: Date.now(),
                };
                setMessages((prev) => [...prev, newMessage]);
                handleUpdateMessagesOnLocalStorage(newMessage);

                // Clear input value after receiving response
                setInputValue('');
            }
        },
        onError: () => {
            const errorMessage: LocalMessage = {
                content: 'There was an error, please try again later',
                failed: true,
                role: 'assistant',
                timestamp: Date.now(),
            };
            setMessages((prev) => [...prev, errorMessage]);
            handleUpdateMessagesOnLocalStorage(errorMessage);
        },
    });

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Load messages from local storage when the component mounts
    useEffect(() => {
        const storedMessages = JSON.parse(
            localStorage.getItem(`messages:${userInfo?.profileId}`) || '[]'
        ) as LocalMessage[];

        if (storedMessages.length > 0) {
            setMessages(storedMessages);
        }
    }, []);

    const handleUpdateMessagesOnLocalStorage = (message: LocalMessage) => {
        if (!message) return;
        const oldMessages = JSON.parse(
            localStorage.getItem(`messages:${userInfo?.profileId}`) || '[]'
        ) as LocalMessage[];
        localStorage.setItem(`messages:${userInfo?.profileId}`, JSON.stringify([...oldMessages, message]));
    };

    const handleSendMessage = () => {
        if (isConversationPending) return;
        if (inputValue.trim() === '') return;

        // Add user message
        const userMessage: LocalMessage = {
            content: inputValue,
            role: 'user',
            timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, userMessage]);
        handleUpdateMessagesOnLocalStorage(userMessage);

        const slicedMessages = messages.length >= 20 ? messages.slice(-50) : messages;

        const history =
            slicedMessages?.filter(
                (message) =>
                    !message.failed && {
                        content: message.content,
                        role: message.role,
                    }
            ) || [];

        conversation({ question: inputValue, history });
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleClearHistoryConversation = () => {
        localStorage.removeItem(`messages:${userInfo?.profileId}`);
        setMessages([initMessage]);
    };

    return (
        <Card className="flex h-[500px] w-full max-w-96 flex-col rounded-md shadow-xl drop-shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between border-b px-4 py-3">
                <CardTitle className="text-lg font-medium">Chat with AI Assistant</CardTitle>
                <button
                    onClick={handleClearHistoryConversation}
                    className="text-[12px] text-primary-300 transition-colors hover:text-primary-500 hover:underline"
                >
                    Clear history
                </button>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-[380px] p-4">
                    <div className="flex flex-col gap-x-3 gap-y-4">
                        {messages.map((message) => (
                            <ConversationalMessage key={message.timestamp} message={message} userInfo={userInfo} />
                        ))}
                        {isConversationPending && (
                            <ConversationalMessage
                                message={{
                                    content: '',
                                    role: 'assistant',
                                    timestamp: Date.now(),
                                }}
                                isMessageLoading={true}
                            />
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter className="border-t p-3">
                <div className="flex w-full items-center gap-2">
                    <Input
                        placeholder="Type a message..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isConversationPending}
                        className="h-10 rounded-sm text-sm shadow-none transition-all placeholder:text-sm focus-visible:border focus-visible:border-primary-500 focus-visible:ring-1 focus-visible:ring-primary-500"
                    />
                    <Button
                        size="icon-md"
                        className="h-10"
                        onClick={handleSendMessage}
                        disabled={inputValue.trim() === '' || isConversationPending}
                    >
                        {isConversationPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Send className="h-4 w-4" />
                        )}
                        <span className="sr-only">Send message</span>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
});

ChatBox.displayName = 'ChatBox';

export { ChatBox };
