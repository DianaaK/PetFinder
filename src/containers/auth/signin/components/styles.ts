import { StyleSheet } from 'react-native';
import { colors, statusBarHeight } from '../../../../styles';

export const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.mainColor
  },
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center'
  },
  content: {
    marginHorizontal: 30,
    flex: 2,
    display: 'flex',
    alignItems: 'center'
  },
  inputs: {
    marginVertical: 25
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center'
  }
});
