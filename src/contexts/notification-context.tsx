'use client';

import { createContext, useContext } from 'react';
import { handleErrorToast } from '@/lib/utils';
import { NotificationService } from '@/services/notification.service';
import { Notification } from '@/types';
import { useMutation, UseMutationResult, useQueries, UseQueryResult } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { UserContext } from './user-context';

type ContextValue = {
    notifications: Notification[];
    markAllReadMutation: UseMutationResult<null | undefined, Error, void, unknown>;
    markOneReadMutation: UseMutationResult<string, Error, string, unknown>;
    loadMore: () => void;
    hasUnreadNotification: boolean;
    hasMore: boolean;
    notificationQuery: UseQueryResult;
    page: number;
    handleGetNotification: (notificationId: string) => void;
};

const NotificationContext = createContext<ContextValue>({
    hasUnreadNotification: false,
    notifications: [],
    markAllReadMutation: {} as UseMutationResult<null | undefined, Error, void, unknown>,
    markOneReadMutation: {} as UseMutationResult<string, Error, string, unknown>,
    handleGetNotification: () => {},
    loadMore: () => {},
    hasMore: false,
    notificationQuery: {} as UseQueryResult,
    page: 1,
});

const LIMIT_EACH_PAGE = 5;

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const { userInfo } = useContext(UserContext);

    const [page, setPage] = useState(1);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const queries = useQueries({
        queries: [
            {
                queryKey: ['notifications', page],
                queryFn: async ({ queryKey }) => {
                    try {
                        if (queryKey) {
                            const data = await NotificationService.getNotifications({
                                page: Number(queryKey[1]) || 1,
                                take: LIMIT_EACH_PAGE,
                            });
                            if (data?.data) {
                                return data;
                            }
                        }
                    } catch (error) {
                        handleErrorToast(error);
                        return null;
                    }
                },
                enabled: userInfo !== null && userInfo !== undefined,
                retry: 1,
            },
            {
                queryKey: ['has-unread-notification'],
                queryFn: async () => {
                    try {
                        return await NotificationService.hasUnreadNotification();
                    } catch (error) {
                        handleErrorToast(error);
                        return null;
                    }
                },
                enabled: userInfo !== null && userInfo !== undefined,
                refetchInterval: 1000 * 60 * 1, // 5 minutes
                retry: 1,
            },
        ],
    });

    const getNewNotificationMutation = useMutation({
        mutationFn: async (notificationId: string) => {
            const notification = notifications.find((notification) => notification.notificationId === notificationId);
            if (notification) return;

            const data = await NotificationService.getNotificationById(notificationId);
            if (data) {
                setNotifications([data, ...notifications]);
            }
            return notificationId;
        },
        retry: 1,
    });

    const markAllReadMutation = useMutation({
        mutationFn: NotificationService.markAsReadAll,
        onSuccess: () => {
            setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })));
            queries[1].refetch(); // refetch unread notification count
        },
        onError: (error) => {
            handleErrorToast(error);
        },
        retry: 1,
    });

    const markOneReadMutation = useMutation({
        mutationFn: async (notificationId: string) => {
            const theNotification = notifications.find(
                (notification) => notification.notificationId === notificationId
            );
            if (theNotification && !theNotification.isRead) {
                await NotificationService.markAsRead([notificationId]);
            }

            return notificationId;
        },
        onSuccess: (notificationId) => {
            setNotifications((prev) =>
                prev.map((notification) => {
                    if (notification.notificationId === notificationId) {
                        return { ...notification, isRead: true };
                    }
                    return notification;
                })
            );
            queries[1].refetch(); // refetch unread notification count
        },
        onError: (error) => {
            handleErrorToast(error);
        },
        retry: 1,
    });

    const handleGetNotification = (notificationId: string) => {
        getNewNotificationMutation.mutate(notificationId);
    };

    useEffect(() => {
        if (!queries[0].data?.data) return;
        
        // Compare the id of notifications and add only new ones to the list
        const newNotifications = queries[0].data.data.filter(
            newNotification => !notifications.some(
                existingNotification => existingNotification.notificationId === newNotification.notificationId
            )
        );
        
        // Combine existing and new notifications, then sort by createdAt in descending order
        setNotifications(prev => 
            [...prev, ...newNotifications].sort((a, b) => 
                new Date(b.createdAt || Date.now()).getTime() - new Date(a.createdAt  || Date.now()).getTime()
            )
        );
    }, [queries[0].data]);

    const loadMore = () => {
        if (!queries[0].data?.meta.hasNextPage || queries[0].isFetching) return;
        setPage((prev) => prev + 1);
    };

    return (
        <NotificationContext.Provider
            value={{
                hasUnreadNotification: queries[1].data || false,
                notifications,
                loadMore,
                markAllReadMutation,
                markOneReadMutation,
                handleGetNotification,
                hasMore: queries[0].data?.meta.hasNextPage || false,
                notificationQuery: queries[0],
                page: page,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};
export { NotificationContext, NotificationProvider };
