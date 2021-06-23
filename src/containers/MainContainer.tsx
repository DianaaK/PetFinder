import React from 'react';
import { LogInContainer, SignInContainer } from './auth';
import { AddPetContainer, PetDetailsContainer } from './details';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerContainer from './DrawerContainer';
import { AuthUtil } from '../utils';
import { AddMarkerContainer, MapContainer } from './map';
import { ListType } from '../redux/types';
import { ChangePasswordContainer, UserContainer } from './profile';

const Stack = createStackNavigator();

function MainContainer() {
  const isLogged = AuthUtil.isLogged();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName={isLogged ? 'List' : 'LogIn'}>
      <Stack.Screen name="LogIn" component={LogInContainer} />
      <Stack.Screen name="SignIn" component={SignInContainer} />
      <Stack.Screen
        name="List"
        component={DrawerContainer}
        initialParams={{ listType: ListType.GENERAL }}
      />
      <Stack.Screen name="Details" component={PetDetailsContainer} />
      <Stack.Screen name="GeneralMap" component={MapContainer} />
      <Stack.Screen name="Add" component={AddPetContainer} />
      <Stack.Screen name="AddMarkerMap" component={AddMarkerContainer} />
      <Stack.Screen name="Settings" component={UserContainer} />
      <Stack.Screen name="Password" component={ChangePasswordContainer} />
    </Stack.Navigator>
  );
}

export default MainContainer;
