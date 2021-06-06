import React, { useEffect, useState } from 'react';
import { Keyboard, View, Animated } from 'react-native';
import { assets } from '../../../../../assets/images';
import { InputComponent } from '../../../general';
import { ButtonComponent } from '../../general';
import { styles } from './styles';
import { DEVICE_HEIGHT, isIOS } from '../../../../styles/deviceHelper';

const SignInComponent = (props: any) => {
  const [user, setUser] = useState({ email: '', password: '' });

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
        toValue: 100,
        useNativeDriver: false
      })
    ]).start();
  };

  const keyboardHide = (event: any) => {
    Animated.parallel([
      Animated.timing(imageHeight, {
        duration: event ? event.duration : 100,
        toValue: 180,
        useNativeDriver: false
      }),
      Animated.timing(backImageHeight, {
        duration: event ? event.duration : 100,
        toValue: DEVICE_HEIGHT / 3,
        useNativeDriver: false
      })
    ]).start();
  };

  const handleInputChange = (field: string, text: any) => {
    switch (field) {
      case 'email':
        setUser({ ...user, email: text });
        break;
      case 'password':
        setUser({ ...user, password: text });
      default:
        break;
    }
  };

  const handleLogin = () => {
    Keyboard.dismiss();
    props.redirectToLogin();
  };

  const handleSignIn = () => {
    Keyboard.dismiss();
    props.handleSignIn();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          { display: imageHeight ? 'flex' : 'none' }
        ]}>
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
            value={user.email}
            changeHandler={handleInputChange}
            label="First Name"
            id="firstname"
            iconName="account"
            iconType="MaterialCommunityIcons"
          />
          <InputComponent
            theme="light"
            error={false}
            value={user.email}
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
