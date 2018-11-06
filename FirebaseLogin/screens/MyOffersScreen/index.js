import React, { Component } from 'react';
import {StyleSheet, Text, View } from 'react-native';

export default class MyOffersScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the My Offers Screen Page</Text>
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
