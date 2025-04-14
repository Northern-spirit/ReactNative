import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../store';
import { useNavigation } from '@react-navigation/native';

export const CartIcon: React.FC = () => {
  const cart = useStore((state) => state.cart);
  const navigation = useNavigation();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Cart' as never)}
    >
      <Ionicons name="cart" size={24} color="black" />
      {totalItems > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    padding: 10,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
}); 