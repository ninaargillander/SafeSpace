import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';

import chatStyles from '../Sass/chat.scss';

export default class ChatView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currMsg: ''
    };

    this.pressSend = this.pressSend.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  pressSend() {
    this.textInput.clear();
  }

  onChange(text) {
    this.setState({ currMsg: text });
  }

  render() {
    return (
      <KeyboardAvoidingView>
        <FlatList
          data={this.props.data}
          renderItem={({ item }) => <Item msg={item} />}
          keyExtractor={item => item.id}
          initialScrollIndex={this.props.data.length - 1} // Gör att man hamnar längst ner i konversationen och får scrolla uppåt, gissar på att det inte kommer funka när data hämtas från db?
        />
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
