import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Home from './components/Home';
import Help from './components/Help';
import Results from './components/Results';
import Login from './components/Login';
import SignUp from './components/SignUp';
import BlackScreen from './components/BlackScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="Results" component={Results} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        {/* <Stack.Screen 
          name="BlackScreen" 
          component={BlackScreen} 
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


