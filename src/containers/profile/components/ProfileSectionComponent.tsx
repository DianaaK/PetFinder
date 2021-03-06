import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import { assets } from '../../../../assets/images';
import { UserDTO } from '../../../redux/types';
import { colors, DEVICE_WIDTH } from '../../../styles';
import { formatDate, requestCameraPermission } from '../../../utils';
import { cloudinaryUpload } from '../../../utils';
import { TextComponent } from '../../general';

interface IProps {
  user: UserDTO;
  editUser(newUser: any): void;
}

const ProfileSectionComponent = (props: IProps) => {
  const chooseAvatarHandler = () => {
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
      mediaType: 'photo'
    };
    launchImageLibrary(options, async (response: any) => {
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
              props.editUser({ profileImage: data.secure_url });
            }
          })
          .catch(() =>
            Toast.show({
              type: 'error',
              text1: 'Due to an error, we could not upload your image!',
              visibilityTime: 1000
            })
          );
      }
    });
  };

  const launchPhoneCamera = async () => {
    await requestCameraPermission();
    const options: any = {
      mediaType: 'photo',
      saveToPhotos: true
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
              props.editUser({ profileImage: data.secure_url });
            }
          })
          .catch((error) => console.warn(error));
      }
    });
  };

  return (
    <View style={styles.userDetails}>
      <View style={styles.flexRowContainer}>
        <TouchableOpacity
          style={styles.profileImageContainer}
          onPress={chooseAvatarHandler}>
          {props.user.profileImage ? (
            <Image
              source={{ uri: props.user?.profileImage || '' }}
              style={styles.image}
            />
          ) : (
            <Image
              source={assets.placeholder}
              style={styles.image}
              resizeMode="cover"
            />
          )}
        </TouchableOpacity>
        <View style={styles.details}>
          <TextComponent style={styles.text}>
            {props.user.firstname + ' ' + props.user.lastname}
          </TextComponent>
          <TextComponent style={[styles.fadedText, { fontSize: 12 }]}>
            Member since: {formatDate(props.user.created || '')}
          </TextComponent>
        </View>
      </View>
      <TextComponent style={styles.fadedText}>{props.user.email}</TextComponent>
    </View>
  );
};

export default ProfileSectionComponent;

const styles = StyleSheet.create({
  userDetails: {
    flexDirection: 'column',
    flex: 2,
    justifyContent: 'space-evenly',
    marginHorizontal: 20,
    borderBottomColor: colors.mainColor3,
    borderBottomWidth: 1
  },
  flexRowContainer: {
    flexDirection: 'row',
    paddingRight: 10
  },
  profileImageContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    height: 90,
    width: 90,
    marginRight: DEVICE_WIDTH / 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.mainColor2
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 50
  },
  details: {
    width: '65%',
    paddingRight: 5,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    color: colors.mainColorLight
  },
  fadedText: {
    marginTop: 10,
    fontSize: 14,
    color: colors.mainColor4
  }
});
