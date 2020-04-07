import React, { Component } from 'react';
import io from 'socket.io-client';

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

import appStyles from './Sass/app.scss';
import chatStyles from './Sass/chat.scss';

export default class App extends Component {


  constructor(props) {
    super(props);

    this.state = {
      userName: 'Kalle Kula',
      currMsg: {
        text: "",
        conversationId: "conversationId", //HÄR ÄR VI 
      },
      messages: []
    };

    this.submitChatMessage = this.submitChatMessage.bind(this);
  }

  componentDidMount() {
    this.socket = io('http://192.168.10.159:8000');
    this.socket.emit('init', {
      senderId: "5e843ddbbd8a99081cd3f613",
    });
  }

  componentWillUnmount() {
    this.socket.emit('disconnect', {
      senderId: "5e843ddbbd8a99081cd3f613",
    });
  }

  submitChatMessage() {
    this.socket.emit('message', this.state.currMsg);
    console.log(`Message sent: ${this.state.currMsg}`);
    this.setState({ currMsg: "" });
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
          data={DATA}
          renderItem={({ item }) => <Item msg={item} />}
          keyExtractor={item => item.id}
          initialScrollIndex={DATA.length - 1} // Gör att man hamnar längst ner i konversationen och får scrolla uppåt, gissar på att det inte kommer funka när data hämtas från db?
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
              this.submitChatMessage(this.state.currMsg);
            }}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

function Item({ msg }) {
  if (msg.recieved) {
    return (
      <View style={[chatStyles.msg, chatStyles.msgRecieved]}>
        <Text>{msg.message}</Text>
      </View>
    );
  }

  return (
    <View style={[chatStyles.msg, chatStyles.msgSent]}>
      <Text>{msg.message}</Text>
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
