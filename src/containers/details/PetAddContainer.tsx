import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  colors,
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  statusBarHeight
} from '../../styles';
import { HeaderComponent } from '../general';

export default function PetAddContainer(props: any) {
  const onBack = () => {
    props.navigation.navigate('List');
  };

  const saveReport = () => {};

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.mainColor}
        barStyle="light-content"
        translucent
      />
      <ScrollView>
        <HeaderComponent
          title="Add Report"
          leftButtonAction={onBack}
          leftButtonIcon={{
            type: 'MaterialIcons',
            name: 'arrow-back'
          }}
          rightButtonAction={saveReport}
          rightButtonIcon={{
            type: 'MaterialIcons',
            name: 'done'
          }}
        />
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
