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
import Toast from 'react-native-toast-message';
import { UserDTO } from '../../../redux/types';
import { colors, formStyles, isIOS } from '../../../styles';
import { IconComponent, TextComponent } from '../../general';

const trackColors = {
  false: colors.mainColor3,
  true: colors.mainColorLight2
};

interface IProps {
  user: UserDTO;
  edit_user_pending: boolean;
  edit_user_error: string | null;
  editUser(userId: string, user: UserDTO): void;
}

const UserFormComponent = (props: IProps) => {
  const navigation = useNavigation();

  const [user, setUser] = useState(props.user);
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
    if (isDirty && !props.edit_user_pending && !props.edit_user_error) {
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    }
  }, [props.edit_user_pending]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleChange = (field: string, value: string) => {
    setIsDirty(true);
    setUser({ ...user, [field]: value });
  };

  const toggleSwitch = (field: string) => {
    setIsDirty(true);
    if (field === 'useSatelliteView') {
      setUser({ ...user, useSatelliteView: !user.useSatelliteView });
    } else {
      setUser({ ...user, useGoogleMaps: !user.useGoogleMaps });
    }
  };

  const isValid = () => {
    const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    const numberRegex = new RegExp('^[0-9]+$');
    if (!user.email || !user.firstname || !user.lastname) {
      Toast.show({
        type: 'info',
        text1: 'Name and email fields are required!',
        visibilityTime: 1000
      });
      return false;
    } else if (!emailRegex.test(user.email.trim())) {
      Toast.show({
        type: 'info',
        text1: 'Email address is not valid!',
        visibilityTime: 1000
      });
      return false;
    } else if (user.phone && !numberRegex.test(user.phone)) {
      Toast.show({
        type: 'info',
        text1: 'Phone number is not valid!',
        visibilityTime: 1000
      });
      return false;
    }
    return true;
  };

  const saveUser = () => {
    if (isDirty && isValid()) {
      props.editUser(user._id, user);
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
      <ScrollView style={formStyles.container}>
        <TextComponent style={formStyles.questionText}>
          First name:
        </TextComponent>
        <TextInput
          value={user.firstname}
          style={formStyles.input}
          onChangeText={(value) => handleChange('firstname', value)}
        />
        <TextComponent style={formStyles.questionText}>
          Last name:
        </TextComponent>
        <TextInput
          value={user.lastname}
          style={formStyles.input}
          onChangeText={(value) => handleChange('lastname', value)}
        />
        <TextComponent style={formStyles.questionText}>Email:</TextComponent>
        <TextInput
          value={user.email}
          style={formStyles.input}
          autoCapitalize="none"
          onChangeText={(value) => handleChange('email', value)}
        />
        <TextComponent style={formStyles.questionText}>
          Phone number:
        </TextComponent>
        <TextInput
          value={user.phone || ''}
          style={formStyles.input}
          onChangeText={(value) => handleChange('phone', value)}
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
