import React from 'react';
import { LogInContainer, SignInContainer } from './auth';
import { AddPetContainer, PetDetailsContainer } from './details';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerContainer from './DrawerContainer';
import MapContainer from './map/MapContainer';

const Stack = createStackNavigator();

function MainContainer(props: any) {
  const isLogged = true;

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
        initialParams={{ forUser: false, forFavorites: false }}
      />
      <Stack.Screen name="Details" component={PetDetailsContainer} />
      <Stack.Screen name="Add" component={AddPetContainer} />
      <Stack.Screen name="GeneralMap" component={MapContainer} />
    </Stack.Navigator>
  );
}

export default MainContainer;
