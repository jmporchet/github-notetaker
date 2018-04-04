/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */ 

import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Main } from "./App/Components/Main";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  }
});

export default class App extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
            title: 'Github Notetaker',
            component: Main
        }}
      />
    );
  }
}

AppRegistry.registerComponent('githubNotetaker', () => githubNotetaker);
