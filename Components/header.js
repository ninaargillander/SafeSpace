import React, { Component } from 'react';
import { Text } from 'react-native';

import appStyles from '../Sass/app.scss';

import { LinearGradient } from 'expo-linear-gradient';

export default class Header extends Component {
  render() {
    return (
      <LinearGradient
        // TODO: Få style till scss-fil istället för in-line
        // Skapa egen component för header??
        colors={['#276a76', '#eaeaea']}
        style={appStyles.headerGradient}
      >
        <Text style={appStyles.headerText}>{this.props.title}</Text>
      </LinearGradient>
    );
  }
}
