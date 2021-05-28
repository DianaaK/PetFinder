import React from 'react';
import {View, StatusBar} from 'react-native';
import {styles} from './components/styles';
import LogInComponent from './components/LogInComponent';
import reduxContainer from '../../../redux/reduxContainer';

class LogInContainer extends React.Component {
  shouldComponentUpdate(nextProps: any) {
    return nextProps.currentScene.routeName === 'logIn';
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
        <LogInComponent />
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

export default reduxContainer(LogInContainer, mapStateToProps, dispatchToProps);
