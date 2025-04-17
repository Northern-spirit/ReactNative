import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

const NAV_ITEMS: { label: string; icon: IoniconName; route: string }[] = [
  { label: 'Меню', icon: 'restaurant-outline', route: 'Home' },
  { label: 'Акции и бонусы', icon: 'pricetag-outline', route: 'Promotions' },
  { label: 'Карта кофеен', icon: 'map-outline', route: 'Map' },
  { label: 'О нас', icon: 'information-circle-outline', route: 'About' },
];

export const NavBar: React.FC = () => {
  const navigation = useNavigation();

  const navigateTo = (route: string) => {
    navigation.navigate(route as never);
  };

  return (
    <View style={styles.container}>
      {NAV_ITEMS.map(({ label, icon, route }) => (
        <TouchableOpacity
          key={route}
          style={styles.navItem}
          activeOpacity={0.7}
          onPress={() => navigateTo(route)}
        >
          <View style={styles.iconWrapper}>
            <Ionicons name={icon} size={24} color="#6B3B1A" />
          </View>
          <Text style={styles.navText}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 248, 240, 0.85)',
    borderTopWidth: 1,
    borderTopColor: '#D9B08C',
    shadowColor: '#6B3B1A',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: '#D9B08C',
    borderRadius: 25,
    padding: 8,
    marginBottom: 4,
    shadowColor: '#6B3B1A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  navText: {
    fontSize: 14,
    color: '#6B3B1A',
    fontWeight: '600',
    textAlign: 'center',
  },
});
