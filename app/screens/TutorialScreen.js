import React from 'react';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, Image, Button, TouchableHighlight, ScrollView,TouchableOpacity } from 'react-native';
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
const color4 = '#808080';

const description1 = 'On each level, tap the sound icon first to play a series of 4 different possible notes.  The amount of notes in a series depends on the level.  An additional note will be added for each level.';
const description2 = 'Try replicating the series of notes using the provided buttons.  Please test out the buttons above to familiarize yourself with all the notes and their corresponding numbers.  (The lower the number, the lower the pitch; the higher the number, the higher the pitch).';
const description3 = 'If you replicate the notes incorrectly, it will end the game and show your score.  You can either play the game again or save your score & return to home screen. Note that retrying will remove your score from that round.'

const buttonsYOffset = screenHeight * -200/844;

const notesDirectory = [require('../assets/Note1.mp3'), require('../assets/Note2.mp3'),
    require('../assets/Note3.mp3'), require('../assets/Note4.mp3')];

export default function TutorialScreen( { navigation }){
    const [sound, setSound] = React.useState();
    async function playNote(noteKey) {
        let source = notesDirectory[noteKey];
        const { sound } = await Audio.Sound.createAsync(source);
        setSound(sound);
        await sound.playAsync();
    }
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
        <View style={styles.background}>
            <ScrollView contentContainerStyle={{paddingBottom: screenHeight * 200/844}}>
                <View style={styles.backButton}>
                    <TouchableHighlight onPress = {() => goToHome()} underlayColor={ 'transparent' }>
                        <Image 
                            source={require('../assets/BackLogo.png')}
                            style={styles.image1}
                        />
                    </TouchableHighlight>
                </View>
                <View style={styles.group1}>
                    <View style={styles.container1}>
                        <Text style={styles.text1}>Level 1</Text>
                    </View>

                    <TouchableOpacity style={styles.logoContainer}>
                        <Image
                            source = {require('../assets/SoundLogo.png')}
                            style = {styles.logo}
                        />
                    </TouchableOpacity>

                    <View style={styles.container2}>
                        <Text style={styles.text3}>{description1}</Text>
                    </View>

                    <View style={styles.line1}></View>
                </View>

                <View style={styles.group2}>
                    <View style={styles.container3}>
                        <TouchableHighlight onPress = {() => playNote(0)} underlayColor={ 'transparent' }>
                            <View style={styles.button1}>
                                <Text style={styles.text2}>1</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.container4}>
                        <TouchableHighlight onPress = {() => playNote(1)} underlayColor={ 'transparent' }>
                            <View style={styles.button2}>
                                <Text style={styles.text2}>2</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.container5}>
                        <TouchableHighlight onPress = {() => playNote(2)} underlayColor={ 'transparent' }>
                            <View style={styles.button3}>
                                <Text style={styles.text2}>3</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.container6}>
                        <TouchableHighlight onPress = {() => playNote(3)} underlayColor={ 'transparent' }>
                            <View style={styles.button4}>
                                <Text style={styles.text2}>4</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.line2}></View>

                    <View style={styles.container7}>
                        <Text style={styles.text3}>{description2}</Text>
                    </View>
                </View>

                <View style={styles.group3}>
                    <Text style={styles.text4}>GAME</Text>
                    <Text style={styles.text5}>OVER</Text>
                    <Text style={styles.text6}>Score</Text>
                    <Text style={styles.text7}>Level 5</Text>
                    <TouchableOpacity style={styles.container8}>
                        <Image 
                            source={require('../assets/RetryLogo.png')}
                            style={styles.button5}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.container9}>
                        <Image 
                            source={require('../assets/HomeLogo.png')}
                            style={styles.button6}
                        />
                    </TouchableOpacity>

                    <View style={styles.line3}></View>
                    <View style={styles.container10}>
                        <Text style={styles.text3}>{description3}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    background: {
        backgroundColor: color3,
        flex: 1
    },
    group1: {
      height: screenHeight * 0.51,
      width: screenWidth * 0.8,
      backgroundColor: color4,
      alignSelf: 'center',
      //justifyContent: 'center',
      borderRadius: 40,
      top: screenHeight * 50/844
    },
    /*  */ 
    container1: {
        alignItems: 'center',
        top: screenHeight * -40/844
    },
    text1: {
        color: color2,
        fontWeight: 'bold',
        fontSize: 80,
        top: 70,
        alignItems: 'center',
        fontFamily: 'Righteous'
    },
    /*  */ 
    logoContainer: {
        top: screenHeight * 40/844,
        alignItems: 'center'
    },
    logo: {
        height: screenHeight * 0.08,
        width: screenWidth * 0.24,
    },
    /*  */ 
    line1: {
        height: 3,
        width: screenWidth * 0.7,
        backgroundColor: color2,
        top: screenHeight * -100/844,
        alignSelf: 'center'
    },
    /*  */
    container2: {
        left: screenWidth * 10/390,
        top: screenHeight * 80/844,
    },
    text3: {
        color: color2,
        fontWeight: 'normal',
        fontSize: 20,
        fontFamily: 'UbuntuBold',
        paddingRight: 20,
        paddingLeft: 20,
    },

    group2: {
      height: screenHeight * 0.86,
      width: screenWidth * 0.8,
      backgroundColor: color4,
      alignSelf: 'center',
      //justifyContent: 'center',
      borderRadius: 40,
      top: screenHeight * 100/844
    },
    /*  */
    text2: {
        color: color2,
        fontWeight: 'bold',
        fontSize: 100,
        fontFamily: 'Righteous'
    },
    /*  */ 
    container3: {
        left: screenWidth * 14/390,
        top: screenHeight * 238/844 + buttonsYOffset
    },
    button1:{
        width: screenWidth * 135/390,
        height: screenHeight * 187/844,
        backgroundColor: color1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        opacity: 0.5,
    },
    /*  */ 
    container4: {
        left: screenWidth * 160/390,
        top: screenHeight * 50/844 + buttonsYOffset
    },
    button2:{
        width: screenWidth * 135/390,
        height: screenHeight * 187/844,
        backgroundColor: color1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        opacity: 0.5,
    },
    /*  */ 
    container5: {
        left: screenWidth * 15/390,
        top: screenHeight * 60/844 + buttonsYOffset
    },
    button3:{
        width: screenWidth * 135/390,
        height: screenHeight * 187/844,
        backgroundColor: color1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        opacity: 0.5
    },
    container6: {
        left: screenWidth * 160/390,
        top: screenHeight * -127/844 + buttonsYOffset
    },
    button4:{
        width: screenWidth * 135/390,
        height: screenHeight * 187/844,
        backgroundColor: color1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        opacity: 0.5
    },
    line2: {
        height: 3,
        width: screenWidth * 0.7,
        backgroundColor: color2,
        top: screenHeight * -300/844,
        alignSelf: 'center'
    },
    container7: {
        //left: screenWidth * 160/390,
        top: screenHeight * -280/844,
        left: screenWidth * 10/390
    },
    group3: {
      height: screenHeight * 0.91,
      width: screenWidth * 0.8,
      backgroundColor: color4,
      alignSelf: 'center',
      //justifyContent: 'center',
      borderRadius: 40,
      top: screenHeight * 150/844
    },
    text4: {
        color: color2,
        fontWeight: 'bold',
        fontSize: 80,
        top: 50,
        alignSelf: 'center',
        fontFamily: 'Righteous'
    },
    text5: {
        color: color2,
        fontWeight: 'bold',
        fontSize: 80,
        top: 30,
        alignSelf: 'center',
        fontFamily: 'Righteous'
    },
    text6: {
        color: color2,
        fontWeight: 'bold',
        fontSize: 30,
        top: 50,
        alignSelf: 'center',
        fontFamily: 'UbuntuBold'
    },
    text7: {
        color: color2,
        fontWeight: 'bold',
        fontSize: 60,
        top: 60,
        alignSelf: 'center',
        fontFamily: 'UbuntuBold'
    },
    container8: {
      width: screenRatio * 200,
      height: screenRatio * 200,
      borderRadius: 50,
      alignItems: 'center',
      top: screenHeight * 43/390,
      left: screenWidth * 80/844,
      backgroundColor: color2,
    },
    button5: {
    width: screenRatio * 200,
    height: screenRatio * 200,
    alignItems: 'center',
    justifyContent: 'center',
    //borderRadius: 40,
    //opacity: 0.5
    },
    container9: {
        width: screenRatio * 200,
        height: screenRatio * 200,
        borderRadius: 50,
        alignItems: 'center',
        top: screenHeight * 0/390,
        left: screenWidth * 390/844,
        backgroundColor: color2,
    },
    button6: {
        width: screenRatio * 200,
        height: screenRatio * 200,
        //backgroundColor: color1,
        alignItems: 'center',
        justifyContent: 'center',
        //borderRadius: 40,
        //opacity: 0.5
    },
    line3: {
            height: 3,
            width: screenWidth * 0.7,
            backgroundColor: color2,
            top: screenHeight * 30/844,
            alignSelf: 'center'
    },
    container10: {
        alignItems: 'center',
        top: screenHeight * 23/390,
        left: screenWidth * 20/844
    },
    backButton: {
        top: screenHeight * 30/844,
        left: screenWidth * 20/390,
        backgroundColor: color2,
        width: screenRatio * 150,
        height: screenRatio * 150,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 45
    },
    image1: {
        width: screenRatio * 200,
        height: screenRatio * 200,
    },
});