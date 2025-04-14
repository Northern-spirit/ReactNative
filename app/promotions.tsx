import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { NavBar } from '../components/NavBar';

interface Styles {
  container: ViewStyle;
  title: TextStyle;
}

export default function Promotions(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Акции</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
}); 