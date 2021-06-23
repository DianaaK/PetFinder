import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Alert
} from 'react-native';
import { colors, fonts, isIOS } from '../../../styles';
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

  const handleChangePassword = () => {
    if (newPassword !== confirmNewPassword) {
      Alert.alert(
        'Passwords are not identical!',
        'Please check your new password!',
        [{ text: 'OK' }]
      );
    } else {
      props.changePassword(props.userEmail, oldPassword, newPassword);
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <TextComponent style={styles.questionText}>Old password:</TextComponent>
        <TextInput
          value={oldPassword}
          style={styles.input}
          onChangeText={(value) => setOldPassword(value)}
        />
        <TextComponent style={styles.questionText}>New password:</TextComponent>
        <TextInput
          value={newPassword}
          style={styles.input}
          onChangeText={(value) => setNewPassword(value)}
        />
        <TextComponent style={styles.questionText}>
          Repeat new password:
        </TextComponent>
        <TextInput
          value={confirmNewPassword}
          style={styles.input}
          onChangeText={(value) => setConfirmNewPassword(value)}
        />
      </ScrollView>

      <View style={styles.saveButtonContainer}>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={keyboardVisible ? dismissKeyboard : handleChangePassword}>
          <TextComponent style={styles.sendButtonText}>
            {keyboardVisible ? '' : 'Change Password'}
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
