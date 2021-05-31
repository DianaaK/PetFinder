import React from 'react';
import { View, StatusBar } from 'react-native';
import { styles } from './components/styles';
import SignInComponent from './components/SignInComponent';
import reduxContainer from '../../../redux/reduxContainer';

function SignInContainer(props: any) {
  const loginAction = () => {
    props.navigation.navigate('LogIn');
  };

  const signinAction = () => {
    props.navigation.navigate('List');
  };

  return (
    <View style={styles.background}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
      <SignInComponent handleSignIn={signinAction} handleLogin={loginAction} />
    </View>
  );
}

function mapStateToProps(state: any) {
  return {
    currentScene: state.scene.scene
  };
}

const dispatchToProps = {};

export default reduxContainer(
  SignInContainer,
  mapStateToProps,
  dispatchToProps
);
