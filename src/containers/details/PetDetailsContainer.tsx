import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { colors, DEVICE_WIDTH, statusBarHeight } from '../../styles';
import { data } from '../home/HomeContainer';
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
        <View style={{ flex: 1, backgroundColor: '#ffffff', width: '100%' }}>
          <View
            style={{
              marginTop: -30,
              marginHorizontal: DEVICE_WIDTH / 14
            }}>
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
  }
});
