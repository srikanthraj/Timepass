import React, { Component } from 'react';
import {StyleSheet, Text, View } from 'react-native';

export default class UserProfileScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the User Profile Screen Page</Text>
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
