import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles';

export const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.mainColor
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  content: {
    marginHorizontal: 30,
    display: 'flex',
    alignItems: 'center'
  },
  inputs: {
    marginVertical: 25
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
