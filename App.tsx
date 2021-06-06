import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
import { Provider as PaperProvider } from 'react-native-paper';
import MainContainer from './src/containers/MainContainer';
import { store } from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <NavigationContainer>
        <PaperProvider>
          <MainContainer />
        </PaperProvider>
      </NavigationContainer>
      {/* </PersistGate> */}
    </Provider>
  );
};

export default App;
