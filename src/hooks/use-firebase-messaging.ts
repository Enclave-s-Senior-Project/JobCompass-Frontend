'use client';

import { useContext, useEffect } from 'react';
import { getClientMessaging, getToken, onMessage } from '@/lib/firebase';
import { User } from '@/types';
import { FcmTokenService } from '@/services';
import { MessagePayload } from 'firebase/messaging';
import { toast } from '@/lib/toast';
import { useMutation } from '@tanstack/react-query';
import { NotificationContext } from '@/contexts';

export const useFirebaseMessaging = (userInfo: User | null) => {
    const { handleGetNotification } = useContext(NotificationContext);

    const mutateFcmToken = useMutation({
        mutationFn: async (token: string) => await FcmTokenService.createFcmToken({ token: token }),
        retry: 1,
    });

    useEffect(() => {
        if (userInfo === null || userInfo === undefined) return;

        const messaging = getClientMessaging();
        if (messaging === null || messaging === undefined) return;

        navigator.serviceWorker
            .register('/firebase-messaging-sw.js')
            .then((registration) => {
                Notification.requestPermission().then((permission) => {
                    if (permission === 'granted') {
                        getToken(messaging, {
                            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
                            serviceWorkerRegistration: registration,
                        }).then(async (token) => {
                            await mutateFcmToken.mutateAsync(token);
                        });
                    } else {
                        toast.warning('Allow notifications to receive updates');
                    }
                });

                onMessage(messaging, (payload: MessagePayload) => {
                    toast.info(`${payload.notification?.body}`);
                    if (payload.notification?.title) {
                        handleGetNotification(payload.notification?.title);
                    }
                });
            })
            .catch((error) => {
                console.error('Error registering service worker:', error);
            });
    }, [userInfo]);
};
