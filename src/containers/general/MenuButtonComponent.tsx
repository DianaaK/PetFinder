import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../../styles';
import IconComponent from './IconComponent';

interface IProps {
  title: string;
  iconType: string;
  iconName: string;
  onPress: () => void;
  titleStyle?: any;
}

export default function MenuButtonComponent(props: IProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <IconComponent
        type={props.iconType}
        name={props.iconName}
        style={[styles.icon, props.titleStyle]}
      />
      <Text style={[styles.title, props.titleStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12
  },
  icon: {
    color: colors.mainColorLight,
    marginRight: 12,
    fontSize: 24
  },
  title: {
    fontSize: 16,
    color: colors.mainColorLight,
    fontWeight: '600',
    fontFamily: fonts.mainFont
  }
});
