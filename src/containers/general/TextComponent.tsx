import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {fonts, colors} from '../../styles';
import {isIOS} from '../../styles/deviceHelper';

const TextComponent = (props: any) => {
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
    color: colors.mainColor,
  },
});

export default TextComponent;
