import React, { useState, useRef } from 'react';
import { View, FlatList, StyleSheet, Image, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { SearchBar } from '../components/SearchBar';
import { CartIcon } from '../components/CartIcon';
import { NavBar } from '../components/NavBar';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../store';
import { Notifications } from "../components/Notifications"
import { CoffeeBrewingAnimation } from '../components/CoffeeBrewingAnimation';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CATEGORIES = [
  { type: 'all', title: 'Все меню' },
  { type: 'coffee', title: 'Кофе' },
  { type: 'sweets', title: 'Сладости' },
  { type: 'lunch', title: 'Обеды' },
];

export default function Home() {
  const products = useStore((state) => state.products);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].type);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const isBrewing = useStore((state) => state.isBrewing);
  const setIsBrewing = useStore((state) => state.setIsBrewing);
  const flatListRef = useRef<FlatList>(null);

  const filteredProducts = products.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.type === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    setShowScrollTop(scrollPosition > 100);
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const changeCategory = (categoryType: string) => {
    setActiveCategory(categoryType);
  };

  const handleBrewingComplete = () => {
    setIsBrewing(false);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <SearchBar onSearch={setSearchQuery} />
          <CartIcon />
        </View>

        <View style={styles.categories}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.type}
              style={[
                styles.categoryButton,
                activeCategory === category.type && styles.activeCategory,
              ]}
              onPress={() => changeCategory(category.type)}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === category.type && styles.activeCategoryText,
                ]}
              >
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
          showsVerticalScrollIndicator={false}
        />

        {showScrollTop && (
          <TouchableOpacity style={styles.scrollTopButton} onPress={scrollToTop}>
            <Ionicons name="arrow-up" size={24} color="white" />
          </TouchableOpacity>
        )}

        <CoffeeBrewingAnimation isVisible={isBrewing} onComplete={handleBrewingComplete} />
        <Notifications />
        <NavBar />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6D3',
  },
  safe: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categories: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: 'white',
  },
  activeCategory: {
    backgroundColor: '#6B3B1A',
  },
  categoryText: {
    color: '#6B3B1A',
    fontSize: 14,
    fontWeight: '500',
  },
  activeCategoryText: {
    color: 'white',
  },
  scrollTopButton: {
    position: 'absolute',
    right: 16,
    bottom: 80,
    backgroundColor: '#6B3B1A',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

