import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import MainContainer from './src/containers/MainContainer';
import { persistor, store } from './src/redux/store';
import OneSignal from 'react-native-onesignal';

const App = () => {
  const navigationRef: any = React.useRef(null);

  useEffect(() => {
    OneSignal.setAppId('75c10a26-b37a-4efa-9b72-fc70b51ca8a5');
    OneSignal.setNotificationOpenedHandler(onOpened);

    return () => {
      OneSignal.clearHandlers();
    };
  }, []);

  const onOpened = (openResult: any) => {
    console.log('openResult', openResult.notification);
    const reportId = openResult.notification.additionalData.data;
    navigationRef.current?.navigate('Details', {
      itemId: reportId,
      canNavigate: true
    });
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
          <PaperProvider>
            <MainContainer />
            <Toast ref={(ref) => Toast.setRef(ref)} />
          </PaperProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
