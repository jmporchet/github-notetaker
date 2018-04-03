import React, { Component } from "react";
import { PropTypes } from "prop-types";
import {
  ListView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";

import { api } from "../Utils/api";
import { Badge } from "./Badge";
import { Separator } from "../Helpers/Separator";

const  styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10
  },
  rowContainer: {
    padding: 10
  },
  footerContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

export class Notes extends Component {
  constructor (props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.notes),
      note: '',
      error: false,
    }
  };

  handleChange (e) {
    this.setState({
      note: e.nativeEvent.text
    });
  };

  async handleSubmit () {
    const note = this.state.note;
    this.setState({
      note: ''
    });
    await api.postNote(this.props.userInfo.login, note)
    const allNotes = await api.getNotes(this.props.userInfo.login)
    if (allNotes === null) {
      console.log('REQUEST FAILED', err);
      this.setState({error: err});
    } else {
      this.setState({
        dataSource: this.ds.cloneWithRows(allNotes)
      });
    }
  }

  footer () {
    return (
      <View style={styles.footerContainer}>
        <TextInput
          style={styles.searchInput}
          value={this.state.note}
          onChange={this.handleChange.bind(this)}
          placeholder="Enter note"
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="#88D4F5"
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  };

  renderRow (rowData) {
    return (
      <View>
        <View style={styles.rowContainer}>
          <Text>{rowData}</Text>
        </View>
        <Separator />
      </View>
    );
  };

  render () {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderHeader={() => <Badge userInfo={this.props.userInfo} />}
          enableEmptySections
        />
        {this.footer()}
      </View>
    );
  };
}

Notes.propTypes = {
  userInfo: PropTypes.object.isRequired,
  notes: PropTypes.object.isRequired,
}