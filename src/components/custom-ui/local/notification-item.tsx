import { NotificationType } from '@/lib/common-enum';
import { cn } from '@/lib/utils';
import { Notification } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { AlertTriangle, Bell, CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';

interface NotificationItemProps {
    notification: Notification;
    onMarkAsRead?: (id: string) => void;
}

const NotificationItem = memo(({ notification, onMarkAsRead }: NotificationItemProps) => {
    const getIcon = () => {
        switch (notification.type) {
            case NotificationType.APPLICATION_ACCEPTED:
            case NotificationType.JOB_APPLIED:
                return <CheckCircle2 className="h-5 w-5 text-green-500" />;
            case NotificationType.JOB_EXPIRED:
                return <AlertTriangle className="h-5 w-5 text-amber-500" />;
            case NotificationType.APPLICATION_REJECTED:
                return <XCircle className="h-5 w-5 text-red-500" />;
            default:
                return <Bell className="h-5 w-5 text-gray-500" />;
        }
    };

    const getTimeAgo = () => {
        if (!notification.createdAt) return '';
        return formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true });
    };

    const handleClick = () => {
        if (!notification.isRead && onMarkAsRead) {
            onMarkAsRead(notification.notificationId);
        }
    };

    const NotificationContent = () => (
        <div
            className={cn(
                'flex items-start gap-3 rounded-md p-3 transition-colors',
                notification.isRead ? 'bg-white' : 'bg-blue-50',
                notification.link && 'cursor-pointer hover:bg-gray-50'
            )}
            onClick={handleClick}
        >
            <div className="mt-0.5 flex-shrink-0">{getIcon()}</div>
            <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between">
                    <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                    <span className="ml-2 whitespace-nowrap text-xs text-gray-500">{getTimeAgo()}</span>
                </div>
                <p className="mt-0.5 text-wrap text-sm text-gray-600">{notification.message}</p>
            </div>
            {!notification.isRead && (
                <div className="flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                </div>
            )}
        </div>
    );

    return notification.link ? (
        <Link href={notification.link} className="block">
            <NotificationContent />
        </Link>
    ) : (
        <NotificationContent />
    );
});

NotificationItem.displayName = 'NotificationItem';

export { NotificationItem };
