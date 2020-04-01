import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Linking } from 'react-native';
import appStyles from './Sass/app.scss';

export default class chatContacts extends Component {
  render() {
    return (
      <View style={appStyles.container}>
        <Text style={appStyles.header}>Chattar</Text>
        <Text style={appStyles.instructions}>To get started, edit App.js</Text>
        <Text style={appStyles.instructions}>{instructions}</Text>

        <View style={appStyles.footer}>
          <Text style={appStyles.footerChat}>Chatt</Text>
          <Text style={appStyles.footerWatch}>Övervaka</Text>
        </View>
      </View>
    );
  }
}
