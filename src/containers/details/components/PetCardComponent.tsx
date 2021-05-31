import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../styles';
import { IconComponent, TextComponent } from '../../general';

export default function PetCardComponent(props: any) {
  const pet = props.item;

  return (
    <View style={styles.container}>
      <View style={styles.contentHeader}>
        <TextComponent style={styles.petName}>{pet.name}</TextComponent>
        <IconComponent type="Ionicons" name={pet.gender} style={styles.icon} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <View style={styles.flexRowContainer}>
          <IconComponent
            type={
              props.item.species === 'other' ? 'MaterialIcons' : 'FontAwesome5'
            }
            name={
              props.item.species === 'Cat'
                ? 'cat'
                : props.item.species === 'Dog'
                ? 'dog'
                : 'pets'
            }
            style={styles.icon}
          />
          <TextComponent style={styles.petType}>
            {props.item.breed}
          </TextComponent>
        </View>
        <TextComponent style={styles.petAge}>{pet.age}</TextComponent>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <IconComponent
          type="Ionicons"
          name="md-location-sharp"
          style={styles.icon}
        />
        <TextComponent style={styles.location}>{pet.location}</TextComponent>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    minHeight: 100,
    borderRadius: 32,
    paddingVertical: 24,
    paddingHorizontal: 28,
    justifyContent: 'center',
    shadowOffset: { height: 5, width: 0 },
    shadowColor: '#a3a3a3',
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 1,
    zIndex: 4
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  flexRowContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  petName: {
    color: colors.mainColor,
    fontSize: 28,
    fontWeight: '700'
  },
  petType: {
    color: colors.mainColor3,
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 8
  },
  petAge: {
    color: colors.mainColor3,
    fontSize: 14,
    fontWeight: '500',
    paddingVertical: 4
  },
  location: {
    color: '#a3a3a3',
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 4
  },
  icon: {
    color: colors.mainColor5,
    fontSize: 20,
    marginRight: 8
  }
});
