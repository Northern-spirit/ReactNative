import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { NavBar } from '../components/NavBar';
import { PromoCard } from '../components/PromoCard'
import { usePromoCard } from '../store/promoCard';
import type { ListRenderItem } from 'react-native';
import { PromoCardItemProps } from '../types/types';
import { CartIcon } from '../components/CartIcon'


export default function Promotions(): React.JSX.Element {
  const promoCard = usePromoCard(state => state.promoCard)

  const renderItem: ListRenderItem<PromoCardItemProps> = ({ item }) => (
    <PromoCard itemCard={item} />
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.wrapperHeader}>
          <Text style={styles.title}>Акции</Text>
          <CartIcon />
        </View>
        <FlatList
          data={promoCard}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={1}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
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
  wrapperHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6B3B1A',
    textAlign: 'center',
    marginVertical: 16,
  },
  listContainer: {
    paddingBottom: 80,
  },
  safe: {
    flex: 1,
  },
}); 