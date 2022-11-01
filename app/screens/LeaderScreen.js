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

let topScoresString = [];
let topScores = [15, 11, 7, 5, 3];

const color1 = '#686868';
const color2 = '#FFFFFF';
const color3 = '#000000';

const barHeight = screenHeight * 70/844;

function topFiveScores(f_scores){
    for (let i = 0; i < f_scores.length; i++) {
        for (let j = 0; j < topScores.length; j++) {
            if (f_scores[i] > topScores[j]) {
                for (let k = f_scores.length-2; k >= j ; k-- ) {
                    topScores[k+1] = topScores[k];
                }
                topScores[j] = f_scores[i];
                j = topScores.length;
            }
        }
    }
}

function topFiveScoresString() {
    for (let i = 0; i < topScores.length; i++) {
        topScoresString.push(i + 1 + ': Level ' + topScores[i]);
    }
}

let scoresRetrieved;

export default function LeaderScreen({ navigation, route }) {
    try {
        scoresRetrieved = route.params.scores;
        topFiveScores(scoresRetrieved);
    }
    catch (e) {
    }
    topFiveScoresString();
    console.log(topScores)
    console.log(topScoresString)
    const [sound, setSound] = React.useState();
    async function playClick() {
        const { sound } = await Audio.Sound.createAsync(require('../assets/ClickSound.mp3'));
        setSound(sound);
        await sound.playAsync();
    }
    function goToHome() {
        playClick();
        navigation.goBack();
    }
    return (
        <React.Fragment>
            <View style={styles.background}>
                    <View style={styles.backButton}>
                        <TouchableHighlight onPress = {() => goToHome()} underlayColor={ 'transparent' }>
                            <Image 
                                source={require('../assets/BackLogo.png')}
                                style={styles.image1}
                            />
                        </TouchableHighlight>
                    </View>
                    <View style={styles.container1}>
                        <Text style={styles.text1}>Top</Text>
                    </View>
                    <View style={styles.container2}>
                        <Text style={styles.text1}>Scores</Text>
                    </View>

                    <View style={styles.container3}>
                        <Text style={styles.text2}>{topScoresString[0]}</Text>
                    </View>

                    <View style={styles.container4}>
                        <Text style={styles.text2}>{topScoresString[1]}</Text>
                    </View>

                    <View style={styles.container5}>
                        <Text style={styles.text2}>{topScoresString[2]}</Text>
                    </View>

                    <View style={styles.container6}>
                        <Text style={styles.text2}>{topScoresString[3]}</Text>
                    </View>

                    <View style={styles.container7}>
                        <Text style={styles.text2}>{topScoresString[4]}</Text>
                    </View>
            </View>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: color3
    },
    container1: {
        alignItems: 'center',
        top: screenHeight * 40/844
    },
    container2: {
        alignItems: 'center',
        top: screenHeight * 10/844
    },
    container3: {
        width: screenWidth * 350/390,
        height: barHeight,
        backgroundColor: color1,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        top: screenHeight * 30/844
    },
    container4: {
        width: screenWidth * 350/390,
        height: barHeight,
        backgroundColor: color1,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        top: screenHeight * 45/844
    },
    container5: {
        width: screenWidth * 350/390,
        height: barHeight,
        backgroundColor: color1,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        top: screenHeight * 60/844
    },
    container6: {
        width: screenWidth * 350/390,
        height: barHeight,
        backgroundColor: color1,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        top: screenHeight * 75/844
    },
    container7: {
        width: screenWidth * 350/390,
        height: barHeight,
        backgroundColor: color1,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        top: screenHeight * 90/844
    },
    text1: {
        color: color2,
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 90,
        fontFamily: 'UbuntuBold'
    },
    text2: {
        color: color2,
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 55,
        fontFamily: 'Righteous'
    },
    image1: {
        width: screenRatio * 200,
        height: screenRatio * 200
    },
    backButton: {
        top: screenHeight * 30/844,
        left: screenWidth * 20/390,
        width: screenRatio * 110,
        height: screenRatio * 110,
        backgroundColor: color2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 45
    },
    image1: {
    width: screenRatio * 150,
    height: screenRatio * 150,
    }
});