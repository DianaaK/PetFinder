import React from 'react';
import { ListContainer } from './list';
import { ProfileContainer } from './profile';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const DrawerContainer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <ProfileContainer {...props} />}>
      <Drawer.Screen name="List" component={ListContainer} />
    </Drawer.Navigator>
  );
};

export default DrawerContainer;
