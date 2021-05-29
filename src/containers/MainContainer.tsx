import React from 'react';
import { LogInContainer, SignInContainer } from './auth';
import { PetDetailsContainer } from './details';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerContainer from './DrawerContainer';

const Stack = createStackNavigator();

function MainContainer(props: any) {
  const isLogged = false;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName={isLogged ? 'Home' : 'LogIn'}>
      <Stack.Screen name="LogIn" component={LogInContainer} />
      <Stack.Screen name="SignIn" component={SignInContainer} />
      <Stack.Screen name="Home" component={DrawerContainer} />
      <Stack.Screen name="Details" component={PetDetailsContainer} />
    </Stack.Navigator>
  );
}

export default MainContainer;
