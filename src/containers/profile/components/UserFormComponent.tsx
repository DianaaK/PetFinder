import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Switch
} from 'react-native';
import { UserDTO } from '../../../redux/types';
import { colors, formStyles, isIOS } from '../../../styles';
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
      <ScrollView style={formStyles.container}>
        <TextComponent style={formStyles.questionText}>
          First name:
        </TextComponent>
        <TextInput
          value={user.firstname}
          style={formStyles.input}
          onChangeText={(value) => setUser({ ...user, firstname: value })}
        />
        <TextComponent style={formStyles.questionText}>
          Last name:
        </TextComponent>
        <TextInput
          value={user.lastname}
          style={formStyles.input}
          onChangeText={(value) => setUser({ ...user, lastname: value })}
        />
        <TextComponent style={formStyles.questionText}>Email:</TextComponent>
        <TextInput
          value={user.email}
          style={formStyles.input}
          onChangeText={(value) => setUser({ ...user, email: value })}
        />
        <TextComponent style={formStyles.questionText}>
          Phone number:
        </TextComponent>
        <TextInput
          value={user.phone || ''}
          style={formStyles.input}
          onChangeText={(value) => setUser({ ...user, phone: value })}
        />

        <View style={formStyles.rowContainer}>
          <TextComponent style={formStyles.questionText}>
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
          <View style={formStyles.rowContainer}>
            <TextComponent style={formStyles.questionText}>
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
          style={formStyles.formButton}
          onPress={() => {
            navigation.navigate('Password');
          }}>
          <TextComponent style={formStyles.formButtonText}>
            Change Password
          </TextComponent>
        </TouchableOpacity>
      </ScrollView>

      <View style={formStyles.saveButtonContainer}>
        <TouchableOpacity
          style={formStyles.saveButton}
          onPress={keyboardVisible ? dismissKeyboard : saveUser}>
          <TextComponent style={formStyles.saveButtonText}>
            {keyboardVisible ? '' : 'Save'}
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

export default UserFormComponent;
