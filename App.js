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
// import {createStackNavigator} from 'react-navigation';
// import BoardScreen from './components/BoardScreen';
// import AddBoardScreen from './components/AddBoardScreen';
// import EditBoardScreen from './components/EditBoardScreen';

import PostItemScreen from './FirebaseLogin/screens/PostItemScreen'
import PostItemScreen2 from './FirebaseLogin/screens/PostItemScreen2'
import PostItemScreen3 from './FirebaseLogin/screens/PostItemScreen3'
import PostItemScreen4 from './FirebaseLogin/screens/PostItemScreen4'

// const RootStack = createStackNavigator(
//   {
//     // PostItem: PostItemScreen,
//     // PostItem2: PostItemScreen2,
//     // PostItem3: PostItemScreen3,
//     // PostItem4: PostItemScreen4,
//     Board: BoardScreen,
//     AddBoard: AddBoardScreen,
//     EditBoard: EditBoardScreen,
//   },
//   {
//     initialRouteName: 'Board',
//     navigationOptions: {
//       headerStyle: {
//         backgroundColor: '#777777',
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },
//     },
//   },
// );

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
      databaseURL: "https://rentalapp-19803.firebaseio.com",
      storageBucket: "rentalapp-19803.appspot.com"
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
           return (
            // <View style = {styles.container}>
            //   <RootStack />
              <HomeScreen/>
              // </View> 
           );
       }
        //alert('Login Screen');
      return (
        // <View style = {styles.container}>
        // <RootStack />
        <FirebaseLogin login={user => alert(user)}/>
        // </View>
      );  
  }
}

const styles = StyleSheet.create({
  container : {
    flex:1,
  }
});
