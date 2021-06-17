import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextComponent } from '../../general';

export const EmptyComponent = () => {
  return (
    <View style={styles.container}>
      <TextComponent style={styles.text}>No results</TextComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    marginTop: 15
  }
});
