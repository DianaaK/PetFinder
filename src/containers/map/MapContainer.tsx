import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import {
  colors,
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  statusBarHeight
} from '../../styles';
import { HeaderComponent } from '../general';
import MapComponent from './components/MapComponent';

export default function MapContainer(props: any) {
  const onBack = () => {
    props.navigation.navigate('List');
  };

  const toggleFilters = () => {};

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.mainColor}
        barStyle="light-content"
        translucent
      />
      <HeaderComponent
        title="Map"
        leftButtonAction={onBack}
        leftButtonIcon={{
          type: 'MaterialIcons',
          name: 'arrow-back'
        }}
        rightButtonAction={toggleFilters}
        rightButtonIcon={{
          type: 'MaterialIcons',
          name: 'filter-list'
        }}
      />
      <MapComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: statusBarHeight,
    flex: 1
  }
});
