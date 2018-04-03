import React, { Component } from "react";
import { PropTypes } from "prop-types";

import {
  StyleSheet,
  View,
  WebView,
 } from "react-native";

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: "#F6F6EF",
     flexDirection: "column",
   }
 });

 export class WebViewer extends Component {
   render () {
     return (
      <View style={styles.container}>
        <WebView source={{uri: this.props.url}} />
      </View>
     );
   }
 };

 WebViewer.propTypes = {
   url: PropTypes.string.isRequired,
 };