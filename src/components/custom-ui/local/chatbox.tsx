'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserContext } from '@/contexts';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Loader2, Send } from 'lucide-react';
import { memo, useContext, useEffect, useRef, useState } from 'react';

type Message = {
    id: string;
    content: string;
    sender: 'user' | 'bot';
    timestamp: Date;
};

const ChatBox = memo(() => {
    const { userInfo } = useContext(UserContext);

    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            content: 'Hello! How can I help you today?',
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isPending, setIsPending] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Load messages from local storage when the component mounts
    useEffect(() => {
        const storedMessages = JSON.parse(
            localStorage.getItem(`messages:${userInfo?.account_id}`) || '[]'
        ) as Message[];

        if (storedMessages.length > 0) {
            setMessages(storedMessages);
        }
    }, []);

    useEffect(() => {
        if (messages.length === 0) return;
        // Save last 20 messages to local storage whenever they change
        localStorage.setItem(`messages:${userInfo?.account_id}`, JSON.stringify(messages.slice(-20)));
    }, [messages]);

    const handleSendMessage = () => {
        if (isPending) return;
        if (inputValue.trim() === '') return;

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            content: inputValue,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');

        // Simulate bot response after a short delay
        setTimeout(() => {
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: `I received your message: "${inputValue}"`,
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
            setIsPending(false);
        }, 1000);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
            setIsPending(true);
        }
    };

    return (
        <Card className="max-w-96 w-full h-[500px] flex flex-col rounded-md shadow-xl drop-shadow-xl">
            <CardHeader className="px-4 py-3 border-b">
                <CardTitle className="text-lg font-medium">Chat with AI Assistant</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden">
                <ScrollArea className="h-[380px] p-4">
                    <div className="flex flex-col gap-x-3 gap-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={cn(
                                    'flex items-start gap-2 max-w-[80%]',
                                    message.sender === 'user' ? 'ml-auto' : ''
                                )}
                            >
                                {message.sender === 'bot' && (
                                    <Avatar>
                                        <AvatarImage
                                            className="scale-150"
                                            src="/images/chat-bot-icon.jpg"
                                            alt="@shadcn"
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                )}
                                <div
                                    className={cn(
                                        'relative min-w-14 max-w-full text-wrap break-words rounded-b-xl px-3 py-2 text-sm cursor-pointer transition-all',
                                        message.sender === 'user'
                                            ? 'rounded-t-none rounded-tl-2xl bg-primary hover:bg-primary-600 text-primary-foreground'
                                            : 'text-start rounded-t-none rounded-tr-2xl bg-gray-50 hover:bg-gray-100 '
                                    )}
                                >
                                    {message.content}
                                    <span
                                        className={cn(
                                            'absolute -bottom-4 text-[10px] text-gray-500 italic',
                                            message.sender === 'user' ? 'right-2' : 'left-2'
                                        )}
                                    >
                                        {format(message.timestamp, 'h:mm a')}
                                    </span>
                                </div>
                                {message.sender === 'user' && (
                                    <Avatar>
                                        <AvatarImage src={userInfo?.profileUrl} alt={userInfo?.fullName} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter className="p-3 border-t">
                <div className="flex w-full items-center gap-2">
                    <Input
                        placeholder="Type a message..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="h-12 rounded-md focus-visible:ring-1 focus-visible:border focus-visible:border-primary-500 focus-visible:ring-primary-500 shadow-none transition-all"
                    />
                    <Button
                        size="icon-lg"
                        className="h-12"
                        onClick={handleSendMessage}
                        disabled={inputValue.trim() === '' || isPending}
                    >
                        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        <span className="sr-only">Send message</span>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
});

ChatBox.displayName = 'ChatBox';

export { ChatBox };
