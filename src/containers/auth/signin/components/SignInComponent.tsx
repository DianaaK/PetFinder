import React, { useEffect, useState } from 'react';
import { Keyboard, View, Animated } from 'react-native';
import Toast from 'react-native-toast-message';
import { assets } from '../../../../../assets/images';
import { InputComponent } from '../../../general';
import { ButtonComponent } from '../../general';
import { styles } from './styles';
import { DEVICE_HEIGHT, isIOS } from '../../../../styles/deviceHelper';
import { RegisterUserDTO } from '../../../../redux/types';

interface IProps {
  redirectToLogin(): void;
  handleSignIn(user: RegisterUserDTO): void;
}

const SignInComponent = (props: IProps) => {
  const [user, setUser] = useState(new RegisterUserDTO());

  const imageHeight = new Animated.Value(180);
  const backImageHeight = new Animated.Value(DEVICE_HEIGHT / 3);

  useEffect(() => {
    if (isIOS) {
      Keyboard.addListener('keyboardWillShow', keyboardShow);
      Keyboard.addListener('keyboardWillHide', keyboardHide);
    } else {
      Keyboard.addListener('keyboardDidShow', keyboardShow);
      Keyboard.addListener('keyboardDidHide', keyboardHide);
    }
    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardShow);
      Keyboard.removeListener('keyboardDidHide', keyboardHide);
    };
  }, []);

  const keyboardShow = (event: any) => {
    Animated.parallel([
      Animated.timing(imageHeight, {
        duration: event.duration,
        toValue: 0,
        useNativeDriver: false
      }),
      Animated.timing(backImageHeight, {
        duration: event.duration,
        toValue: 0,
        useNativeDriver: false
      })
    ]).start();
  };

  const keyboardHide = (event: any) => {
    Animated.parallel([
      Animated.timing(imageHeight, {
        duration: event.duration,
        toValue: 180,
        useNativeDriver: false
      }),
      Animated.timing(backImageHeight, {
        duration: event.duration,
        toValue: DEVICE_HEIGHT / 3,
        useNativeDriver: false
      })
    ]).start();
  };

  const handleInputChange = (field: string, text: string) => {
    setUser({ ...user, [field]: text });
  };

  const handleLogin = () => {
    Keyboard.dismiss();
    props.redirectToLogin();
  };

  const isValid = () => {
    const incompleteUser = Object.values(user).some((item) => !item);
    const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    if (incompleteUser) {
      Toast.show({
        type: 'error',
        topOffset: 50,
        text1: 'No credentials!',
        text2: 'Please provide all the information required.',
        visibilityTime: 2500
      });
      return false;
    } else if (!emailRegex.test(user.email.trim())) {
      Toast.show({
        type: 'info',
        text1: 'Email address is not valid!',
        visibilityTime: 1000
      });
      return false;
    } else if (user.password.length < 6) {
      Toast.show({
        type: 'info',
        text1: 'Password must have at least 6 characters!',
        visibilityTime: 2500
      });
      return false;
    }
    return true;
  };

  const handleSignIn = () => {
    Keyboard.dismiss();
    if (isValid()) {
      props.handleSignIn(user);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.logoContainer, { height: backImageHeight }]}>
        <Animated.Image
          source={assets.logoSmall}
          style={{ height: imageHeight }}
          resizeMode="contain"
        />
      </Animated.View>
      <View style={styles.content}>
        <View style={styles.inputs}>
          <InputComponent
            theme="light"
            error={false}
            value={user.firstname}
            changeHandler={handleInputChange}
            label="First Name"
            id="firstname"
            iconName="account"
            iconType="MaterialCommunityIcons"
          />
          <InputComponent
            theme="light"
            error={false}
            value={user.lastname}
            changeHandler={handleInputChange}
            label="Last Name"
            id="lastname"
            iconName="account"
            iconType="MaterialCommunityIcons"
          />
          <InputComponent
            theme="light"
            error={false}
            value={user.email}
            changeHandler={handleInputChange}
            label="Email"
            id="email"
            keyboardType="email-address"
            iconName="email"
            iconType="MaterialCommunityIcons"
          />
          <InputComponent
            theme="light"
            error={false}
            value={user.password}
            changeHandler={handleInputChange}
            label="Password"
            id="password"
            iconName="lock"
            iconType="MaterialCommunityIcons"
            isSecure
          />
        </View>
        <ButtonComponent
          type="logIn"
          gradient={['rgb(125, 84, 128)', 'rgb(119, 95, 138)']}
          textButton="Sign in"
          iconName="person-add"
          iconType="Ionicons"
          buttonHandler={handleSignIn}
          pending={false}
        />
        <ButtonComponent
          type="signIn"
          gradient={['rgb(156, 82, 114)', 'rgb(181, 119, 127)']}
          textButton="Log in"
          iconName="login"
          iconType="MaterialCommunityIcons"
          buttonHandler={handleLogin}
          pending={false}
        />
      </View>
    </View>
  );
};

export default SignInComponent;
