import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../../styles';

export const mapStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  },
  loadingContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center'
  },
  icon: {
    fontSize: 20,
    color: 'white'
  },
  addressInputContainer: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 0,
    marginHorizontal: '10%',
    marginBottom: 10
  },
  addressInput: {
    backgroundColor: colors.mainColorLight,
    color: colors.mainColor,
    height: 50,
    padding: 5,
    fontFamily: fonts.mainFont,
    width: '90%'
  },
  sendAddressButton: {
    left: -4,
    width: 50,
    backgroundColor: colors.mainColorLight2,
    justifyContent: 'center'
  }
});
