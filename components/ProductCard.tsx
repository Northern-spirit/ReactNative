import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useStore } from '../store';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "../app/_layout";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string[];
    rating: number;
    reviews: {
        id: number;
        userName: string;
        text: string;
    }[];
  };
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useStore((state) => state.addToCart);
  const isLoading = useStore((state) => state.isLoading);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleAddToCart = async (product: ProductCardProps['product']) => {
    await addToCart(product);
  };

  const handlePress = () => {
    navigation.navigate('ProductDetail', { id: (product.id).toString() });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={{ uri: product.image[0] }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => handleAddToCart(product)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Add</Text>
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    width: '100%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  info: {
    padding: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  name: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
}); 