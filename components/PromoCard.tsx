import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { PromoCardItemProps } from '../types/types';
import { useStore } from '../store';
import { useNotifications } from '../hooks/useNotifications';

interface Props {
  itemCard: PromoCardItemProps;
}

export const PromoCard: React.FC<Props> = ({ itemCard }) => {
  const addToCart = useStore((state) => state.addToCart);
  const { notifySuccess } = useNotifications();

  const handleAddToCart = () => {
    const cartItem = {
      id: itemCard.id,
      name: itemCard.title,
      price: itemCard.price,
      image: [itemCard.img],
      description: itemCard.text,
      rating: 5,
      reviews: []
    };
    addToCart(cartItem);
    notifySuccess('Акция добавлена в корзину');
  };

  return (
    <View style={styles.wrapper}>
      <Image source={{ uri: itemCard.img }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{itemCard.title}</Text>
        <Text style={styles.text}>{itemCard.text}</Text>
        <View style={styles.footer}>
          <Text style={styles.time}>Действует {itemCard.time} часа</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddToCart}
          >
            <Text style={styles.buttonText}>В корзину</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6B3B1A',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#4A4A4A',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  time: {
    fontSize: 14,
    color: '#6B3B1A',
    fontStyle: 'italic',
  },
  addButton: {
    backgroundColor: '#6B3B1A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
}); 