import React from 'react';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, Image, Button, TouchableHighlight, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Audio } from 'expo-av';

const screen = Dimensions.get("screen");
const screenWidth = screen.width;
const screenHeight = screen.height;
const screenRatio = screenWidth/screenHeight;

const color1 = '#000000';

export default function ScoreScreen({ navigation, route }){
  
    let noteNum = 0;
    let levelRetrieved = route.params.levelRetrieved;

    function goToHome() {
        playClick();
        navigation.navigate('Home', {
            score: levelRetrieved
        });
        levelRetrieved = undefined;
    }
    const [sound, setSound] = React.useState();
    async function playClick() {
        const { sound } = await Audio.Sound.createAsync(require('../assets/ClickSound.mp3'));
        setSound(sound);
        await sound.playAsync();
    }
    function goToGame() {
        playClick();
        navigation.goBack();
    }
    return (
        <React.Fragment>
        <Text style={styles.text1}>GAME</Text>
        <Text style={styles.text2}>OVER</Text>
        <Text style={styles.text3}>Score</Text>
        <Text style={styles.text4}>Level {levelRetrieved}</Text>

        <TouchableOpacity onPress = {() => goToGame()} style={styles.container1}>
            <Image 
                source={require('../assets/RetryLogo.png')}
                style={styles.button1}
            />
        </TouchableOpacity>

        <TouchableOpacity onPress = {() => goToHome()} style={styles.container2}>
            <Image 
                source={require('../assets/HomeLogo.png')}
                style={styles.button2}
            />
        </TouchableOpacity>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
  container1: {
      alignItems: 'center',
      top: screenHeight * 100/390,
      left: screenRatio * 100,
      borderRadius: 60,
      width: screenRatio * 250,
      height: screenRatio * 250,
  },
  container2: {
      alignItems: 'center',
      top: screenHeight * 46/390,
      left: screenRatio * 500,
      borderRadius: 60,
      width: screenRatio * 250,
      height: screenRatio * 250,
  },
  button1: {
      width: screenRatio * 250,
      height: screenRatio * 250,
      //backgroundColor: color1,
      // alignItems: 'center',
      // justifyContent: 'center',
      //borderRadius: 40,
      //opacity: 0.5
  },
  button2: {
      width: screenRatio * 250,
      height: screenRatio * 250,
      //backgroundColor: color1,
      //alignItems: 'center',
      //justifyContent: 'center',
      //borderRadius: 40,
      //opacity: 0.5
  },

  text1: {
      color: color1,
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 90,
      top: 100,
      fontFamily: 'Righteous'
  },
  text2: {
      color: color1,
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 90,
      top: 80,
      fontFamily: 'Righteous'
  },
  text3: {
      color: color1,
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 40,
      top: 110,
      fontFamily: 'UbuntuBold'
  },
  text4: {
      color: color1,
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 60,
      top: 120,
      fontFamily: 'UbuntuBold'
  }
});