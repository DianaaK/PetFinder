import React from 'react';
import {BackHandler} from 'react-native';
import {Scene, Router, Stack, Overlay} from 'react-native-router-flux';
// import SplashScreen from 'react-native-splash-screen';
import {Router as RouterUtil} from '../utils';
import {initSceneReducer} from '../redux/rootReducer';
import {store} from '../redux/store';
import {LogInContainer, SignInContainer} from './auth';
import {HomeContainer} from './home';

class MainContainer extends React.Component {
  // isLogged = AuthUtil.isLogged();
  isLogged = false;

  componentDidMount() {
    // SplashScreen.hide();
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.onBackButtonPressed,
    );
  }

  onBackButtonPressed = () => {
    const state: any = store.getState();
    const scene = state.scene.scene.routeName;
    if (scene === 'menu' || scene === 'signIn') {
      BackHandler.exitApp();
    }
    return null;
  };

  render() {
    return (
      <Router createReducer={initSceneReducer}>
        <Overlay key="overlay">
          <Scene key="root">
            <Stack key="auth" hideNavBar={true} initial={!this.isLogged}>
              <Scene
                key="signIn"
                component={SignInContainer}
                hideNavBar={true}
                // direction="horizontal"
                // // transitionConfig={RouterUtil.transitionConfig}
              />
              <Scene
                key="logIn"
                component={LogInContainer}
                initial={!this.isLogged}
                hideNavBar={true}
                // direction="vertical"
                // transitionConfig={RouterUtil.transitionConfig}
              />
            </Stack>
            <Stack
              key="home"
              hideNavBar
              initial={this.isLogged}
              // transitionConfig={RouterUtil.transitionConfig}
            >
              <Scene
                component={HomeContainer}
                key="menu"
                hideNavBar
                initial={this.isLogged}
              />
            </Stack>
          </Scene>
        </Overlay>
      </Router>
    );
  }
}

export default MainContainer;
