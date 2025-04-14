import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, FlatList, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { useStore } from '../../store';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../_layout';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

interface Product {
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
}

interface StoreState {
  products: Product[];
  cart: (Product & { quantity: number })[];
  isLoading: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  setLoading: (loading: boolean) => void;
}

interface Styles {
  container: ViewStyle;
  image: ImageStyle;
  dots: ViewStyle;
  dot: ViewStyle;
  activeDot: ViewStyle;
  info: ViewStyle;
  name: TextStyle;
  price: TextStyle;
  rating: ViewStyle;
  description: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  reviews: ViewStyle;
  reviewsTitle: TextStyle;
  review: ViewStyle;
  reviewUser: TextStyle;
  reviewText: TextStyle;
  modalContainer: ViewStyle;
  closeButton: ViewStyle;
  fullScreenImage: ImageStyle;
}

export default function ProductDetail({ route, navigation }: Props): React.JSX.Element {
  const { id } = route.params;
  const products = useStore((state: StoreState) => state.products);
  const addToCart = useStore((state: StoreState) => state.addToCart);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = products.find((p: Product) => p.id === Number(id));

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Товар не найден</Text>
      </View>
    );
  }

  const images = [
    product.image,
  ];

  console.log(images)

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? 'star' : 'star-outline'}
          size={24}
          color="gold"
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x /
              event.nativeEvent.layoutMeasurement.width
          );
          setCurrentImageIndex(index);
        }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedImage(item[0])}>
            <Image source={{ uri: item[0] }} style={styles.image} />
          </TouchableOpacity>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      <View style={styles.dots}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentImageIndex && styles.activeDot,
            ]}
          />
        ))}
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <View style={styles.rating}>
          {renderStars(product.rating)}
        </View>
        <Text style={styles.description}>{product.description}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => addToCart(product)}
        >
          <Text style={styles.buttonText}>Добавить в корзину</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.reviews}>
        <Text style={styles.reviewsTitle}>Отзывы</Text>
        {product.reviews.map((review) => (
          <View key={review.id} style={styles.review}>
            <Text style={styles.reviewUser}>{review.userName}</Text>
            <Text style={styles.reviewText}>{review.text}</Text>
          </View>
        ))}
      </View>
      <Modal
        visible={selectedImage !== null}
        transparent
        onRequestClose={() => setSelectedImage(null)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedImage(null)}
          >
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
          <Image
            source={{ uri: selectedImage || '' }}
            style={styles.fullScreenImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: 'cover',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#007AFF',
  },
  info: {
    padding: 20,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 10,
  },
  rating: {
    flexDirection: 'row',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  reviews: {
    padding: 20,
    backgroundColor: 'white',
    marginTop: 10,
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  review: {
    marginBottom: 15,
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
}); 