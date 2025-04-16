import { useNotificationStore } from '../store/notification';

export const useNotifications = () => {
  const addNotification = useNotificationStore((state) => state.addNotification);

  const notifySuccess = (text: string) => {
    addNotification({ text, type: 'success' });
  };

  const notifyError = (text: string) => {
    addNotification({ text, type: 'error' });
  };

  return { notifySuccess, notifyError };
};