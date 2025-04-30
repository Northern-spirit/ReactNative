import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNotifications } from '../store/notifications';

interface Props {
  isVisible: boolean;
  onComplete: () => void;
}

export const CoffeeBrewingAnimation: React.FC<Props> = ({ isVisible, onComplete }) => {
  const bubbleAnimations = useRef<Animated.Value[]>([]).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (isVisible) {
      // Создаем анимации для пузырьков
      for (let i = 0; i < 10; i++) {
        bubbleAnimations[i] = new Animated.Value(0);
      }

      // Показываем турку
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      // Анимируем пузырьки
      bubbleAnimations.forEach((bubble, index) => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(bubble, {
              toValue: 1,
              duration: 1000 + index * 200,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(bubble, {
              toValue: 0,
              duration: 1000 + index * 200,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ])
        ).start();
      });

      // Через минуту скрываем анимацию и показываем уведомление
      const timer = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          addNotification('Ваш кофе готов!');
          onComplete();
        });
      }, 60000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Ionicons style={styles.imgCoffee} name="cafe" size={35} color="#6B3B1A" />
      {bubbleAnimations.map((bubble, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bubble,
            {
              transform: [
                {
                  translateY: bubble.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -20],
                  }),
                },
              ],
              opacity: bubble,
              left: `${28 + index * 5}%`,
            },
          ]}
        />
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 50,
    position: 'absolute',
    bottom: 100,
    right: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubble: {
    position: 'absolute',
    top: 20,
    width: 3,
    height: 3,
    borderRadius: 4,
    backgroundColor: '#6B3B1A',
    opacity: 0.6,
  },
  imgCoffee: {
    position: 'absolute',
    bottom: 0
  }
}); 