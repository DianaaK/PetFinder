import { StyleSheet } from 'react-native';
import { DEVICE_WIDTH, fonts } from '.';
import { colors } from './colors';

export const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray2,
    padding: 20
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  questionText: {
    fontSize: 16,
    color: colors.mainColor,
    margin: 8,
    marginBottom: 3
  },
  input: {
    color: colors.mainColor2,
    borderBottomColor: colors.mainColor3,
    borderBottomWidth: 1,
    width: '100%',
    marginBottom: 10,
    marginHorizontal: 8,
    padding: 0,
    fontSize: 16,
    fontFamily: fonts.mainFont
  },
  formButton: {
    marginTop: 30,
    height: 45,
    padding: 5,
    width: DEVICE_WIDTH / 1.3,
    backgroundColor: colors.mainColorLight3,
    borderRadius: 10,
    borderColor: colors.mainColorLight2,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  formButtonText: {
    fontSize: 14,
    color: colors.mainColor2,
    textTransform: 'uppercase'
  },
  saveButtonContainer: {
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    borderTopColor: colors.mainColorLight,
    borderTopWidth: 1
  },
  saveButton: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  saveButtonText: {
    fontSize: 24,
    fontFamily: fonts.secondFont,
    color: colors.mainColor2,
    marginBottom: 5
  },
  icon: {
    fontSize: 22,
    marginHorizontal: 8,
    color: colors.mainColor2
  }
});
