import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MessageCircleMore } from 'lucide-react';
import { ChatBox } from './chatbox';
import { memo } from 'react';

const ChatbotPopup = memo(() => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="primary" size="icon-lg" className="rounded-full">
                    <MessageCircleMore />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full max-w-96 border-0 p-0 shadow-none" align="end" side="left">
                <ChatBox />
            </PopoverContent>
        </Popover>
    );
});

ChatbotPopup.displayName = 'ChatbotPopup';

export { ChatbotPopup };
