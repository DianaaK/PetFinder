import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import Toast from 'react-native-toast-message';
import { isIOS, formStyles } from '../../../styles';
import { IconComponent, TextComponent } from '../../general';

interface IProps {
  userEmail: string;
  change_password_pending: boolean;
  change_password_error: string | null;
  changePassword(
    username: string,
    oldPassword: string,
    newPassword: string
  ): void;
}

const UserFormComponent = (props: IProps) => {
  const navigation = useNavigation();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

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
    if (
      confirmNewPassword &&
      !props.change_password_pending &&
      !props.change_password_error
    ) {
      navigation.goBack();
    }
  }, [props.change_password_pending]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const isValid = () => {
    if (!newPassword || !confirmNewPassword) {
      Toast.show({
        type: 'error',
        text1: !newPassword
          ? 'Please enter a new password!'
          : 'Please confirm your new password!',
        visibilityTime: 2500
      });
      return false;
    } else if (newPassword !== confirmNewPassword) {
      Toast.show({
        type: 'error',
        text1: 'Passwords are not identical!',
        visibilityTime: 2500
      });
      return false;
    } else if (newPassword.length < 6) {
      Toast.show({
        type: 'info',
        text1: 'Password must have at least 6 characters!',
        visibilityTime: 2500
      });
      return false;
    }
    return true;
  };

  const handleChangePassword = () => {
    if (isValid()) {
      props.changePassword(props.userEmail, oldPassword, newPassword);
    }
  };

  return (
    <>
      <View style={formStyles.container}>
        <TextComponent style={formStyles.questionText}>
          Old password:
        </TextComponent>
        <TextInput
          value={oldPassword}
          style={formStyles.input}
          secureTextEntry={true}
          onChangeText={(value) => setOldPassword(value)}
        />
        <TextComponent style={formStyles.questionText}>
          New password:
        </TextComponent>
        <TextInput
          value={newPassword}
          style={formStyles.input}
          secureTextEntry={true}
          onChangeText={(value) => setNewPassword(value)}
        />
        <TextComponent style={formStyles.questionText}>
          Repeat new password:
        </TextComponent>
        <TextInput
          value={confirmNewPassword}
          style={formStyles.input}
          secureTextEntry={true}
          onChangeText={(value) => setConfirmNewPassword(value)}
        />
      </View>

      <View style={formStyles.saveButtonContainer}>
        <TouchableOpacity
          style={formStyles.saveButton}
          onPress={keyboardVisible ? dismissKeyboard : handleChangePassword}>
          <TextComponent style={formStyles.saveButtonText}>
            {keyboardVisible ? '' : 'Change Password'}
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
