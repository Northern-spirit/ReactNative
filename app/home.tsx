import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { SearchBar } from '../components/SearchBar';
import { CartIcon } from '../components/CartIcon';
import { NavBar } from '../components/NavBar';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../store';
import { Notifications } from "../components/Notifications"
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const products = useStore((state) => state.products);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <FlatList
            data={filteredProducts}
            renderItem={({ item }) => <ProductCard product={item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={1}
            contentContainerStyle={styles.list}
          />
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
});

