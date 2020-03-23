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

import { LinearGradient } from 'expo-linear-gradient';

import appStyles from './Sass/app.scss';
import chatStyles from './Sass/chat.scss';

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

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: 'Kalle Kula',
      currMsg: '',
      messages: []
    };

    this.pressSend = this.pressSend.bind(this);
  }

  pressSend(text) {
    console.log(text);
  }

  loadData = () => {
    this.setState({
      messages: DATA
    });
  };

  render() {
    return (
      //Finns bättre sätt än <KeyBoardAvoidingView> för att få allt att anpassas då tangentbordet öppnas
      <KeyboardAvoidingView style={appStyles.container} behavior="padding">
        <LinearGradient
          // TODO: Få style till scss-fil istället för in-line
          // Skapa egen component för header??
          colors={['#276a76', '#eaeaea']}
          style={{
            padding: 10,
            alignItems: 'center',
            marginTop: 37
          }}
        >
          <Text
            style={{
              fontSize: 40,
              color: '#fff'
            }}
          >
            {this.state.userName}
          </Text>
        </LinearGradient>

        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item msg={item} />}
          keyExtractor={item => item.id}
        />

        <View style={chatStyles.inputBox}>
          <TextInput
            style={chatStyles.textInput}
            onChangeText={currMsg => this.setState({ currMsg })}
          />

          <Button
            color="#133b43"
            title="Skicka"
            style={chatStyles.sendButton}
            onPress={() => this.pressSend(this.state.currMsg)}
          ></Button>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const DATA = [
  {
    message:
      'To get started, edit App.jsTo get started, edit App.jsTo get started, edit App.jsTo get started, edit App.jsTo get started, edit App.jsTo  get started, edit App.jsTo get started, edit App.jsTo get started, edit App.js',
    recieved: true,
    id: 0
  },
  {
    message:
      'To get started, edit App.jsTo get started, edit App.jsTo get started, edit App.jsTo get started, edit App.jsTo get started, edit App.jsTo  get started, edit App.jsTo get started, edit App.jsTo get started, edit App.js',
    recieved: false,
    id: 1
  },
  {
    message:
      'To get started, edit App.jsTo get started, edit App.jsTo get started, edit App.jsTo get started, edit App.jsTo get started, edit App.jsTo  get started, edit App.jsTo get started, edit App.jsTo get started, edit App.js',
    recieved: true,
    id: 2
  },
  {
    message:
      'To get started, edit App.jsTo get started, edit App.jsTo get started, edit App.jsTo get started, edit App.jsTo get started, edit App.jsTo  get started, edit App.jsTo get started, edit App.jsTo get started, edit App.js',
    recieved: false,
    id: 3
  },
  {
    message:
      'To get started, edit App.jsTo  get started, edit App.jsTo get started, edit App.jsTo get started, edit App.js',
    recieved: true,
    id: 4
  },
  {
    message:
      'To get started, edit App.jsTo  get started, edit App.jsTo get started, edit App.jsTo get started, edit App.js',
    recieved: true,
    id: 5
  }
];
