//import liraries
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/onboarding/SplashScreen';
import LoginScreen from '../screens/onboarding/LoginScreen';
import VerificationScreen from '../screens/onboarding/VerificationScreen';
import SignUpScreen from '../screens/onboarding/SignUpScreen';
import ForgetPass from '../screens/onboarding/ForgetPass';
import ForgotVerifyScreen from '../screens/onboarding/ForgotVerifyScreen';
import ResetPass from '../screens/onboarding/ResetPass';
import LoginOption from '../screens/onboarding/LoginOption';

const Stack = createNativeStackNavigator();

const screens = [
  {
    name: 'SplashScreen',
    component: SplashScreen,
  },
  {
    name: 'LoginScreen',
    component: LoginScreen,
  },
  {
    name: 'LoginOption',
    component: LoginOption,
  },
  {
    name: 'SignUpScreen',
    component: SignUpScreen,
  },
  {
    name: 'ResetPass',
    component: ResetPass,
  },
  {
    name: 'ForgotVerifyScreen',
    component: ForgotVerifyScreen,
  },
  {
    name: 'VerificationScreen',
    component: VerificationScreen,
  },
  {
    name: 'ForgetPass',
    component: ForgetPass,
  },
];

class Router extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {screens.map((item, index) => (
            <Stack.Screen
              key={index}
              name={item.name}
              component={item.component}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Router;
