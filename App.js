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

//import {NavigationContainer} from '@react-navigation/native'
import Header from './Components/header.js';

//import appStyles from './Sass/app.scss';
import chatStyles from './Sass/chat.scss';

export default class App extends Component {
  // static navigationOptions = {
  //   navigation: any,
  // };

  static navigationOptions = ({navigation}) => ({
    title:'Contacts',
    headerLeft: (
        <Button onPress={() =>  {
            navigation.navigate('Chat')
        }}
        
        />
    ),
});
  // FlatList, TextInput och Button bör kunna göras till en component (chatView) men det funkar inte nu
  render() {
   
    return (
      <View>
      <Header title={'Contacts'} />
      <FlatList
          ref={el => (this.list = el)}
          data={DATA}
          renderItem={({ item }) => <Item msg={item} />}
          keyExtractor={item => item.id}
          initialScrollIndex={DATA.length - 1} // Gör att man hamnar längst ner i konversationen och får scrolla uppåt, gissar på att det inte kommer funka när data hämtas från db?
        />
      <Button title="Kalle Kula" onPress={() => alert('se konvo')}/>
      </View>
    );
  }
}



function Item({ msg }) {
  

  return (
    <View style={[chatStyles.msg]}>
      <Text>{msg.user}</Text>
    </View>
  );
}

const DATA = [
  {
    user:
      'Kalle Kula',
    id: 0
  },
  
  {
    user:
      'Lisa Avlång',
    id: 1
  },
  
  {
    user:
      'Anna Asbra',
    id: 2
  },
  
  {
    user:
      'Fidde Framåt',
    id: 3
  }
  
];