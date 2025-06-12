import { badgeVariants } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Badge } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { PiBellRinging } from 'react-icons/pi';
import { NotificationItem } from './notification-item';
import { NotificationContext } from '@/contexts';

const NotificationAlert = () => {
    const {
        notifications,
        hasMore,
        loadMore,
        hasUnreadNotification,
        markAllReadMutation,
        notificationQuery,
        page,
        markOneReadMutation,
    } = useContext(NotificationContext);

    const [open, setOpen] = useState(false);

    const handleOpenChange = (open: boolean) => {
        if (open) {
            notificationQuery.refetch();
        }
        setOpen(open);
    };

    return (
        <div>
            <DropdownMenu open={open} onOpenChange={handleOpenChange}>
                <DropdownMenuTrigger
                    aria-label="Notifications"
                    className="outline-0 focus-within:outline-0 focus-visible:outline-0"
                >
                    <div className={cn('relative', hasUnreadNotification ? 'animate-shake' : '')}>
                        <PiBellRinging className="size-6 transition-transform hover:scale-125"></PiBellRinging>
                        {hasUnreadNotification && (
                            <Badge
                                className={cn(
                                    badgeVariants({ variant: 'notify' }),
                                    'absolute right-0 top-0 size-2.5 rounded-full'
                                )}
                            />
                        )}
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className="z-50 min-w-64 max-w-80 overflow-hidden rounded-md bg-white p-2 shadow drop-shadow sm:max-w-[450px]"
                >
                    <DropdownMenuGroup className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-gray-900">Notifications</h4>
                        <button
                            onClick={() => markAllReadMutation.mutate()}
                            disabled={markAllReadMutation.isPending || !hasUnreadNotification}
                            className={cn(
                                'text-sm text-primary-500 hover:text-primary-700',
                                (markAllReadMutation.isPending || !hasUnreadNotification) &&
                                    'cursor-not-allowed opacity-50'
                            )}
                        >
                            {markAllReadMutation.isPending ? 'Marking...' : 'Mark all read'}
                        </button>
                    </DropdownMenuGroup>
                    <DropdownMenuGroup className="max-h-40 space-y-1 overflow-y-auto shadow-inner scrollbar">
                        <div>
                            {notifications?.length > 0 ? (
                                notifications?.map((notification) => (
                                    <DropdownMenuItem key={notification.notificationId} asChild>
                                        <NotificationItem
                                            notification={notification}
                                            onMarkAsRead={() => markOneReadMutation.mutate(notification.notificationId)}
                                        />
                                    </DropdownMenuItem>
                                ))
                            ) : notificationQuery.isLoading ? (
                                <div className="py-4 text-center text-gray-500">Loading notifications...</div>
                            ) : (
                                <div className="py-4 text-center text-gray-500">No notifications</div>
                            )}

                            {notificationQuery.isFetching && page > 1 && (
                                <div className="py-2 text-center text-gray-500">Loading more...</div>
                            )}
                        </div>
                    </DropdownMenuGroup>
                    <DropdownMenuGroup className="text-center">
                        <button
                            onClick={loadMore}
                            disabled={notificationQuery.isFetching || !hasMore}
                            className={cn(
                                'w-full py-1 text-sm font-normal text-primary-500 hover:text-primary-700',
                                (notificationQuery.isFetching || !hasMore) && 'cursor-not-allowed opacity-50'
                            )}
                        >
                            {!hasMore
                                ? 'No more notifications'
                                : notificationQuery.isFetching
                                  ? 'Loading...'
                                  : 'Load more'}
                        </button>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export { NotificationAlert };
