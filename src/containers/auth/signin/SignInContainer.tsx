import React, { useEffect } from 'react';
import { View, StatusBar, ActivityIndicator } from 'react-native';
import { styles } from './components/styles';
import SignInComponent from './components/SignInComponent';
import reduxContainer from '../../../redux/reduxContainer';
import { AppStore } from '../../../redux';
import { RegisterUserDTO } from '../../../redux/types';
import authActions from '../../../redux/authentication/actions';
import { colors } from '../../../styles';

function SignInContainer(props: any) {
  useEffect(() => {
    if (props.user && !props.login_pending) {
      props.navigation.navigate('List');
    }
  }, [props.login_pending]);

  const loginRedirectAction = () => {
    props.navigation.navigate('LogIn');
  };

  const signinAction = (user: RegisterUserDTO) => {
    props.registerAction(user);
  };

  return (
    <View style={styles.background}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
      {(props.login_pending || props.register_pending) && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.mainColorLight} />
        </View>
      )}
      <SignInComponent
        handleSignIn={signinAction}
        redirectToLogin={loginRedirectAction}
      />
    </View>
  );
}

function mapStateToProps(state: AppStore.states) {
  return {
    user: state.auth.user,
    login_pending: state.auth.login_pending,
    register_pending: state.auth.register_pending,
    register_error: state.auth.register_error
  };
}

const dispatchToProps = {
  registerAction: authActions.registerAction
};

export default reduxContainer(
  SignInContainer,
  mapStateToProps,
  dispatchToProps
);
