import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  colors,
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  statusBarHeight
} from '../../styles';
import { data } from '../list/ListContainer';
import {
  PetCardComponent,
  PetDetailsComponent,
  PetHeaderComponent
} from './components';

export default function PetDetailsContainer(props: any) {
  const route: any = useRoute();

  const itemId = route.params.itemId;
  const animal = data.filter((item: any) => item.id === itemId)[0] || {};

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.mainColor}
        barStyle="light-content"
        translucent
      />
      <ScrollView>
        <PetHeaderComponent item={animal} />
        <View style={styles.detailsContainer}>
          <View style={styles.cardContainer}>
            <PetCardComponent item={animal} />
          </View>
          <PetDetailsComponent item={animal} />
        </View>
      </ScrollView>
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
