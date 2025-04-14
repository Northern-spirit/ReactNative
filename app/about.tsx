import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { NavBar } from '../components/NavBar';

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  description: TextStyle;
}

export default function About(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>О нас</Text>
      <Text style={styles.description}>
        Мы - современный интернет-магазин, предлагающий широкий ассортимент товаров высокого качества.
        Наша миссия - сделать покупки удобными и приятными для каждого клиента.
      </Text>
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
}); 