import React, { useState, useRef } from 'react';
import { View, FlatList, StyleSheet, Image, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { SearchBar } from '../components/SearchBar';
import { CartIcon } from '../components/CartIcon';
import { NavBar } from '../components/NavBar';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../store';
import { Notifications } from "../components/Notifications"
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CATEGORIES = [
  { id: 'coffee', title: 'Кофе' },
  { id: 'sweets', title: 'Сладости' },
  { id: 'lunch', title: 'Обеды' },
];

export default function Home() {
  const products = useStore((state) => state.products);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    setShowScrollTop(scrollPosition > 100);
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const scrollToCategory = (categoryId: string) => {
    const sectionIndex = products.findIndex(p => p.category === categoryId);
    if (sectionIndex !== -1) {
      flatListRef.current?.scrollToIndex({
        index: sectionIndex,
        animated: true,
        viewPosition: 0,
        viewOffset: 0
      });
    }
    setActiveCategory(categoryId);
  };

  return (
    <View style={styles.root}>
      <Image
        source={ require("../assets/images/background.jpeg")}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <View style={styles.header}>
            <SearchBar onSearch={setSearchQuery} />
            <View style={styles.headerIcons}>
              <CartIcon />
              <TouchableOpacity
                style={styles.profileIcon}
                onPress={() => navigation.navigate('Profile' as never)}
              >
                <Ionicons name="person-outline" size={24} color="#6B3B1A" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.categories}>
            {CATEGORIES.map(category => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  activeCategory === category.id && styles.activeCategoryButton
                ]}
                onPress={() => scrollToCategory(category.id)}
              >
                <Text style={[
                  styles.categoryText,
                  activeCategory === category.id && styles.activeCategoryText
                ]}>
                  {category.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <FlatList
            ref={flatListRef}
            data={filteredProducts}
            renderItem={({ item }) => <ProductCard product={item} />}
            keyExtractor={(item) => item.id.toString()}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            getItemLayout={(data, index) => ({
              length: 200, // высота каждого элемента
              offset: 200 * index,
              index,
            })}
          />
          {showScrollTop && (
            <TouchableOpacity 
              style={styles.scrollTopButton}
              onPress={scrollToTop}
            >
              <Ionicons name="arrow-up" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>
        <NavBar />
        <Notifications />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'black', // fallback
  },
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    // backgroundColor: 'rgba(255,255,255,0.7)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.9)', 
    borderRadius: 10,
    margin: 10,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    marginLeft: 5,
  },
  list: {
    padding: 20,
  },
  categories: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F5E6D3',
  },
  activeCategoryButton: {
    backgroundColor: '#6B3B1A',
  },
  categoryText: {
    color: '#6B3B1A',
    fontWeight: '600',
  },
  activeCategoryText: {
    color: 'white',
  },
  scrollTopButton: {
    position: 'absolute',
    right: 16,
    bottom: 90,
    backgroundColor: '#6B3B1A',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});

