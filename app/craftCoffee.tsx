import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { NavBar } from '../components/NavBar';

export default function craftCoffee(): React.JSX.Element {


  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
            <Text>Craft coffee page</Text>
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
}); 