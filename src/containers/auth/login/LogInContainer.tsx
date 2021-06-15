import React from 'react';
import { View, StatusBar, BackHandler, ActivityIndicator } from 'react-native';
import { styles } from './components/styles';
import LogInComponent from './components/LogInComponent';
import reduxContainer from '../../../redux/reduxContainer';
import { useFocusEffect } from '@react-navigation/native';
import { AppStore } from '../../../redux';
import authActions from '../../../redux/authentication/actions';
import { useEffect } from 'react';
import { colors } from '../../../styles';
import { ListType } from '../../../redux/types';

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

  useEffect(() => {
    if (props.auth_user && !props.login_error) {
      props.navigation.navigate('List', { listType: ListType.GENERAL });
    }
  }, [props.login_pending]);

  const loginAction = (user: { email: string; password: string }) => {
    props.loginAction(user.email, user.password);
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
      {props.login_pending && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.mainColorLight} />
        </View>
      )}
      <LogInComponent handleSignIn={signinAction} handleLogin={loginAction} />
    </View>
  );
}

function mapStateToProps(state: AppStore.states) {
  return {
    auth_user: state.auth.auth_user,
    login_pending: state.auth.login_pending,
    login_error: state.auth.login_error
  };
}

const dispatchToProps = {
  loginAction: authActions.loginAction
};

export default reduxContainer(LogInContainer, mapStateToProps, dispatchToProps);
