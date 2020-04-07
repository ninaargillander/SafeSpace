import React, { Component } from 'react';

import {
  Platform,
  Text,
  View,
  Linking,
  TextInput,
  Button,
  KeyboardAvoidingView,
  FlatList
} from 'react-native';

import Header from './Components/header.js';

import appStyles from './Sass/App.scss';
import chatStyles from './Sass/chat.scss';

//import getConversation from './Backend/server';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: 'Kalle Kula',
      currMsg: '',
      messages: [],
      response: ''
    };

    this.pressSend = this.pressSend.bind(this);
  }
  async componentDidMount() {
    try {
      const callChatApi = await fetch(
        'http://192.168.1.207:8000/conversations/5e68c508c18e2a00ee6bf0f8'
      );

      callChatApi.json().then(data => {
        this.setState({ messages: data, loading: false });
      });
    } catch (err) {
      console.log('Error fetching data', err);
    }
  }

  pressSend(text) {
    console.log(text);
    this.textInput.clear();
  }

  // FlatList, TextInput och Button bör kunna göras till en component (chatView) men det funkar inte nu
  render() {
    return (
      //Finns bättre sätt än <KeyBoardAvoidingView> för att få allt att anpassas då tangentbordet öppnas
      <KeyboardAvoidingView style={appStyles.container} behavior="padding">
        <Header title={this.state.userName} />

        <FlatList
          ref={el => (this.list = el)}
          data={this.state.messages}
          renderItem={({ item }) => <Item msg={item} />}
          keyExtractor={item => item.id}
          //initialScrollIndex={DATA.length - 1} // Gör att man hamnar längst ner i konversationen och får scrolla uppåt, gissar på att det inte kommer funka när data hämtas från db?
        />

        <View style={chatStyles.inputBox}>
          <TextInput
            ref={input => {
              this.textInput = input;
            }}
            style={chatStyles.textInput}
            onChangeText={currMsg => this.setState({ currMsg })}
          />

          <Button
            color="#133b43"
            title="Skicka"
            style={chatStyles.sendButton}
            onPress={() => {
              this.pressSend(this.state.currMsg);
            }}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

function Item({ msg }) {
  if (true) {
    return (
      <View style={[chatStyles.msg, chatStyles.msgRecieved]}>
        <Text>{msg.text}</Text>
      </View>
    );
  }

  return (
    <View style={[chatStyles.msg, chatStyles.msgSent]}>
      <Text>{msg.text}</Text>
    </View>
  );
}

const DATA = [
  {
    message:
      'Meddelande 0: To get started, edit App.jsTo get started, edit App.jsTo get started, edit App.jsTo get started, edit App.jsTo get started, edit App.jsTo  get started, edit App.jsTo get started, edit App.jsTo get started, edit App.js',
    recieved: true,
    id: 0
  },
  {
    message:
      'Meddelande 1: To get started, edit App.jsTo get started, edit App.jsTo get started, edit App.jsTo get started, edit App.jsTo get started, edit App.jsTo  get started, edit App.jsTo get started, edit App.jsTo get started, edit App.js',
    recieved: false,
    id: 1
  },
  {
    message:
      'Meddelande 2: To get started, edit App.jsTo get started, edit App.jsTo get started, edit App.jsTo get started, edit App.jsTo get started, edit App.jsTo  get started, edit App.jsTo get started, edit App.jsTo get started, edit App.js',
    recieved: true,
    id: 2
  },
  {
    message:
      'Meddelande 3: To get started, edit App.jsTo get started, edit App.jsTo get started, edit App.jsTo get started, edit App.jsTo get started, edit App.jsTo  get started, edit App.jsTo get started, edit App.jsTo get started, edit App.js',
    recieved: false,
    id: 3
  },
  {
    message:
      'Meddelande 4: To get started, edit App.jsTo  get started, edit App.jsTo get started, edit App.jsTo get started, edit App.js',
    recieved: true,
    id: 4
  },
  {
    message:
      'Meddelande 5: To get started, edit App.jsTo  get started, edit App.jsTo get started, edit App.jsTo get started, edit App.js',
    recieved: true,
    id: 5
  },
  {
    message: 'Meddelande 6: To gets',
    recieved: false,
    id: 6
  }
];
