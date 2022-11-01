import React from 'react';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, Image, Button, TouchableHighlight, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Audio } from 'expo-av';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const screenRatio = screenWidth/screenHeight;
const imageWidth =  800 * screenRatio;
const imageHeight = 800 * screenRatio;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#000000',
    flex: 1
  },
  text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
    top: 200,
    alignItems: 'center',
    fontFamily: 'Righteous',
    alignSelf: 'center'
  },
  logo: {
    width: imageWidth,
    height: imageHeight,
    top: (screenHeight/2) - (imageHeight/2),
    left: (screenWidth/2) - (imageWidth/2)
  },
});

export default function LoadingScreen({ navigation }) {
    const [sound, setSound] = React.useState();
    async function playClick() {
      const { sound } = await Audio.Sound.createAsync(require('../assets/ClickSound.mp3'));
      setSound(sound);
      await sound.playAsync();
    }
    const [showText, setshowText] = useState(true);
    useEffect(() => {
        const interval = setInterval(() => {
            setshowText((showText) => !showText)
        }, 750)
        return  () => {
            clearInterval(interval);
        }
    }, []);

    function goToHome() {
        playClick();
        navigation.navigate('Home');
    }
    return (
        <View style={styles.background}>
            <TouchableOpacity onPress = {() => goToHome()}>
                <Image
                    source = {require('../assets/Logo2.png')}
                    style = {styles.logo}
                />
            </TouchableOpacity>
            <Text style={
                [styles.text, {display: showText ? 'none' : 'flex'}
                ]}>Tap The Icon To Continue</Text>
        </View>
    );
}