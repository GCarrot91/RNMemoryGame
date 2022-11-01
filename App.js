//Importing all necessary items:
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import LoadingScreen from "./app/screens/LoadingScreen";
import HomeScreen from "./app/screens/HomeScreen";
import GameScreen from "./app/screens/GameScreen";
import LeaderScreen from "./app/screens/LeaderScreen";
import TutorialScreen from "./app/screens/TutorialScreen";
import ScoreScreen from "./app/screens/ScoreScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const loaded = useFonts({
    UbuntuRegular: require('./app/assets/Ubuntu-Regular.ttf'),
    UbuntuBold: require('./app/assets/Ubuntu-Bold.ttf'),
    Righteous: require('./app/assets/Righteous-Regular.ttf')
  })

  if (!loaded) {
    return null;
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions = {{headerShown: false}}>
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Game"
          component={GameScreen}
        />
        <Stack.Screen
          name="Leader"
          component={LeaderScreen}
        />
        <Stack.Screen
          name="Tutorial"
          component={TutorialScreen}
        />
        <Stack.Screen
          name="Score"
          component={ScoreScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};