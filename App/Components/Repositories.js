import React, { Component } from "react";
import { PropTypes } from "prop-types";
import {
  ScrollView,
  StyleSheet, 
  Text,
  TouchableHighlight,
  View,
} from "react-native";

import { Badge } from "./Badge";
import { Separator } from "../Helpers/Separator";
import { WebViewer } from "../Helpers/WebViewer";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },
  name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
  },
  stars: {
    color: '#48BBEC',
    fontSize: 14,
    paddingBottom: 5
  },
  description: {
    fontSize: 14,
    paddingBottom: 5
  }
});

export class Repositories extends Component {
  openPage (url) {
    this.props.navigator.push({
      component: WebViewer,
      title: 'Web View',
      passProps: {url},
    });
  }

  render () {
    const repos = this.props.repos;
    const list = repos.map((el, idx) => {
      const desc = repos[idx].description ? <Text style={styles.description}>{repos[idx].description}</Text> : <View />;
      return (
        <View key={idx}>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={this.openPage.bind(this, repos[idx].html_url)}
              underlayColor="transparent">
              <Text style={styles.name}>{repos[idx].name}</Text>
            </TouchableHighlight>
            <Text style={styles.stars}>Stars: {repos[idx].stargazers_count}</Text>
            {desc}
          </View>
          <Separator />
        </View>
      )
    });

    return (
      <ScrollView style={styles.container}>
        <Badge userInfo={this.props.userInfo} />
        {list}
      </ScrollView>
    );
  }
};

Repositories.propTypes = {
  userInfo: PropTypes.object.isRequired,
  repos: PropTypes.array.isRequired,
}