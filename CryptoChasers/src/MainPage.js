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

import SearchInput, { createFilter } from 'react-native-search-filter';

import * as rssParser from 'react-native-rss-parser';

import {Card} from 'react-native-elements';
const KEYS_TO_FILTERS = ['title', 'description'];

type Props = {};
export default class MainPage extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      rss: null,
      filteredContent: null,
      searchTerm: ''
    };
    fetch('https://cryptochasers.net/index.xml')
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then((rss) => {
      this.setState({rss: rss});
      this.setState({filteredContent: rss.items.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))});
    });

  }
  getTitle = () =>{
    return (this.state.rss ? this.state.rss.title : '');
  }
  searchUpdated = (term) => {
    this.setState({ searchTerm: term });
    this.setState({filteredContent: this.state.rss.items.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))});
  }
  render() {
    return (
      <View>
        <View style={[styles.statusBarBackground, this.props.style || {}]}></View>
        <SearchInput
          onChangeText={(term) => { this.searchUpdated(term) }}
          style={styles.searchInput}
          placeholder="Type a message to search"
          />
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.welcome}>
            {this.getTitle()}
          </Text>
          {(this.state.filteredContent ? this.state.filteredContent.map((item, index) => (
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
    height: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: '#F5FCFF'
  },
  searchInput: {
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1
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
