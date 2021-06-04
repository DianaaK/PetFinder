import React from 'react';
import { View, StatusBar, BackHandler } from 'react-native';
import { styles } from './components/styles';
import LogInComponent from './components/LogInComponent';
import reduxContainer from '../../../redux/reduxContainer';
import { useFocusEffect } from '@react-navigation/native';

function LogInContainer(props: any) {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  const loginAction = () => {
    props.navigation.navigate('List');
  };

  const signinAction = () => {
    props.navigation.navigate('SignIn');
  };

  return (
    <View style={styles.background}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
      <LogInComponent handleSignIn={signinAction} handleLogin={loginAction} />
    </View>
  );
}

function mapStateToProps(state: any) {
  return {
    currentScene: state.scene.scene
  };
}

const dispatchToProps = {};

export default reduxContainer(LogInContainer, mapStateToProps, dispatchToProps);
