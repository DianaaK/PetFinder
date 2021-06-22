import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { PetGender, PetSpecies, ReportType } from '../../../redux/types';
import { colors } from '../../../styles';
import { TextComponent } from '../../general';

export const SearchForm = (props: any) => {
  return (
    <>
      <TextComponent style={styles.radioText}>Report Type:</TextComponent>
      <RadioButton.Group
        onValueChange={(value) => {
          props.handleRadio(value, 'type');
        }}
        value={props.filters.type + ''}>
        <View style={[styles.rowContainer, { justifyContent: 'space-around' }]}>
          <View style={styles.rowContainer}>
            <RadioButton
              value={ReportType.LOST + ''}
              color={colors.mainColor2}
              uncheckedColor={colors.mainColor2}
            />
            <TextComponent>Lost</TextComponent>
          </View>
          <View style={styles.rowContainer}>
            <RadioButton
              value={ReportType.FOUND + ''}
              color={colors.mainColor2}
              uncheckedColor={colors.mainColor2}
            />
            <TextComponent>Found</TextComponent>
          </View>
        </View>
      </RadioButton.Group>

      <TextComponent style={styles.radioText}>Pet Species:</TextComponent>
      <RadioButton.Group
        onValueChange={(value) => {
          props.handleRadio(value, 'species');
        }}
        value={props.filters.species + ''}>
        <View style={styles.rowContainer}>
          <RadioButton
            value={PetSpecies.CAT + ''}
            color={colors.mainColor2}
            uncheckedColor={colors.mainColor2}
          />
          <TextComponent>Cat</TextComponent>
        </View>
        <View style={styles.rowContainer}>
          <RadioButton
            value={PetSpecies.DOG + ''}
            color={colors.mainColor2}
            uncheckedColor={colors.mainColor2}
          />
          <TextComponent>Dog</TextComponent>
        </View>
        <View style={styles.rowContainer}>
          <RadioButton
            value={PetSpecies.OTHER + ''}
            color={colors.mainColor2}
            uncheckedColor={colors.mainColor2}
          />
          <TextComponent>Other</TextComponent>
        </View>
      </RadioButton.Group>

      <TextComponent style={styles.radioText}>Pet Gender:</TextComponent>
      <RadioButton.Group
        onValueChange={(value) => {
          props.handleRadio(value, 'gender');
        }}
        value={props.filters.gender + ''}>
        <View style={[styles.rowContainer, { justifyContent: 'space-around' }]}>
          <View style={styles.rowContainer}>
            <RadioButton
              value={PetGender.MALE + ''}
              color={colors.mainColor2}
              uncheckedColor={colors.mainColor2}
            />
            <TextComponent>Male</TextComponent>
          </View>
          <View style={styles.rowContainer}>
            <RadioButton
              value={PetGender.FEMALE + ''}
              color={colors.mainColor2}
              uncheckedColor={colors.mainColor2}
            />
            <TextComponent>Female</TextComponent>
          </View>
        </View>
      </RadioButton.Group>

      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity style={styles.doneButton} onPress={props.setQuery}>
          <TextComponent
            style={{
              textTransform: 'uppercase',
              color: colors.mainColor3,
              fontSize: 16
            }}>
            Done
          </TextComponent>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  radioText: {
    marginVertical: 8
  },
  doneButton: {
    width: 100,
    borderRadius: 15,
    borderColor: colors.mainColorLight2,
    backgroundColor: colors.mainColorLight,
    borderWidth: 1,
    padding: 8,
    alignItems: 'center'
  }
});
