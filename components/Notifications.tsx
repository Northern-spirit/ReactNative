import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useNotifications } from '../store/notifications';

export const Notifications: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();
  const opacity = new Animated.Value(0);

  useEffect(() => {
    if (notifications.length > 0) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        removeNotification(notifications[0].id);
      });
    }
  }, [notifications]);

  if (notifications.length === 0) return null;

  return (
    <View style={styles.container}>
      {notifications.map((notification) => (
        <Animated.View
          key={notification.id}
          style={[styles.notification, { opacity }]}
        >
          <Text style={styles.text}>{notification.message}</Text>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
  notification: {
    backgroundColor: '#6B3B1A',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
