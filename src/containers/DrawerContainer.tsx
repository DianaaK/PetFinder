import React from 'react';
import { HomeContainer } from './home';
import { ProfileContainer } from './profile';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function DrawerContainer(props: any) {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <ProfileContainer {...props} />}>
      <Drawer.Screen name="List" component={HomeContainer} />
    </Drawer.Navigator>
  );
}

export default DrawerContainer;
