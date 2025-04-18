import { create } from 'zustand';
import { NotificationState} from '../types/types'

export const useNotificationStore = create<NotificationState>((set, get) => ({
    notifications: [],
    addNotification: (notification) => {
        set((state) => ({
            notifications: [...state.notifications, notification],
        }));

        // Автоматическое удаление через 1 секунду
        setTimeout(() => {
            const currentNotifications = get().notifications;
            set({
                notifications: currentNotifications.filter((n) => n !== notification),
            });
        }, 1000);
    },
}));