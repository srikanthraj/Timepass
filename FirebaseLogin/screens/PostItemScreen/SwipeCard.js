import React, { Component } from 'react';
import {StyleSheet, Text, View } from 'react-native';

export default class SwipeCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            text:null,
            
        }
        
    }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});