import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Alert,
  Image,
  Switch
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Checkbox, RadioButton } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {
  PetGender,
  PetReportDTO,
  PetSpecies,
  ReportStatus,
  ReportType,
  UserDTO
} from '../../../redux/types';
import {
  colors,
  DEVICE_WIDTH,
  fonts,
  formStyles,
  isIOS
} from '../../../styles';
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
  pending: boolean;
  error: string | null;
  saveReportAction(report: PetReportDTO): void;
}

const AddPetFormComponent = (props: IProps) => {
  const navigation = useNavigation();
  const route: any = useRoute();

  const [petReport, setPetReport] = useState(props.petReport);
  const [isDirty, setIsDirty] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  let keyboardShowListener: any;
  let keyboardHideListener: any;

  useEffect(() => {
    if (isIOS) {
      keyboardShowListener = Keyboard.addListener('keyboardWillShow', () => {
        setKeyboardVisible(true);
      });
      keyboardHideListener = Keyboard.addListener('keyboardWillHide', () => {
        setKeyboardVisible(false);
      });
    } else {
      keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
        setKeyboardVisible(true);
      });
      keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardVisible(false);
      });
    }
    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  useEffect(() => {
    if (isDirty && !props.pending && !props.error) {
      navigation.goBack();
    }
  }, [props.pending]);

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
                setIsDirty(true);
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
              setIsDirty(true);
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
          setIsDirty(true);
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

  const handleChange = (field: string, value: any) => {
    setIsDirty(true);
    setPetReport({ ...petReport, [field]: value });
  };

  const handleToggle = () => {
    const newStatus =
      petReport.status === ReportStatus.ACTIVE
        ? ReportStatus.INACTIVE
        : ReportStatus.ACTIVE;
    setIsDirty(true);
    setPetReport({ ...petReport, status: newStatus });
  };

  const isValid = () => {
    const incompleteData = !(
      petReport.name &&
      petReport.description &&
      petReport.breed &&
      petReport.age
    );
    const invalidTypes =
      petReport.type === null ||
      petReport.gender === null ||
      petReport.species === null;
    if (incompleteData || invalidTypes) {
      Toast.show({
        type: 'info',
        text1: 'You must complete all the fields!',
        visibilityTime: 2500
      });
      return false;
    } else if (!petReport.media.length) {
      Toast.show({
        type: 'info',
        text1: 'You must upload at least one photo!',
        visibilityTime: 2500
      });
      return false;
    } else if (!(petReport.address || route.params.address)) {
      Toast.show({
        type: 'info',
        text1: 'You must provide an address!',
        visibilityTime: 2500
      });
      return false;
    }
    return true;
  };

  const saveReport = () => {
    if (isValid() && isDirty) {
      const dataToSend: any = {
        ...petReport,
        user: props.editMode ? undefined : props.user._id
      };
      if (!props.editMode) {
        dataToSend.address = route.params.address;
        dataToSend.coordinates = route.params.coordinates;
      }
      props.saveReportAction(dataToSend);
    } else if (!isDirty) {
      Toast.show({
        type: 'info',
        text1: 'No modified fields!',
        visibilityTime: 1000
      });
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={{ padding: 20 }}>
          {props.editMode && (
            <View style={styles.statusContainer}>
              <TextComponent style={formStyles.questionText}>
                Report status:
              </TextComponent>
              <Switch
                trackColor={{
                  false: colors.mainColor4,
                  true: colors.lightGreen
                }}
                thumbColor={petReport.status ? colors.green : colors.lightGray2}
                onValueChange={handleToggle}
                value={!!petReport.status}
              />
              <TextComponent
                style={[
                  formStyles.questionText,
                  {
                    marginLeft: 8,
                    marginTop: 2,
                    color:
                      petReport.status === ReportStatus.ACTIVE
                        ? colors.green
                        : colors.mainColor4
                  }
                ]}>
                {petReport.status === ReportStatus.ACTIVE
                  ? 'ACTIVE'
                  : 'INACTIVE'}
              </TextComponent>
            </View>
          )}
          <View style={styles.questionContainer}>
            <TextComponent style={formStyles.questionText}>
              Report type:
            </TextComponent>
            <RadioButton.Group
              onValueChange={(value) => handleChange('type', Number(value))}
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
            <TextComponent style={formStyles.questionText}>
              Pet name:
            </TextComponent>
            <TextInput
              value={petReport.name}
              style={[formStyles.input, styles.input]}
              onChangeText={(value) => handleChange('name', value)}
            />
          </View>

          <View style={styles.questionContainer}>
            <TextComponent style={formStyles.questionText}>
              Pet gender:
            </TextComponent>
            <RadioButton.Group
              onValueChange={(value) => handleChange('gender', Number(value))}
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
            <TextComponent style={formStyles.questionText}>
              Pet species:
            </TextComponent>
            <RadioButton.Group
              onValueChange={(value) => handleChange('species', Number(value))}
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
            <TextComponent style={formStyles.questionText}>
              Pet breed:
            </TextComponent>
            <TextInput
              value={petReport.breed}
              style={[formStyles.input, styles.input]}
              onChangeText={(value) => handleChange('breed', value)}
            />
          </View>
          <View style={[styles.questionContainer, styles.rowContainer]}>
            <TextComponent style={formStyles.questionText}>
              Pet age:
            </TextComponent>
            <TextInput
              value={petReport.age}
              style={[formStyles.input, styles.input]}
              onChangeText={(value) => handleChange('age', value)}
            />
          </View>

          <View style={styles.questionContainer}>
            <TextComponent
              style={[formStyles.questionText, { marginBottom: 8 }]}>
              Pet description:
            </TextComponent>
            <TextInput
              value={petReport.description}
              style={styles.multilineInput}
              multiline={true}
              numberOfLines={6}
              onChangeText={(value) => handleChange('description', value)}
            />
          </View>

          <View style={styles.questionContainer}>
            <TextComponent
              style={[formStyles.questionText, { marginBottom: 5 }]}>
              Contact info:
            </TextComponent>
            <View style={styles.rowContainer}>
              <Checkbox
                status={petReport.phoneContact ? 'checked' : 'unchecked'}
                onPress={() => {
                  handleChange('phoneContact', !petReport.phoneContact);
                  setPetReport({
                    ...petReport,
                    phoneContact: !petReport.phoneContact
                  });
                }}
                color={colors.mainColor2}
                uncheckedColor={colors.mainColor2}
                disabled={!props.user?.phone}
              />
              <TextComponent
                style={[formStyles.questionText, { marginBottom: 0 }]}>
                Phone number
              </TextComponent>
            </View>

            <View style={styles.rowContainer}>
              <Checkbox
                status={petReport.emailContact ? 'checked' : 'unchecked'}
                onPress={() => {
                  handleChange('emailContact', !petReport.emailContact);
                }}
                color={colors.mainColor2}
                uncheckedColor={colors.mainColor2}
              />
              <TextComponent
                style={[formStyles.questionText, { marginBottom: 0 }]}>
                Email
              </TextComponent>
            </View>
          </View>

          <View style={styles.questionContainer}>
            <TextComponent
              style={[formStyles.questionText, { marginBottom: 8 }]}>
              Upload pet pictures:
            </TextComponent>
            <TouchableOpacity
              style={[formStyles.formButton, styles.formButton]}
              onPress={uploadImages}>
              <TextComponent style={formStyles.formButtonText}>
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
            <TextComponent
              style={[formStyles.questionText, { marginBottom: 8 }]}>
              Set last seen location:
            </TextComponent>
            <TouchableOpacity
              style={[formStyles.formButton, styles.formButton]}
              onPress={onMapOpen}>
              <TextComponent style={formStyles.formButtonText}>
                Open Map
              </TextComponent>
            </TouchableOpacity>
          </View>
          {(petReport.address || route.params?.address) && (
            <TextComponent style={formStyles.questionText}>
              {props.editMode ? petReport.address : route.params?.address}
            </TextComponent>
          )}
        </View>
      </ScrollView>

      <View style={formStyles.saveButtonContainer}>
        <TouchableOpacity
          style={formStyles.saveButton}
          onPress={keyboardVisible ? dismissKeyboard : saveReport}>
          <TextComponent style={formStyles.saveButtonText}>
            {keyboardVisible ? '' : props.editMode ? 'Save' : 'Send'}
          </TextComponent>
          <IconComponent
            type="MaterialIcons"
            name={keyboardVisible ? 'keyboard-arrow-down' : 'arrow-forward-ios'}
            style={[formStyles.icon, { fontSize: keyboardVisible ? 30 : 22 }]}
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
  statusContainer: {
    flexDirection: 'row',
    marginBottom: 15
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  questionContainer: {
    marginBottom: 15
  },
  input: {
    width: DEVICE_WIDTH / 2,
    paddingLeft: 5,
    top: 5
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
    marginTop: 0,
    width: DEVICE_WIDTH / 2.3,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start'
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
