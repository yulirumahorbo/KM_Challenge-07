import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NativeBaseProvider} from 'native-base';

//screens
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import Chat from './src/screens/Chat';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login Screen"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login Screen" component={Login} />
          <Stack.Screen name="Register Screen" component={Register} />
          <Stack.Screen name="Home Screen" component={Home} />
          <Stack.Screen name="Chat Screen" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
