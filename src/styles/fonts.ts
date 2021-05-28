import { Platform } from 'react-native';
import { isAndroid } from './deviceHelper';

export const fonts = {
  mainFont: isAndroid ? 'Montserrat-Regular' : 'Montserrat',
  secondFont: 'Quicksand-Regular',
  montserratBold: 'Montserrat-Bold',
  montserratMedium: 'Montserrat-Medium',
  montserratSemiBold: 'Montserrat-SemiBold'
};

export const Montserrat = Platform.select({
  ios: `Montserrat-Regular.ttf`,
  android: `file:///android_asset/fonts/Montserrat-Regular.ttf`
});
