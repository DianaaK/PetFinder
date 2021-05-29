import React, { useEffect } from 'react';
import { HomeContainer } from './home';
import { ProfileContainer } from './profile';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { BackHandler } from 'react-native';
import { useRoute } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

function DrawerContainer(props: any) {
  const route = useRoute();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackButtonPressed);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackButtonPressed);
    };
  }, []);

  const onBackButtonPressed = () => {
    if (route.name === 'Home') {
      BackHandler.exitApp();
    }
    return null;
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => <ProfileContainer {...props} />}>
      <Drawer.Screen name="List" component={HomeContainer} />
    </Drawer.Navigator>
  );
}

export default DrawerContainer;
