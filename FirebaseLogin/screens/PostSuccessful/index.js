import React, { Component } from 'react';
import {StyleSheet, Text, View } from 'react-native';

export default class PostSuccessful extends Component {
  constructor(props) {
    super(props);
   
}
  render() {
    console.log('Post Successful');
    return (
      <View style={styles.container}>
        <Text>This is the PostSuccessful Page</Text>
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