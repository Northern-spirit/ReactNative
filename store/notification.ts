import { create } from 'zustand';

type NotificationType = 'success' | 'error';

interface Notification {
    text: string;
    type: NotificationType;
}

interface NotificationState {
    notifications: Notification[];
    addNotification: (notification: Notification) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
    notifications: [],
    addNotification: (notification) => {
        set((state) => ({
            notifications: [...state.notifications, notification],
        }));

        // Автоматическое удаление через 4 секунды
        setTimeout(() => {
            const currentNotifications = get().notifications;
            set({
                notifications: currentNotifications.filter((n) => n !== notification),
            });
        }, 4000);
    },
}));