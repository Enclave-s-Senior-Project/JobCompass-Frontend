import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChatBox } from './chatbox';
import { memo } from 'react';
import Image from 'next/image';

const ChatbotPopup = memo(() => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className="size-14 overflow-hidden rounded-full shadow-lg drop-shadow-sm">
                    <Image
                        className="h-full w-full p-0"
                        src="/images/chat-bot-icon.jpg"
                        alt="AI bot"
                        width={200}
                        height={200}
                    />
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-full max-w-[480px] border-0 p-0 shadow-none" align="end" side="left">
                <ChatBox />
            </PopoverContent>
        </Popover>
    );
});

ChatbotPopup.displayName = 'ChatbotPopup';

export { ChatbotPopup };
