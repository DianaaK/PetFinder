import React from 'react';
import {StyleSheet, View} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Octicon from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const IconComponent = (props: any) => {
  switch (props.type) {
    case 'MaterialCommunityIcons':
      return (
        <MaterialCommunityIcon
          name={props.name}
          style={[styles.icon, props.style]}
        />
      );
    case 'Ionicons':
      return <Ionicon name={props.name} style={[styles.icon, props.style]} />;
    case 'FontAwesome':
      return (
        <FontAwesome name={props.name} style={[styles.icon, props.style]} />
      );
    case 'MaterialIcons':
      return (
        <MaterialIcon name={props.name} style={[styles.icon, props.style]} />
      );
    case 'Octicons':
      return <Octicon name={props.name} style={[styles.icon, props.style]} />;
    case 'FontAwesome5':
      return (
        <FontAwesome5 name={props.name} style={[styles.icon, props.style]} />
      );
    case 'SimpleLineIcons':
      return (
        <SimpleLineIcons name={props.name} style={[styles.icon, props.style]} />
      );
    default:
      return <View />;
  }
};

const styles = StyleSheet.create({
  icon: {
    fontSize: 24,
    alignSelf: 'center',
  },
});

export default IconComponent;
