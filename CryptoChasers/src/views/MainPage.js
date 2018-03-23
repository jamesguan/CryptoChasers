import React from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { connect } from "react-redux";
import SearchInput, { createFilter } from 'react-native-search-filter';
import {Card} from 'react-native-elements';
import { withRssLogic } from "../hocs/withRssLogic";

const KEYS_TO_FILTERS = ['title', 'description'];

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

const MainPage = (props) => (
    <View>
        <View style={styles.statusBarBackground}></View>
        <SearchInput
          onChangeText={props.changeSearchText}
          style={styles.searchInput}
          value={props.searchTerm}
          placeholder="Type a message to search"
          />
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.welcome}>
            {props.rss.title}
          </Text>
          {(props.filteredContent ? props.filteredContent.map((item, index) => (
            <Card key={index} title={item.title}>
              <Text>
                {item.description}
              </Text>
            </Card>
          )) : <Text></Text>)}
        </ScrollView>
    </View>
);

export default withRssLogic(MainPage);
