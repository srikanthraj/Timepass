import React, { Component } from 'react';
import {StyleSheet, Text, View } from 'react-native';
import NavigationBar from 'react-native-navbar';

export default class MyOffersScreen extends Component {
  render() {
    return (
      <View>
        <NavigationBar style={styles.container}
        title={titleConfig}
        rightButton={rightButtonConfig}
      />
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

const rightButtonConfig = {
  title: 'Next',
  handler: () => alert('hello!'),
};

const titleConfig = {
  title: 'Hello, world',
};
