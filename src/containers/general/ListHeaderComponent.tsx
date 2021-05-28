import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors, fonts, isAndroid } from '../../styles';
import IconComponent from './IconComponent';
import TextComponent from './TextComponent';

// interface IProps {
//   onToggleDrawerButton: (event: GestureResponderEvent) => void;
// }

export default class ListHeaderComponent extends React.Component {
  onToggleDrawerButton = () => {};

  render() {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={this.onToggleDrawerButton}>
          <IconComponent type="MaterialIcons" name="menu" style={styles.icon} />
        </TouchableOpacity>
        <View>
          <View style={styles.locationContainer}>
            <IconComponent
              type="MaterialIcons"
              name="location-pin"
              style={{ ...styles.icon, fontSize: 25 }}
            />
            <TextInput
              onChangeText={() => {}}
              style={styles.locationText}
              defaultValue="Bucharest, Romania"
              underlineColorAndroid="transparent"
            />
          </View>
        </View>
        <View style={styles.mapButton}>
          <IconComponent type="FontAwesome" name="globe" style={styles.icon} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: colors.mainColorLight,
    borderBottomWidth: 1
  },
  menuButton: {
    padding: 10
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  locationText: {
    color: colors.mainColor3,
    fontWeight: '600',
    fontSize: 14
  },
  mapButton: {
    padding: 10
  },
  icon: {
    color: colors.mainColor2,
    fontSize: 30,
    marginRight: 5
  }
});
