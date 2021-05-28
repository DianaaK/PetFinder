import React from 'react';
import {View, StatusBar} from 'react-native';
import {styles} from './components/styles';
import SignInComponent from './components/SignInComponent';
import reduxContainer from '../../../redux/reduxContainer';

class SignInContainer extends React.Component {
  shouldComponentUpdate(nextProps: any) {
    return (
      nextProps.currentScene.routeName === undefined ||
      nextProps.currentScene.routeName === 'signIn'
    );
  }

  componentDidMount() {
    // Router.delayer(this.props.getAppDataAction);
  }

  loginAction = (email: string, password: string) => {
    // this.props.loginAction(email, password, this.props.deviceId);
  };

  render() {
    return (
      <View style={styles.background}>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent
        />
        <SignInComponent />
      </View>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    currentScene: state.scene.scene,
  };
}

const dispatchToProps = {};

export default reduxContainer(
  SignInContainer,
  mapStateToProps,
  dispatchToProps,
);
