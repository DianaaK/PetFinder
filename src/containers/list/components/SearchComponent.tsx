import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../../../styles';
import { IconComponent } from '../../general';
// interface IProps {
//   onToggleDrawerButton: (event: GestureResponderEvent) => void;
// }

export function SearchComponent(props: any) {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput placeholder="Search pets" style={styles.searchInput} />
        <TouchableOpacity style={styles.searchButton}>
          <IconComponent type="Ionicons" name="search" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <IconComponent
            type="Ionicons"
            name="filter-outline"
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    margin: 8,
    marginBottom: 0
  },
  searchContainer: {
    width: 250,
    height: 40,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: colors.mainColorLight,
    borderWidth: 1
  },
  searchInput: {
    marginLeft: 5,
    width: '82%'
  },
  searchButton: {
    padding: 8
  },
  filterContainer: {
    height: 45,
    width: 50,
    marginLeft: 20,
    backgroundColor: colors.mainColorLight3,
    borderRadius: 10,
    borderColor: colors.mainColorLight2,
    borderWidth: 1
  },
  filterButton: {
    paddingVertical: 10
  },
  icon: {
    color: colors.mainColor3,
    fontSize: 20
  },
  filterIcon: {
    color: 'white'
  }
});
