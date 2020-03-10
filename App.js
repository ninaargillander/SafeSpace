import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  Linking,
  TextInput,
  Button,
  KeyboardAvoidingView
} from 'react-native';

import appStyles from './Sass/app.scss';
import chatStyles from './Sass/chat.scss';

/* const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
}); */

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: 'Kalle Kula'
    };
  }

  render() {
    return (
      <KeyboardAvoidingView style={appStyles.container} behavior="padding">
        <Text style={appStyles.header}>{this.state.userName}</Text>
        <Text style={[chatStyles.msgSent, chatStyles.msg]}>
          To get started, edit App.js
        </Text>
        <Text style={[chatStyles.msgRecieved, chatStyles.msg]}>
          To get started, edit App.js
        </Text>

        <View style={chatStyles.inputBox}>
          <TextInput style={chatStyles.textInput}></TextInput>
          <Button
            color="red"
            title="Skicka"
            style={chatStyles.sendButton}
          ></Button>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
