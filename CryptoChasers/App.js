/**
 * Made for CryptoChasers Confidential group
 */
import React, { Component } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import * as rssParser from 'react-native-rss-parser';

import {Card} from 'react-native-elements';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      rss: null
    };
    fetch('https://cryptochasers.net/index.xml')
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then((rss) => {
      this.setState({rss: rss});
    });

  }
  getTitle = () =>{
    return (this.state.rss ? this.state.rss.title : '');
  }
  render() {
    return (
      <View>
        <View style={[styles.statusBarBackground, this.props.style || {}]}></View>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.welcome}>
            {this.getTitle()}
          </Text>
          {(this.state.rss ? this.state.rss.items.map((item, index) => (
            <Card key={index} title={item.title}>
              <Text>
                {item.description}
              </Text>
            </Card>
          )) : <Text></Text>)}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusBarBackground: {
    height: (Platform.OS === 'ios') ? 20 : 0
  },
  container: {
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
