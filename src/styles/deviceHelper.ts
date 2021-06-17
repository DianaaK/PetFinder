import { StatusBar, Platform, Dimensions, PixelRatio } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import { colors } from './colors';

export const DEVICE_HEIGHT = Dimensions.get('screen').height;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const DEVICE_WIDTH = Dimensions.get('window').width;

const platform = Platform.OS;
export const isIOS = platform === 'ios';
export const isAndroid = platform === 'android';

export const statusBarHeight = StatusBar.currentHeight || 0;
const windowMetrics: any = initialWindowMetrics?.insets || {};

const hasNavigationBar = isAndroid && DEVICE_HEIGHT !== WINDOW_HEIGHT;
export const navigationBarHeight = hasNavigationBar
  ? DEVICE_HEIGHT - WINDOW_HEIGHT - statusBarHeight
  : 0;

const generalBorderWidth = 1 / PixelRatio.getPixelSizeForLayoutSize(1);
const generalBorderColor = colors.itemBorderBottom;

export const navbarStyles = {
  height: isIOS ? 46 + windowMetrics.top : 56 + statusBarHeight,
  paddingTop: (isIOS ? windowMetrics.top : statusBarHeight) || 0,
  borderBottomWidth: generalBorderWidth,
  borderBottomColor: generalBorderColor
};

export const maxHeightScreenWithNavbar = DEVICE_HEIGHT - navbarStyles.height;

export const tabbarStyles = {
  height: 56 + (isIOS ? windowMetrics.bottom : 0),
  borderTopWidth: generalBorderWidth,
  borderTopColor: generalBorderColor,
  paddingBottom: isIOS ? windowMetrics.bottom : 0
};

export const doneButtonHeight = 56 + (isIOS ? windowMetrics.bottom / 2 : 0);

export const backIconName = isIOS ? 'ios-chevron-back' : 'md-arrow-back';
export const forwardIconName = isIOS
  ? 'ios-chevron-forward'
  : 'md-arrow-forward';
