import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

export default function MapComponent(props: any) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 44.45,
          longitude: 26.11,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  }
});
