import React from 'react';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, Image, Button, TouchableHighlight, TouchableOpacity, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Audio } from 'expo-av';

const screen = Dimensions.get("screen");
const screenWidth = screen.width;
const screenHeight = screen.height;
const screenRatio = screenWidth/screenHeight;

const color1 = '#686868';
const color2 = '#FFFFFF';
const color3 = '#000000';

let notesIndex = [];
const notesDirectory = [require('../assets/Note1.mp3'), require('../assets/Note2.mp3'),
    require('../assets/Note3.mp3'), require('../assets/Note4.mp3')];

const buttonsYOffset = screenHeight * -230/844;

let noteNum = 0;
let levelRetrieved = 1;

export default function GameScreen({ navigation: { goBack }, navigation }){
    const [level, setLevel] = useState(1);

    function increaseLevel() {
        setLevel(level+1);
    }

    function resetLevel() {
        setLevel(level - level + 1);
    }

    function getLevel() {
        return level;
    }

    async function playReplicate(noteKey) {
        let source = notesDirectory[noteKey];
        const { sound } = await Audio.Sound.createAsync(source);
        setSound(sound);
        await sound.playAsync();
    }

    async function sleepNotAwait(ms) {
        await sleep(ms);
    }

    async function playCorrect() {
        const { sound } = await Audio.Sound.createAsync(require('../assets/CorrectSound.mp3'));
        setSound(sound);
        await sound.playAsync();
    }

    async function playWrong() {
        const { sound } = await Audio.Sound.createAsync(require('../assets/WrongSound.mp3'));
        setSound(sound);
        await sound.playAsync();
    }
    
    const [sound, setSound] = React.useState();

    function checkNotes(noteKey) {
        levelRetrieved = getLevel();
        if (notesIndex.length != levelRetrieved) {
            return;
        }
        playReplicate(noteKey);
        sleepNotAwait(5000);
        noteNum++;
        if (noteKey != notesIndex[noteNum - 1]) {
            playWrong();
            notesIndex = [];
            resetLevel();
            noteNum = 0;
            navigation.navigate('Score', {
                levelRetrieved: levelRetrieved
            });
            levelRetrieved = 1;
        }
        else if (noteNum == notesIndex.length) {
            playCorrect();
            increaseLevel();
            noteNum = 0;
        }
    }

    async function playClick() {
        const { sound } = await Audio.Sound.createAsync(require('../assets/ClickSound.mp3'));
        setSound(sound);
        await sound.playAsync();
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function randNote(){
        let f_randInt = Math.floor(Math.random() * 4);
        notesIndex.push(f_randInt);
        console.log(notesIndex);
    }

    async function playNote() {
        if (notesIndex.length < level) {
            randNote();
            for (let i = 0; i < notesIndex.length; i++) {
                if (i == 0) {
                    let source = notesDirectory[notesIndex[i]];
                    const { sound } = await Audio.Sound.createAsync(source);
                    setSound(sound);
                    await sound.playAsync();
                }
                else {
                    await sleep(750);
                    let source = notesDirectory[notesIndex[i]];
                    const { sound } = await Audio.Sound.createAsync(source);
                    setSound(sound);
                    await sound.playAsync();
                }
            }
        }
    }

    function goToHome() {
        playClick();
        Alert.alert('Confirm request?', 'Your progress will be lost.', [
                {text: 'Yes', onPress: () => resetGame()},
                {text: 'No', onPress: () => playClick()}
            ]);
    }

    function resetGame() {
        playClick();
        notesIndex = [];
        resetLevel();
        noteNum = 0;
        navigation.goBack('Game');
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
                    <Text style={styles.text1}>Level {level}</Text>
                </View>

                <TouchableOpacity onPress = {() => playNote()} style={styles.logoContainer}>
                    <Image
                        source = {require('../assets/SoundLogo.png')}
                        style = {styles.logo}
                    />
                </TouchableOpacity>

                <View style={styles.container2}>
                    <TouchableHighlight onPress = {() => checkNotes(0)} underlayColor={ 'transparent' }>
                    <View style={styles.button1}>
                        <Text style={styles.text2}>1</Text>
                    </View>
                    </TouchableHighlight>
                </View>

                <View style={styles.container3}>
                    <TouchableHighlight onPress = {() => checkNotes(1)} underlayColor={ 'transparent' }>
                    <View style={styles.button2}>
                        <Text style={styles.text2}>2</Text>
                    </View>
                    </TouchableHighlight>
                </View>

                <View style={styles.container4}>
                    <TouchableHighlight onPress = {() => checkNotes(2)} underlayColor={ 'transparent' }>
                    <View style={styles.button3}>
                        <Text style={styles.text2}>3</Text>
                    </View>
                    </TouchableHighlight>
                </View>

                <View style={styles.container5}>
                    <TouchableHighlight onPress = {() => checkNotes(3)} underlayColor={ 'transparent' }>
                    <View style={styles.button4}>
                        <Text style={styles.text2}>4</Text>
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
    logoContainer: {
        top: screenHeight * 45/844,
        alignItems: 'center'
    },
    logo: {
        height: screenHeight * 0.08,
        width: screenWidth * 0.24,
    },
    container1: {
        alignItems: 'center',
        top: screenHeight * 30/844,
    },
    container2: {
        left: screenWidth * 10/390,
        top: screenHeight * 300/844 + buttonsYOffset,
    },
    container3: {
        left: screenWidth * 200/390,
        top: screenHeight * 50/844 + buttonsYOffset
    },
    container4: {
        left: screenWidth * 10/390,
        top: screenHeight * 60/844 + buttonsYOffset
    },
    container5: {
        left: screenWidth * 200/390,
        top: screenHeight * -190/844 + buttonsYOffset
    },
    button1:{
        width: screenWidth * 180/390,
        height: screenHeight * 250/844,
        backgroundColor: color1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        opacity: 0.5

    },
    button2:{
        width: screenWidth * 180/390,
        height: screenHeight * 250/844,
        backgroundColor: color1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        opacity: 0.5
    },
    button3:{
        width: screenWidth * 180/390,
        height: screenHeight * 250/844,
        backgroundColor: color1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        opacity: 0.5
    },
    button4:{
        width: screenWidth * 180/390,
        height: screenHeight * 250/844,
        backgroundColor: color1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        opacity: 0.5
        
    },
    text1: {
        color: color2,
        fontWeight: 'bold',
        fontSize: 80,
        alignItems: 'center',
        fontFamily: 'UbuntuBold'
    },
    text2: {
        color: color2,
        fontWeight: 'bold',
        fontSize: 100,
        fontFamily: 'Righteous'
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