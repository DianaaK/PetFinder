import React, { useEffect, useState } from 'react';
import { Keyboard, View, Animated, Alert } from 'react-native';
import { assets } from '../../../../../assets/images';
import { InputComponent } from '../../../general';
import { ButtonComponent } from '../../general';
import { styles } from './styles';
import { DEVICE_HEIGHT, isIOS } from '../../../../styles/deviceHelper';

interface IProps {
  handleSignIn(): void;
  handleLogin(user: { email: string; password: string }): void;
}

const LogInComponent = (props: IProps) => {
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
  });

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
        duration: event ? event.duration : 200,
        toValue: 180,
        useNativeDriver: false
      }),
      Animated.timing(backImageHeight, {
        duration: event ? event.duration : 200,
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
    if (user.email && user.password) {
      props.handleLogin(user);
    } else {
      Alert.alert('No credentials!', 'Please provide both email and password', [
        { text: 'OK' }
      ]);
    }
  };

  const handleSignIn = () => {
    Keyboard.dismiss();
    props.handleSignIn();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={styles.logoContainer}>
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
            label="Email"
            id="email"
            keyboardType="email-address"
            iconName="account"
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
          gradient={['rgb(156, 82, 114)', 'rgb(181, 119, 127)']}
          textButton="Log in"
          iconName="login"
          iconType="MaterialCommunityIcons"
          buttonHandler={handleLogin}
          pending={false}
        />
        <ButtonComponent
          type="signIn"
          gradient={['rgb(125, 84, 128)', 'rgb(119, 95, 138)']}
          textButton="Sign in"
          iconName="person-add"
          iconType="Ionicons"
          buttonHandler={handleSignIn}
          pending={false}
        />
      </View>
    </View>
  );
};

export default LogInComponent;
