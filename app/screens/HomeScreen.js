import React from 'react';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, Image, Button, TouchableHighlight, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Audio } from 'expo-av';

const screen = Dimensions.get('screen');
const screenWidth = screen.width;
const screenHeight = screen.height;
const screenRatio = screenWidth/screenHeight;

const color1 = '#686868';
const color2 = '#FFFFFF';

let tempScores = [];
let score;

function evalScore() {
  for (let i = 0; i < tempScores.length; i++) {
    if (tempScores[i] == score) {
      return;
    }
  }
  tempScores.push(score);
}

export default function HomeScreen({ navigation, route }){
  try {
    score = route.params.score;
    evalScore();
  }
  catch (e) {
  }
  console.log(tempScores);
  const [sound, setSound] = React.useState();
  let noteNum = 0;
  const onPress = () => console.log(noteNum++); //Some kind of events
  async function playClick() {
    const { sound } = await Audio.Sound.createAsync(require('../assets/ClickSound.mp3'));
    setSound(sound);
    await sound.playAsync();
  }
  function sendScores() {
    playClick();
    let tempTempScores = tempScores;
    tempScores = [];
    navigation.navigate('Leader', {
      scores: tempTempScores
    });
  }
  function goToGame() {
    playClick();
    navigation.navigate('Game');
  }
  function goToTutorial() {
    playClick();
    navigation.navigate('Tutorial');
  }
  function goToLoading() {
    playClick();
    navigation.goBack();
  }
  return (
    <React.Fragment>
      <View style={styles.background}>
        <Image
          source = {require('../assets/Logo2.png')}
          style = {styles.logo}>
        </Image>
        <View style={styles.container1}>
          <TouchableHighlight onPress = {() => goToGame()} underlayColor={ 'transparent' }>
              <View style={styles.button1}>
                <Text style={styles.text1}>▶</Text>
              </View>
          </TouchableHighlight>
        </View>
        
        <View style={styles.container2}>
          <TouchableHighlight onPress = {() => sendScores()} underlayColor={ 'transparent' }>
            <View style={styles.button2}>
              <Text style={styles.text2}>Top Scores</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.container3}>
          <TouchableHighlight onPress = {() => goToTutorial()} underlayColor={ 'transparent' }>
            <View style={styles.button3}>
              <Text style={styles.text2}>Tutorial</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.container4}>
          <TouchableHighlight onPress = {() => goToLoading()} underlayColor={ 'transparent' }>
            <View style={styles.button4}>
              <Text style={styles.text2}>Exit</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  background: {
      backgroundColor: '#000000',
      flex: 1
  },
  logo: {
    width: screenRatio * 1000,
    height: screenRatio * 1000,
    top: (screenHeight/2) - (screenRatio * 1050),
    left: (screenWidth/2) - (screenRatio * 1000/2)
  },
  container1: {
      alignItems: 'center',
      top: (screenHeight/2) - (screenRatio * 1250)
  },
  container2: {
      alignItems: 'center',
      top: (screenHeight/2) - (screenRatio * 1150)
  },
  container3: {
      alignItems: 'center',
      top: (screenHeight/2) - (screenRatio * 1100)
  },
  container4: {
      alignItems: 'center',
      top: (screenHeight/2) - (screenRatio * 1050)
  },

  button1:{
    width: screenRatio * 250,
    height: screenRatio * 250,
    backgroundColor: color1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    opacity: 1
  },
  button2:{
    width: screenWidth * 0.6,
    height: screenHeight * 0.1,
    backgroundColor: color1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    opacity: 0.7
  },
  button3:{
    width: screenWidth * 0.5,
    height: screenHeight * 0.1,
    backgroundColor: color1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    opacity: 0.7
  },
  button4:{
    width: screenWidth * 0.4,
    height: screenHeight * 0.1,
    backgroundColor: color1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    opacity: 0.7
  },
  text1: {
    color: color2,
    fontWeight: 'bold',
    fontSize: 100,
  },
  text2: {
    color: color2,
    fontWeight: 'bold',
    fontSize: 40,
    fontFamily: 'UbuntuBold'
  }
});