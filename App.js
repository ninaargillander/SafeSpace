import React, { Component } from 'react';

import {
  Platform,
  Text,
  View,
  Linking,
  TextInput,
  Button,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';

import Header from './Components/header.js';
import ChatView from './Views/chatView.js';

import appStyles from './Sass/App.scss';
import chatStyles from './Sass/chat.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <ChatView></ChatView>;
  }
}
