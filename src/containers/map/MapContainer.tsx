import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import {
  colors,
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  statusBarHeight
} from '../../styles';
import { HeaderComponent } from '../general';

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
      <View>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: statusBarHeight,
    flex: 1
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: '100%',
    minHeight: DEVICE_HEIGHT / 2 - statusBarHeight
  },
  cardContainer: {
    marginTop: -30,
    marginHorizontal: DEVICE_WIDTH / 14
  }
});
