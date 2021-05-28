import {StatusBar, Platform, Dimensions, PixelRatio} from 'react-native';
import {colors} from './colors';

export const DEVICE_HEIGHT = Dimensions.get('screen').height;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const DEVICE_WIDTH = Dimensions.get('window').width;

const platform = Platform.OS;
export const isIOS = platform === 'ios';
export const isAndroid = platform === 'android';

const iPhoneXHeight = 812;
const iPhoneXRHeight = 896;
export const isIphoneX =
  isIOS &&
  (DEVICE_HEIGHT === iPhoneXHeight ||
    DEVICE_WIDTH === iPhoneXHeight ||
    DEVICE_HEIGHT === iPhoneXRHeight ||
    DEVICE_WIDTH === iPhoneXRHeight);
export const statusBarHeight = StatusBar.currentHeight || 0;

const hasNavigationBar = isAndroid && DEVICE_HEIGHT !== WINDOW_HEIGHT;
export const navigationBarHeight = hasNavigationBar
  ? DEVICE_HEIGHT - WINDOW_HEIGHT - statusBarHeight
  : 0;

export const navbarStyles = {
  height: isIOS ? (isIphoneX ? 22 + 64 : 64) : 56 + statusBarHeight,
  paddingTop: isIOS ? (isIphoneX ? 30 : 15) : statusBarHeight,
  paddingTopAndroid: isIOS ? (isIphoneX ? 30 : 15) : 0,
  borderBottomWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
  borderBottomColor: colors.itemBorderBottom,
};

export const maxHeightScreenWithNavbar = DEVICE_HEIGHT - navbarStyles.height;

export const tabbarStyles = {
  height: isIphoneX ? 56 + 34 : 56,
  borderTopWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
  borderTopColor: colors.itemBorderBottom,
  paddingBottom: isIphoneX ? 34 : 0,
};

export const backIconName = isIOS ? 'ios-chevron-back' : 'md-arrow-back';
export const forwardIconName = isIOS
  ? 'ios-chevron-forward'
  : 'md-arrow-forward';
