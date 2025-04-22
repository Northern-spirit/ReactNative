import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { NavBar } from '../components/NavBar';

// Определение типа для координат
type Coordinate = {
  latitude: number;
  longitude: number;
};

export default function Map(): React.JSX.Element {
  // if (!global.__turboModuleProxy) return null;
  
  const COFFEE_LOCATION: Coordinate = {
    latitude: 56.858647,
    longitude: 60.620688,
  };

  return (
    <View style={styles.container}>
      {/* Из за новой версии реакта на проекте пока не доступны карты так как не оптимизированы карты под эту версию реакта */}
      {/* <MapView
        style={styles.map}
        initialRegion={{
          ...COFFEE_LOCATION,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={COFFEE_LOCATION} />
      </MapView>
      <NavBar /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
});
