import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import Diet from './Diet';
import List from './List';
import Workout from './Workout';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconPath;

            if (route.name === 'Diet') {
              iconPath = require('./images/diet.png');
            } else if (route.name === 'List') {
              iconPath = require('./images/list.png');
            } else if (route.name === 'Workout') {
              iconPath = require('./images/workout.png');
            }

            return <Image source={iconPath} style={{ width: size, height: size }} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Diet" component={Diet} />
        <Tab.Screen name="List" component={List} />
        <Tab.Screen name="Workout" component={Workout} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
