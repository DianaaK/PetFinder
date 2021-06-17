import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { fonts, colors } from '../../styles';
import { isIOS } from '../../styles/deviceHelper';

interface IProps {
  noOfLines?: number;
  style?: any;
  children: any;
}

const TextComponent = (props: IProps) => {
  if (props.noOfLines)
    return (
      <Text
        style={[styles.font, props.style]}
        ellipsizeMode="tail"
        numberOfLines={props.noOfLines}>
        {props.children}
      </Text>
    );
  return <Text style={[styles.font, props.style]}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  font: {
    fontFamily: fonts.mainFont,
    fontSize: isIOS ? 16 : 14,
    color: colors.mainColor
  }
});

export default TextComponent;
