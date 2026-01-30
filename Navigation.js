import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen';
import Add from './Add';
import CompleteHabitScreen from './CompleteHabitScreen';
import PointScreen from './PointScreen';
import Edit from './Edit';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Sustainable Habits' }}
        />

        <Stack.Screen
          name="AddHabit"
          component={Add}
          options={{ title: 'Add New Habit' }}
        />

        <Stack.Screen
          name="EditHabit"
          component={Edit}
          options={{ title: 'Edit Habit' }}
        />

        <Stack.Screen
          name="CompleteHabit"
          component={CompleteHabitScreen}
          options={{ title: 'Complete Habit' }}
        />

        <Stack.Screen
          name="Points"
          component={PointScreen}
          options={{ title: 'Total Points Collected' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
