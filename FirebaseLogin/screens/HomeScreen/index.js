import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, Image} from 'react-native';
import Tabbar from 'react-native-tabbar-bottom';
import ChatScreen from '../ChatScreen';
import PostItemScreen from '../PostItemScreen';
import PostItemScreen2 from '../PostItemScreen2';
import MyOffersScreen from '../MyOffersScreen';
import UserProfileScreen from '../UserProfileScreen'
import NavigationBar from 'react-native-navbar';
import PresentItemsScreen from '../PresentItemsScreen'
import firebase from '@firebase/app'
import '@firebase/auth'
import GridView from 'react-native-super-grid';

// const Navigation = StackNavigator({

//     PostItemScreen: {screen: PostItemScreen},
//     PostItemScreen2: {screen: PostItemScreen2},
// });



export default class HomeScreen extends Component {

    constructor() {
        super()
        this.state = {
          page: "HomeScreen",
         
        };
        
      }

      render() {

        return (
          <View style={styles.container}>
        
            
            {this.state.page === "ChatScreen" && <ChatScreen />}
            {this.state.page === "PostItemScreen" && <PostItemScreen />}
            {this.state.page === "MyOffersScreen" && <MyOffersScreen />}
            {this.state.page === "UserProfileScreen" && <UserProfileScreen />} 
    
            <Tabbar style = {{width:100, height:100}}
              stateFunc={(tab) => {
                
                this.setState({page: tab.page})
                //this.props.navigation.setParams({tabTitle: tab.title})
              }}
              activePage={this.state.page}
              tabs={[
                {
                  page: "HomeScreen",
                  icon: "home",
                },
                {
                  page: "ChatScreen",
                  icon: "notifications",
                  
                },
                {
                  page: "PostItemScreen",
                  icon: "person",
                },
                {
                  page: "MyOffersScreen",
                  icon: "chatbubbles",
                  
                },
                {
                  page: "UserProfileScreen",
                  icon: "search",
                },
              ]}
            />

             
            {this.state.page === "HomeScreen" && <View style={styles.textContainer}>  
            <PresentItemsScreen />
            </View>}
            
            


          </View>

        );
      }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  
  });