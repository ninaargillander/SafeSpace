import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Alert, ActivityIndicator } from 'react-native';
const {MongoClient} = require('mongodb');
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Halloj</Text> 
        <Button title="Press me" onPress={() => Alert.alert('You pressed the button :)')}/>
        <br></br>
        <ActivityIndicator size="small" color="#0000ff" />
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgreen',
  },
  welcome: {
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
