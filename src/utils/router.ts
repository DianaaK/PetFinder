import {Actions, ActionConst} from 'react-native-router-flux';
import {CardStyleInterpolators} from 'react-navigation-stack';

class Router {
  checkIfExists(screenName: any) {
    const state: any = Actions.state;
    if (
      state &&
      state.routes &&
      typeof state.index === 'number' &&
      state.routes[state.index]
    ) {
      const scene = state.routes[state.index];
      if (
        scene &&
        scene.routes &&
        scene.routes.length &&
        scene.routeName === 'root'
      ) {
        const screen = scene.routes[0];
        const index = screen.routes.findIndex(
          (route: any) => route.routeName === screenName,
        );
        if (index > -1) return true;
      }
    }
    return false;
  }

  push(screen: any, props?: any, force = false) {
    if (screen && Actions.currentScene === screen) {
      this.refresh(props);
    } else if (screen && Actions.currentScene !== screen) {
      if (this.checkIfExists(screen) && !force) {
        Actions.popTo(screen);
        props && setTimeout(() => Actions.refresh(props), 0);
      } else {
        Actions[screen](props);
      }
    }
  }

  replace(screen: any, props: any) {
    if (Actions.currentScene !== screen) {
      Actions.replace(screen, {...props, type: ActionConst.REPLACE});
    }
  }

  reset(screen: any, props: any) {
    if (Actions.currentScene !== screen) {
      Actions.reset(screen, {...props, type: ActionConst.RESET});
    }
  }

  refresh(props: any) {
    Actions.refresh(props);
  }

  pop() {
    Actions.pop();
  }

  transitionConfig = () => {
    return {
      screenInterpolator: (props: any) => {
        if (!props.scenes || !props.scenes.length) return;
        const scene = props.scenes[props.scenes.length - 1];
        if (!scene || !scene.route || !scene.route.params) return;
        switch (scene.route.params.direction) {
          case 'vertical':
            return {
              cardStyleInterpolator:
                CardStyleInterpolators.forRevealFromBottomAndroid,
              gestureDirection: 'vertical',
            };
          case 'fade':
            return {
              cardStyleInterpolator:
                CardStyleInterpolators.forFadeFromBottomAndroid,
            };
          case 'none':
            return {
              cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
            };
        }
      },
    };
  };

  delayer(fs: any, timer = 250) {
    setTimeout(fs, timer);
  }
}

export default new Router();
