import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../store';
import { useNavigation } from '@react-navigation/native';
import { useNotifications } from '../hooks/useNotifications';

export const CartIcon: React.FC = () => {
  const cart = useStore((state) => state.cart);
  const navigation = useNavigation();
  const { notifyError } = useNotifications();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const reroutCart = () => {
    if (cart.length < 1) {
      notifyError('Add product!)')
    } else {
      navigation.navigate('Cart' as never)
    }
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={()=>reroutCart()}
    >
      <Ionicons name="cart" size={24} color="#6B3B1A" />
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
    borderRadius: 23,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C97B63'
  },
  badgeText: {
    color: '#FFF8F0',
    fontSize: 11,
    fontWeight: 'bold',
  },
}); 