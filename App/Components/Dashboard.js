import React, { Component } from "react";

import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
 } from "react-native";

 import { Profile } from './Profile';
 import { Repositories } from './Repositories';
 import { Notes } from './Notes';
 import { api } from '../Utils/api';

 const styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

 export class Dashboard extends Component {
  constructor (props) {
    super(props);     
  }

  makeBackground (btn) {
    const obj = {
      flexDirection: 'row',
      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'center',
    };
    if (btn === 0) {
      obj.backgroundColor = '#48BBEC'
    } else if (btn === 1) {
      obj.backgroundColor = '#E77AAE'  
    } else {
      obj.backgroundColor = '#758BF4'
    }

    return obj;
  }

  goToProfile () {
    this.props.navigator.push({
      title: 'Profile',
      component: Profile,
      passProps: {userInfo: this.props.userInfo},
    });
  }
  async goToRepos () {
    const repos = await api.getRepos(this.props.userInfo.login);
    this.props.navigator.push({
      title: 'Repositories',
      component: Repositories,
      passProps: {userInfo: this.props.userInfo, repos: repos},
    });
  }
  async goToNotes () {
    let notes = await api.getNotes(this.props.userInfo.login);
    notes = notes || {}
    this.props.navigator.push({
      title: 'Notes',
      component: Notes,
      passProps: {userInfo: this.props.userInfo, notes: notes},
    });
  }

  render () {
    return (
      <View style={styles.container}>
      <Image source={{uri: this.props.userInfo.avatar_url}} style={styles.image} />
      <TouchableHighlight
        style={this.makeBackground(0)}
        onPress={this.goToProfile.bind(this)}
        underlayColor="#88D4F5"
      >
        <Text style={styles.buttonText}> View Profile </Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={this.makeBackground(1)}
        onPress={this.goToRepos.bind(this)}
        underlayColor="#88D4F5"
      >
        <Text style={styles.buttonText}> View Repos </Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={this.makeBackground(2)}
        onPress={this.goToNotes.bind(this)}
        underlayColor="#88D4F5"
      >
        <Text style={styles.buttonText}> View Notes </Text>
      </TouchableHighlight>
      </View>
    )
  }
 }