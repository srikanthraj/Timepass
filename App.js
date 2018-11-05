/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import firebase from '@firebase/app'
import '@firebase/auth'
import FirebaseLogin from "./FirebaseLogin";
import SplashScreen from "react-native-splash-screen"
import HomeScreen from './FirebaseLogin/screens/HomeScreen';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
export default class App extends Component {

  // componentDidMount() {
    
  //   alert(SplashScreen);
  //   //SplashScreen.hide();
  // }
  constructor() {
    super();
    this.state = {
      loading:true,
      authenticated:false,  
    };
  }
  
  componentDidMount() {

    
  }
  componentWillMount() {
  
    const config = {  
      apiKey: "AIzaSyD4RmcatLvAeir4iXsx0SIOiPQeuFpuKXg",  
      authDomain: "rentalapp-19803.firebaseapp.com",  

    };  
    firebase.initializeApp(config);

    // Check if user already logged in using E-Mail

    firebase.auth().onAuthStateChanged((user) => {
      if(user)
      this.setState({loading:false,authenticated:true });
      else
      this.setState({loading:false,authenticated:false });
    });
    
    // Check if user already logged in using Facebook

    AccessToken.getCurrentAccessToken().then(
      (data) => {
        this.setState({loading:false,authenticated:true });
      }
    );
  }

  render() {
      if (this.state.loading) return null; // Render loading/splash screen etc
      if (this.state.authenticated) {
           return (<HomeScreen/> );
       }
        //alert('Login Screen');
      return (
        <FirebaseLogin login={user => alert(user)}/>
      );  
  }
}

const styles = StyleSheet.create({
  container : {
    flex:1,
  }
});
