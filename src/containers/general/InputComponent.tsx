import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleProp,
  ViewStyle
} from 'react-native';
import IconComponent from './IconComponent';
import { colors, fonts } from '../../styles';
import { DEVICE_WIDTH } from '../../styles/deviceHelper';

interface IProps {
  id: string;
  label: string;
  value: string;
  error?: boolean;
  success?: boolean;
  keyboardType?: any;
  theme: string;
  iconType: string;
  iconName: string;
  isSecure?: boolean;
  disabled?: boolean;
  changeHandler: (id: string, text: string) => any;
}

class InputComponent extends React.Component<IProps> {
  state = {
    showValue: !!this.props.isSecure
  };

  showPassHandler = () => {
    this.setState({
      showValue: !this.state.showValue
    });
  };

  changeHandler = (text: string) => {
    this.props.changeHandler(this.props.id, text);
  };

  render() {
    return (
      <View
        style={[
          styles.view as StyleProp<ViewStyle>,
          !this.props.error &&
            (this.props.theme === 'light'
              ? styles.borderViewLight
              : styles.borderViewDark),
          this.props.success && styles.success,
          this.props.error && styles.error
        ]}>
        <View style={styles.left as StyleProp<ViewStyle>}>
          <IconComponent
            style={
              this.props.theme === 'light'
                ? styles.lightInput
                : styles.darkInput
            }
            type={this.props.iconType}
            name={this.props.iconName}
          />
        </View>
        <View style={styles.right}>
          <TextInput
            style={[
              styles.input,
              this.props.theme === 'light'
                ? styles.lightInput
                : styles.darkInputText
            ]}
            value={this.props.value}
            editable={!this.props.disabled}
            underlineColorAndroid="transparent"
            placeholder={this.props.label}
            placeholderTextColor={
              this.props.theme === 'light' ? 'white' : 'black'
            }
            onChangeText={this.changeHandler}
            secureTextEntry={this.state.showValue}
            keyboardType={this.props.keyboardType}
            autoCapitalize={
              this.props.keyboardType === 'email-address' ? 'none' : 'sentences'
            }
          />
        </View>
        {this.props.isSecure && (
          <TouchableOpacity
            style={styles.showPassButton as StyleProp<ViewStyle>}
            onPress={this.showPassHandler}>
            <IconComponent
              type="Ionicons"
              name={this.state.showValue ? 'md-eye' : 'md-eye-off'}
              style={
                this.props.theme === 'light'
                  ? styles.lightInput
                  : styles.darkInput
              }
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = {
  view: {
    height: 50,
    width: DEVICE_WIDTH - 60,
    marginTop: 8,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  borderViewLight: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255, 255, 255, 0.5)'
  },
  borderViewDark: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.itemBorderBottom
  },
  left: {
    flex: 1,
    paddingRight: 5,
    alignItems: 'center'
  },
  right: {
    flex: 8
  },
  input: {
    width: '100%',
    height: '100%',
    fontFamily: fonts.mainFont,
    fontSize: 16,
    color: colors.mainColor
  },
  lightInput: {
    color: 'white'
  },
  darkInput: {
    color: colors.secondColor
  },
  darkInputText: {
    color: colors.mainColor
  },
  success: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.authInputSuccess
  },
  error: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.authInputError
  },
  showPassButton: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    height: 40,
    width: 40
  }
};

export default InputComponent;
