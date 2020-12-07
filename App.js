import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MovieListScreen from './MovieListScreen';
import MovieDetailsScreen from './MovieDetailsScreen';
import MovieVideoScreen from './MovieVideoScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Movies List"
          component={MovieListScreen}></Stack.Screen>
        <Stack.Screen
          name="Movie Details"
          component={MovieDetailsScreen}></Stack.Screen>
        <Stack.Screen name="Video" component={MovieVideoScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
