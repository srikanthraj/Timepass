import React, { Component } from 'react';
import {    
  StyleSheet,
  Text,
  View,
  Slider,
  Picker
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { RaisedTextButton } from 'react-native-material-buttons';
import { TextField } from 'react-native-material-textfield';
import RNFetchBlob from 'react-native-fetch-blob'
import firebase from '@firebase/app'
import '@firebase/auth'

export default class UserProfileScreen extends Component {
 
  constructor(props) {
    super(props)
    //this.findItem = this.findItem.bind(this);
    const imageRef = firebase.storage().ref('3Vd1KXZEYthvEJrBGq2KMqsNllj1_1542228159000').child('3Vd1KXZEYthvEJrBGq2KMqsNllj1_1542228159000')
      imageRef.getDownloadURL().then((url) => {
        console.log(url);
      })
    
  }

 

  render() {
    return(
    <View style={styles.container}>
    <Text>Hi</Text>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    //margin: 8,
    marginTop: "10%",
    marginTop: "20%",
    justifyContent: 'flex-start',
    width: '85%',
  },
 
});