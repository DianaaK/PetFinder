import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PetGender, PetSpecies, ReportType } from '../../../redux/types';
import { colors, fonts } from '../../../styles';
import { IconComponent, TextComponent } from '../../general';

export default function PetCardComponent(props: any) {
  const pet = props.item;

  return (
    <View style={styles.container}>
      <TextComponent
        style={[
          styles.reportType,
          { color: pet.type === ReportType.LOST ? colors.red : colors.green }
        ]}>
        {pet.type === ReportType.LOST ? 'Lost' : 'Found'}
      </TextComponent>
      <View style={styles.contentHeader}>
        <TextComponent style={styles.petName}>{pet.name}</TextComponent>
        <IconComponent
          type="Ionicons"
          name={pet.gender === PetGender.MALE ? 'male' : 'female'}
          style={styles.icon}
        />
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
              props.item.species === PetSpecies.OTHER
                ? 'MaterialIcons'
                : 'FontAwesome5'
            }
            name={
              props.item.species === PetSpecies.CAT
                ? 'cat'
                : props.item.species === PetSpecies.DOG
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
  reportType: {
    top: -12,
    left: -5,
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    fontFamily: fonts.secondFont
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
    fontWeight: '500',
    paddingVertical: 8,
    fontFamily: fonts.secondFont
  },
  petAge: {
    color: colors.mainColor4,
    fontWeight: '500',
    paddingVertical: 4,
    fontFamily: fonts.secondFont
  },
  location: {
    color: colors.mainColor3,
    fontWeight: '500',
    paddingVertical: 4,
    fontFamily: fonts.secondFont
  },
  icon: {
    color: colors.mainColor5,
    fontSize: 20,
    marginRight: 8
  }
});
