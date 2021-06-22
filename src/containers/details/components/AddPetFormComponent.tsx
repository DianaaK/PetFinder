import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Animated,
  Keyboard,
  Alert,
  Image
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Checkbox, RadioButton } from 'react-native-paper';
import {
  PetGender,
  PetReportDTO,
  PetSpecies,
  ReportType,
  UserDTO
} from '../../../redux/types';
import { colors, DEVICE_WIDTH, fonts, isIOS } from '../../../styles';
import {
  cloudinaryUpload,
  requestCameraPermission,
  requestLocationPermission
} from '../../../utils';
import { IconComponent, TextComponent } from '../../general';

interface IProps {
  editMode: boolean;
  user: UserDTO;
  petReport: PetReportDTO;
  saveReportAction(report: PetReportDTO): void;
}

const AddPetFormComponent = (props: IProps) => {
  const navigation = useNavigation();
  const route: any = useRoute();

  const [petReport, setPetReport] = useState(props.petReport);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  const positionBottom = new Animated.Value(0);
  let keyboardShowListener: any;
  let keyboardHideListener: any;

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

  const uploadImages = () => {
    Alert.alert(
      'Do you want to take a photo or choose one from the gallery?',
      '',
      [
        { text: 'Cancel' },
        { text: 'Choose from the gallery', onPress: launchLibrary },
        { text: 'Take a photo', onPress: launchPhoneCamera }
      ]
    );
  };

  const launchLibrary = async () => {
    await requestCameraPermission();
    const options: any = {
      mediaType: 'photo',
      selectionLimit: 8
    };
    launchImageLibrary(options, async (response: any) => {
      if (response.assets?.length) {
        response.assets.forEach((item: any) => {
          const source = {
            uri: item.uri,
            type: item.type,
            name: item.fileName
          };
          cloudinaryUpload(source)
            .then((data: any) => {
              if (data.secure_url) {
                const petMedia = petReport.media;
                petMedia.push(data.secure_url);
                setPetReport({ ...petReport, media: petMedia });
              }
            })
            .catch((error) => {
              console.warn(error);
            });
        });
      }
    });
  };

  const launchPhoneCamera = async () => {
    await requestCameraPermission();
    const options: any = {
      mediaType: 'photo',
      saveToPhotos: true,
      selectionLimit: 8
    };
    launchCamera(options, async (response: any) => {
      if (response.assets?.length) {
        const item = response.assets[0];
        const source = {
          uri: item.uri,
          type: item.type,
          name: item.fileName
        };
        cloudinaryUpload(source)
          .then((data: any) => {
            if (data.secure_url) {
              const petMedia = petReport.media;
              petMedia.push(data.secure_url);
              setPetReport({ ...petReport, media: petMedia });
            }
          })
          .catch((error) => console.warn(error));
      }
    });
  };

  const deleteMedia = (index: number) => {
    Alert.alert('Do you want to delete this photo?', '', [
      { text: 'Cancel' },
      {
        text: 'Yes',
        onPress: () => {
          const petMedia = petReport.media;
          petMedia.splice(index, 1);
          setPetReport({ ...petReport, media: petMedia });
        }
      }
    ]);
  };

  const onMapOpen = async () => {
    await requestLocationPermission();
    navigation.navigate(
      'AddMarkerMap',
      props.editMode
        ? { editMode: true, initialCoordinates: petReport.coordinates }
        : {}
    );
  };

  const onSaveReport = () => {
    const dataToSend: any = {
      ...petReport,
      user: props.editMode ? undefined : props.user._id,
      address: route.params.address,
      coordinates: route.params.coordinates
    };
    props.saveReportAction(dataToSend);
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
              value={petReport.name}
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
              value={petReport.breed}
              style={styles.input}
              onChangeText={(value) =>
                setPetReport({ ...petReport, breed: value })
              }
            />
          </View>
          <View style={[styles.questionContainer, styles.rowContainer]}>
            <TextComponent style={styles.questionText}>Pet age:</TextComponent>
            <TextInput
              value={petReport.age}
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
              value={petReport.description}
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
                status={petReport.phoneContact ? 'checked' : 'unchecked'}
                onPress={() => {
                  setPetReport({
                    ...petReport,
                    phoneContact: !petReport.phoneContact
                  });
                }}
                color={colors.mainColor2}
                uncheckedColor={colors.mainColor2}
                disabled={!props.user?.phone}
              />
              <TextComponent style={[styles.questionText, { marginBottom: 0 }]}>
                Phone number
              </TextComponent>
            </View>

            <View style={styles.rowContainer}>
              <Checkbox
                status={petReport.emailContact ? 'checked' : 'unchecked'}
                onPress={() => {
                  setPetReport({
                    ...petReport,
                    emailContact: !petReport.emailContact
                  });
                }}
                color={colors.mainColor2}
                uncheckedColor={colors.mainColor2}
              />
              <TextComponent style={[styles.questionText, { marginBottom: 0 }]}>
                Email
              </TextComponent>
            </View>
          </View>

          <View style={styles.questionContainer}>
            <TextComponent style={styles.questionText}>
              Upload pet pictures:
            </TextComponent>
            <TouchableOpacity style={styles.formButton} onPress={uploadImages}>
              <TextComponent style={styles.formButtonText}>
                Upload
              </TextComponent>
            </TouchableOpacity>
            <View style={styles.rowContainer}>
              {petReport.media?.map((item: string, index: number) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => deleteMedia(index)}>
                  <Image source={{ uri: item }} style={styles.image} />
                </TouchableOpacity>
              ))}
            </View>
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
};

export default AddPetFormComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray2
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
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
    padding: 5,
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
  },
  image: {
    height: 100,
    width: 100,
    margin: 8
  },
  loadingContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center'
  }
});
