import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../../styles';
import IconComponent from './IconComponent';
import TextComponent from './TextComponent';

interface IProps {
  title: string;
  leftButtonAction: () => void;
  leftButtonIcon: {
    type: string;
    name: string;
  };
  rightButtonAction?: () => void;
  rightButtonIcon?: {
    type: string;
    name: string;
  };
}

export default function HeaderComponent(props: IProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={props.leftButtonAction}>
        <IconComponent
          type={props.leftButtonIcon.type}
          name={props.leftButtonIcon.name}
          style={styles.icon}
        />
      </TouchableOpacity>
      <View>
        <View style={styles.headerContainer}>
          <TextComponent style={styles.headerText}>{props.title}</TextComponent>
        </View>
      </View>
      {props.rightButtonIcon ? (
        <TouchableOpacity
          style={styles.button}
          onPress={props.rightButtonAction}>
          <IconComponent
            type={props.rightButtonIcon.type}
            name={props.rightButtonIcon.name}
            style={styles.icon}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.button} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: colors.mainColorLight,
    borderBottomWidth: 1
  },
  button: {
    padding: 10
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerText: {
    color: colors.mainColor2,
    fontSize: 20,
    fontWeight: '600'
  },
  icon: {
    color: colors.mainColor2,
    fontSize: 30,
    marginRight: 5
  }
});
