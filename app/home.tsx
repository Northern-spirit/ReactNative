import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SearchBar } from '../components/SearchBar';
import { CartIcon } from '../components/CartIcon';
import { NavBar } from '../components/NavBar';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../store';

export default function Home() {
  const products = useStore((state) => state.products);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar onSearch={setSearchQuery} />
        <CartIcon />
      </View>
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        contentContainerStyle={styles.list}
      />
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  list: {
    padding: 20,
  },
}); 