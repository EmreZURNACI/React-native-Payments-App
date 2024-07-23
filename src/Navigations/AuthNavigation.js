import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SignIn, SignUp } from '../Screens/Index'

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='login' component={SignIn} />
      <Stack.Screen name='register' component={SignUp} />
    </Stack.Navigator>
  )
}

export default AuthNavigation