import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { assets } from '../../../../assets/images';
import { PetGender, PetSpecies, ReportType } from '../../../redux/types';
import { colors, fonts } from '../../../styles';
import { IconComponent, TextComponent } from '../../general';

export function ListItemComponent(props: any) {
  const onPressItem = () => {
    props.onPress(props.item._id);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={onPressItem}>
      <View style={styles.imageContainer}>
        <View style={styles.genderContainer}>
          <IconComponent
            type="Ionicons"
            name={props.item.gender === PetGender.MALE ? 'male' : 'female'}
            style={styles.genderIcon}
          />
        </View>
        <Image
          resizeMode="cover"
          source={
            props.item.media ? { uri: props.item.media[0] } : assets.placeholder
          }
          style={styles.imageStyle}
        />
        <View style={styles.reportTypeContainer}>
          <TextComponent
            style={[
              styles.reportType,
              {
                color:
                  props.item.type === ReportType.LOST
                    ? colors.red
                    : colors.green
              }
            ]}>
            {props.item.type === ReportType.LOST ? 'Lost' : 'Found'}
          </TextComponent>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.flexRowContainer}>
          <IconComponent
            type="MaterialIcons"
            name="calendar-today"
            style={styles.icon}
          />
          <TextComponent style={styles.animalDate}>
            {props.item.date}
          </TextComponent>
        </View>
        <View style={styles.nameContainer}>
          <TextComponent style={styles.animalName}>
            {props.item.name}
          </TextComponent>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.detailsFlexContainer}>
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
            <TextComponent style={styles.animalDetails}>
              {props.item.breed}
            </TextComponent>
          </View>

          <View style={styles.detailsFlexContainer}>
            <IconComponent
              type="Ionicons"
              name="md-heart-circle"
              style={styles.icon}
            />
            <TextComponent style={styles.animalDetails}>
              {props.item.age}
            </TextComponent>
          </View>
        </View>
        <View style={styles.flexRowContainer}>
          <IconComponent
            type="MaterialIcons"
            name="location-pin"
            style={styles.icon}
          />
          <TextComponent style={styles.location}>
            {props.item.location}
          </TextComponent>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 190,
    margin: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowOffset: { height: 5, width: 0 },
    shadowColor: '#a3a3a3',
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 2
  },
  imageContainer: {
    borderRadius: 20,
    height: 190,
    width: 190
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20
  },
  genderContainer: {
    position: 'absolute',
    top: 0,
    backgroundColor: colors.mainColorLight,
    borderRadius: 8,
    margin: 8,
    padding: 2,
    zIndex: 2,
    opacity: 0.8
  },
  reportTypeContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.mainColorLight,
    borderRadius: 8,
    margin: 8,
    padding: 5,
    zIndex: 2,
    opacity: 0.8
  },
  reportType: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    fontFamily: fonts.secondFont
  },
  genderIcon: {
    color: colors.mainColor5,
    fontSize: 22
  },
  contentContainer: {
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: 'column'
  },
  flexRowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  animalDate: {
    fontSize: 10,
    paddingVertical: 4,
    fontFamily: fonts.secondFont,
    color: colors.mainColor4
  },
  nameContainer: {
    flex: 3,
    justifyContent: 'center'
  },
  animalName: {
    color: colors.mainColor2,
    fontSize: 22,
    marginHorizontal: 2,
    fontWeight: '600'
  },
  detailsContainer: {
    flex: 3,
    justifyContent: 'center',
    marginVertical: 2
  },
  detailsFlexContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  animalDetails: {
    color: colors.mainColor3,
    fontSize: 14,
    fontWeight: '500',
    paddingVertical: 2,
    fontFamily: fonts.secondFont
  },
  location: {
    color: colors.mainColor4,
    fontSize: 12,
    fontWeight: '500',
    paddingVertical: 4,
    fontFamily: fonts.secondFont
  },
  icon: {
    color: colors.mainColor5,
    paddingRight: 5,
    fontSize: 12
  }
});
