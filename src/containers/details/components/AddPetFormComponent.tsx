import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Animated,
  Keyboard
} from 'react-native';
import { Checkbox, RadioButton } from 'react-native-paper';
import {
  PetGender,
  PetReportDTO,
  PetSpecies,
  ReportType,
  ReportUserDTO
} from '../../../redux/types';
import { colors, DEVICE_WIDTH, fonts, isIOS } from '../../../styles';
import { requestLocationPermission } from '../../../utils';
import { IconComponent, TextComponent } from '../../general';

export default function AddPetFormComponent(props: any) {
  const navigation = useNavigation();
  const positionBottom = new Animated.Value(0);
  let keyboardShowListener: any;
  let keyboardHideListener: any;

  const [petReport, setPetReport] = useState(new PetReportDTO());
  const [phoneContact, setPhoneContact] = useState<boolean>();
  const [emailContact, setEmailContact] = useState<boolean>();
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isIOS) {
      keyboardShowListener = Keyboard.addListener(
        'keyboardWillShow',
        keyboardShow
      );
      keyboardHideListener = Keyboard.addListener(
        'keyboardWillHide',
        keyboardHide
      );
    } else {
      keyboardShowListener = Keyboard.addListener(
        'keyboardDidShow',
        androidKeyboardShow
      );
      keyboardHideListener = Keyboard.addListener(
        'keyboardDidHide',
        androidKeyboardHide
      );
    }
    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  const androidKeyboardShow = () => {
    setKeyboardVisible(true);
  };

  const androidKeyboardHide = () => {
    setKeyboardVisible(false);
  };

  const keyboardShow = (event: any) => {
    Animated.timing(positionBottom, {
      duration: event.duration,
      toValue: event.endCoordinates.height,
      useNativeDriver: true
    }).start();
    setKeyboardVisible(true);
  };

  const keyboardHide = (event: any) => {
    Animated.timing(positionBottom, {
      duration: event.duration,
      toValue: 0,
      useNativeDriver: true
    }).start();
    setKeyboardVisible(false);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const onMapOpen = async () => {
    await requestLocationPermission();
    navigation.navigate('GeneralMap', { viewMode: false });
  };

  const onSaveReport = () => {
    console.log('petReport', petReport);
    navigation.goBack();
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={{ padding: 20 }}>
          <View style={styles.questionContainer}>
            <TextComponent style={styles.questionText}>
              Report type:
            </TextComponent>
            <RadioButton.Group
              onValueChange={(value) =>
                setPetReport({ ...petReport, type: Number(value) })
              }
              value={petReport.type + ''}>
              <View
                style={[
                  styles.rowContainer,
                  { justifyContent: 'space-around' }
                ]}>
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
          </View>

          <View style={[styles.questionContainer, styles.rowContainer]}>
            <TextComponent style={styles.questionText}>Pet name:</TextComponent>
            <TextInput
              style={styles.input}
              onChangeText={(value) =>
                setPetReport({ ...petReport, name: value })
              }
            />
          </View>

          <View style={styles.questionContainer}>
            <TextComponent style={styles.questionText}>
              Pet gender:
            </TextComponent>
            <RadioButton.Group
              onValueChange={(value) =>
                setPetReport({ ...petReport, gender: Number(value) })
              }
              value={petReport.gender + ''}>
              <View
                style={[
                  styles.rowContainer,
                  { justifyContent: 'space-around' }
                ]}>
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
          </View>

          <View style={styles.questionContainer}>
            <TextComponent style={styles.questionText}>
              Pet species:
            </TextComponent>
            <RadioButton.Group
              onValueChange={(value) =>
                setPetReport({ ...petReport, species: Number(value) })
              }
              value={petReport.species + ''}>
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
          </View>

          <View style={[styles.questionContainer, styles.rowContainer]}>
            <TextComponent style={styles.questionText}>
              Pet breed:
            </TextComponent>
            <TextInput
              style={styles.input}
              onChangeText={(value) =>
                setPetReport({ ...petReport, breed: value })
              }
            />
          </View>
          <View style={[styles.questionContainer, styles.rowContainer]}>
            <TextComponent style={styles.questionText}>Pet age:</TextComponent>
            <TextInput
              style={styles.input}
              onChangeText={(value) =>
                setPetReport({ ...petReport, age: value })
              }
            />
          </View>

          <View style={styles.questionContainer}>
            <TextComponent style={styles.questionText}>
              Pet description:
            </TextComponent>
            <TextInput
              style={styles.multilineInput}
              multiline={true}
              numberOfLines={6}
              onChangeText={(value) =>
                setPetReport({ ...petReport, description: value })
              }
            />
          </View>

          <View style={styles.questionContainer}>
            <TextComponent style={styles.questionText}>
              Contact info:
            </TextComponent>
            <View style={styles.rowContainer}>
              <Checkbox
                status={phoneContact ? 'checked' : 'unchecked'}
                onPress={() => {
                  setPhoneContact(!phoneContact);
                }}
                color={colors.mainColor2}
                uncheckedColor={colors.mainColor2}
              />
              <TextComponent style={[styles.questionText, { marginBottom: 0 }]}>
                Phone number
              </TextComponent>
            </View>
            <View>
              <TextInput
                style={[styles.input, { width: DEVICE_WIDTH / 1.5 }]}
                keyboardType="numeric"
                onChangeText={(value) => {
                  const user = petReport.user || new ReportUserDTO();
                  user.phone = value;
                  setPetReport({ ...petReport, user });
                }}
              />
            </View>

            <View style={styles.rowContainer}>
              <Checkbox
                status={emailContact ? 'checked' : 'unchecked'}
                onPress={() => {
                  setEmailContact(!emailContact);
                }}
                color={colors.mainColor2}
                uncheckedColor={colors.mainColor2}
              />
              <TextComponent style={[styles.questionText, { marginBottom: 0 }]}>
                Email
              </TextComponent>
            </View>
            <View>
              <TextInput
                style={[styles.input, { width: DEVICE_WIDTH / 1.5 }]}
                onChangeText={(value) => {
                  const user = petReport.user || new ReportUserDTO();
                  user.email = value;
                  setPetReport({ ...petReport, user });
                }}
              />
            </View>
          </View>

          <View style={styles.questionContainer}>
            <TextComponent style={styles.questionText}>
              Upload pet pictures:
            </TextComponent>
            <TouchableOpacity style={styles.formButton}>
              <TextComponent style={styles.formButtonText}>
                Upload
              </TextComponent>
            </TouchableOpacity>
          </View>

          <View style={styles.questionContainer}>
            <TextComponent style={styles.questionText}>
              Set last seen location:
            </TextComponent>
            <TouchableOpacity style={styles.formButton} onPress={onMapOpen}>
              <TextComponent style={styles.formButtonText}>
                Open Map
              </TextComponent>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.sendButtonContainer}>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={keyboardVisible ? dismissKeyboard : onSaveReport}>
          <TextComponent style={styles.sendButtonText}>
            {keyboardVisible ? '' : 'Send'}
          </TextComponent>
          <IconComponent
            type="MaterialIcons"
            name={keyboardVisible ? 'keyboard-arrow-down' : 'arrow-forward-ios'}
            style={[styles.icon, { fontSize: keyboardVisible ? 30 : 22 }]}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray2
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  questionContainer: {
    marginBottom: 10
  },
  questionText: {
    fontSize: 16,
    color: colors.mainColor,
    marginBottom: 10
  },
  input: {
    color: colors.mainColor2,
    borderBottomColor: colors.mainColor3,
    borderBottomWidth: 1,
    width: DEVICE_WIDTH / 2,
    marginBottom: 10,
    marginLeft: 8,
    padding: 0,
    fontSize: 16,
    fontFamily: fonts.mainFont
  },
  multilineInput: {
    fontSize: 16,
    fontFamily: fonts.mainFont,
    textAlignVertical: 'top',
    color: colors.mainColor2,
    borderColor: colors.mainColor3,
    borderWidth: 1,
    borderRadius: 8
  },
  formButton: {
    height: 45,
    padding: 5,
    width: DEVICE_WIDTH / 2.3,
    backgroundColor: colors.mainColorLight3,
    borderRadius: 10,
    borderColor: colors.mainColorLight2,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  formButtonText: {
    fontSize: 14,
    color: colors.mainColor2,
    textTransform: 'uppercase'
  },
  sendButtonContainer: {
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    borderTopColor: colors.mainColorLight,
    borderTopWidth: 1
  },
  sendButton: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  sendButtonText: {
    fontSize: 24,
    fontFamily: fonts.secondFont,
    color: colors.mainColor2,
    marginBottom: 5
  },
  icon: {
    fontSize: 22,
    marginHorizontal: 8,
    color: colors.mainColor2
  }
});
