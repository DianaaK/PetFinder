import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Switch
} from 'react-native';
import { UserDTO } from '../../../redux/types';
import { colors, DEVICE_WIDTH, fonts, isIOS } from '../../../styles';
import { IconComponent, TextComponent } from '../../general';

const trackColors = {
  false: colors.mainColor3,
  true: colors.mainColorLight2
};

interface IProps {
  user: UserDTO;
  editUser(userId: string, user: UserDTO): void;
}

const UserFormComponent = (props: IProps) => {
  const navigation = useNavigation();

  const [user, setUser] = useState(props.user);
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

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const toggleSwitch = (field: string) => {
    if (field === 'useSatelliteView') {
      setUser({ ...user, useSatelliteView: !user.useSatelliteView });
    } else {
      setUser({ ...user, useGoogleMaps: !user.useGoogleMaps });
    }
  };

  const saveUser = () => {
    props.editUser(user._id, user);
    setTimeout(() => {
      navigation.goBack();
    }, 1000);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <TextComponent style={styles.questionText}>First name:</TextComponent>
        <TextInput
          value={user.firstname}
          style={styles.input}
          onChangeText={(value) => setUser({ ...user, firstname: value })}
        />
        <TextComponent style={styles.questionText}>Last name:</TextComponent>
        <TextInput
          value={user.lastname}
          style={styles.input}
          onChangeText={(value) => setUser({ ...user, lastname: value })}
        />
        <TextComponent style={styles.questionText}>Email:</TextComponent>
        <TextInput
          value={user.email}
          style={styles.input}
          onChangeText={(value) => setUser({ ...user, email: value })}
        />
        <TextComponent style={styles.questionText}>Phone number:</TextComponent>
        <TextInput
          value={user.phone || ''}
          style={styles.input}
          onChangeText={(value) => setUser({ ...user, phone: value })}
        />

        <View style={styles.rowContainer}>
          <TextComponent style={styles.questionText}>
            Satellite View:
          </TextComponent>
          <Switch
            trackColor={trackColors}
            thumbColor={
              user.useSatelliteView ? colors.mainColor5 : colors.lightGray
            }
            onValueChange={() => {
              toggleSwitch('useSatelliteView');
            }}
            value={user.useSatelliteView}
          />
        </View>

        {isIOS ? (
          <View style={styles.rowContainer}>
            <TextComponent style={styles.questionText}>
              Use Google Maps:
            </TextComponent>
            <Switch
              trackColor={trackColors}
              thumbColor={
                user.useGoogleMaps ? colors.mainColor5 : colors.lightGray
              }
              onValueChange={() => {
                toggleSwitch('useGoogleMaps');
              }}
              value={user.useGoogleMaps}
            />
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.formButton}
          onPress={() => {
            navigation.navigate('Password');
          }}>
          <TextComponent style={styles.formButtonText}>
            Change Password
          </TextComponent>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.saveButtonContainer}>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={keyboardVisible ? dismissKeyboard : saveUser}>
          <TextComponent style={styles.sendButtonText}>
            {keyboardVisible ? '' : 'Save'}
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

export default UserFormComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray2,
    padding: 20
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  questionText: {
    fontSize: 16,
    color: colors.mainColor,
    margin: 8
  },
  input: {
    color: colors.mainColor2,
    borderBottomColor: colors.mainColor3,
    borderBottomWidth: 1,
    width: '100%',
    marginBottom: 10,
    marginHorizontal: 8,
    padding: 0,
    fontSize: 16,
    fontFamily: fonts.mainFont
  },
  formButton: {
    marginTop: 30,
    height: 45,
    padding: 5,
    width: DEVICE_WIDTH / 1.3,
    backgroundColor: colors.mainColorLight3,
    borderRadius: 10,
    borderColor: colors.mainColorLight2,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  formButtonText: {
    fontSize: 14,
    color: colors.mainColor2,
    textTransform: 'uppercase'
  },
  saveButtonContainer: {
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
