import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const NavBar: React.FC = () => {
  const navigation = useNavigation();

  const navigateTo = (route: string) => {
    navigation.navigate(route as never);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigateTo('Home')}
      >
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigateTo('Promotions')}
      >
        <Text style={styles.navText}>Promotions</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigateTo('Forum')}
      >
        <Text style={styles.navText}>Forum</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigateTo('About')}
      >
        <Text style={styles.navText}>About</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navItem: {
    padding: 10,
  },
  navText: {
    fontSize: 16,
    color: '#333',
  },
}); 