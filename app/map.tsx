import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { NavBar } from '../components/NavBar';
// import { YaMap, Marker } from 'react-native-yamap';

export default function Map(): React.JSX.Element {
  const COFFEE_LOCATION = {
    lat: 56.858647,
    lon: 60.620688, // координаты Комсомольская 37, Екатеринбург
  };

  return (
    <View style={styles.container}>
      <YaMap
        style={styles.map}
        initialRegion={{
          lat: COFFEE_LOCATION.lat,
          lon: COFFEE_LOCATION.lon,
          zoom: 15,
        }}
      >
        <Marker
          point={COFFEE_LOCATION}
          scale={2}
        />
      </YaMap>
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
}); 