import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../../../styles';
import { IconComponent, TextComponent } from '../../general';
// interface IProps {
//   onToggleDrawerButton: (event: GestureResponderEvent) => void;
// }

export function EmptyComponent(props: any) {
  return (
    <View>
      <TextComponent>No results</TextComponent>
    </View>
  );
}
