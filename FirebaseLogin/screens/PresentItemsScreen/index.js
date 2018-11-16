import React, { Component } from 'react';
import {StyleSheet, Text, View } from 'react-native';
import NavigationBar from 'react-native-navbar';
import firebase from '@firebase/app'
import '@firebase/auth'

export default class PresentItemsScreen extends Component {

    constructor(props) {
        super(props)
        const dataRef = firebase.database().ref().child('items');
        dataRef.once('value').then(snapshot => {
            // snapshot.val() is the dictionary with all your keys/values from the '/store' path
            console.log(snapshot.val());
          })
    }

    


  render() {
    return (
      <View>
        
        <Text>This is Present Items Screen Page</Text>

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
