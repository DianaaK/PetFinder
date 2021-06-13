import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { colors, statusBarHeight } from '../../styles';
import { HeaderComponent } from '../general';
import { AddPetFormComponent } from './components';

export default function AddPetContainer(props: any) {
  const onBack = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <HeaderComponent
        title="Add Pet Report"
        leftButtonAction={onBack}
        leftButtonIcon={{
          type: 'MaterialIcons',
          name: 'arrow-back'
        }}
      />
      <AddPetFormComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
