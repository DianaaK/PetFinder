import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TextComponent, IconComponent} from '../../general';
// import {Router} from '../../../utils';
import {DEVICE_WIDTH} from '../../../styles/deviceHelper';

interface IProps {
  buttonHandler: () => any;
  textButton: string;
  type: string;
  gradient: Array<string>;
  iconType: string;
  iconName: string;
  pending: boolean;
}

const ButtonComponent = (props: IProps) => {
  const values = {
    gradientStart: {x: 0, y: 0},
    gradientEnd: {x: 1, y: 0},
    logInGradient: ['rgba(66, 230, 149, 1)', 'rgba(51, 197, 142, 1)'],
    signUpGradient: ['rgba(23, 234, 217, 1)', 'rgba(96, 120, 234, 1)'],
  };

  const buttonHandler = () => {
    if (props.buttonHandler) {
      props.buttonHandler();
    } else {
      // Router.push(props.type);
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={buttonHandler}
      activeOpacity={0.5}>
      <LinearGradient
        colors={props.gradient}
        start={values.gradientStart}
        end={values.gradientEnd}
        style={styles.linearGradient}
      />
      <View style={styles.iconButtonContainer}>
        <IconComponent
          type={props.iconType}
          name={props.iconName}
          style={styles.icon}
        />
      </View>
      <View style={styles.textButtonContainer}>
        {props.pending ? (
          <ActivityIndicator animating={true} color="white" size="large" />
        ) : (
          <TextComponent style={styles.textButton}>
            {props.textButton}
          </TextComponent>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    width: DEVICE_WIDTH - 80,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    borderRadius: 28,
    marginVertical: 10,
    opacity: 0.8,
    elevation: 3,
    backgroundColor: 'white',
  },
  iconButtonContainer: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  iconButton: {
    fontSize: 24,
    alignSelf: 'center',
  },
  textButtonContainer: {
    flex: 6,
    paddingRight: 20,
    justifyContent: 'center',
  },
  textButton: {
    textAlign: 'center',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  linearGradient: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    borderRadius: 24,
  },
  icon: {
    color: 'white',
  },
});

export default ButtonComponent;
