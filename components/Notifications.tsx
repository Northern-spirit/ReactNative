import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useNotificationStore } from '../store/notification';

export const Notifications: React.FC = () => {
  const notifications = useNotificationStore((state) => state.notifications);

  return (
    <View style={styles.container} pointerEvents="box-none">
      {notifications.map((notification, index) => (
        <View
          key={index}
          style={[
            styles.notification,
            notification.type === 'success' ? styles.success : styles.error,
          ]}
        >
          <Text style={styles.text}>{notification.text}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    zIndex: 1000,
    pointerEvents: 'box-none',
  },
  notification: {
    marginVertical: 5,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  success: {
    backgroundColor: '#A7D1AB',
  },
  error: {
    backgroundColor: '#E07A5F',
  },
  text: {
    color: '#FAFAFA',
    fontSize: 16,
  },
});
