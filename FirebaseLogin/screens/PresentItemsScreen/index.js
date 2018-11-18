import React, { Component } from 'react';
import {StyleSheet, Text, View, ActivityIndicator, Image, Dimensions, FlatList } from 'react-native';
import NavigationBar from 'react-native-navbar';
import firebase from '@firebase/app'
import '@firebase/auth'
import GridView from 'react-native-super-grid';
import GridList from 'react-native-grid-list';
import { ListItem } from 'native-base';

let imagesList

const dimension = Dimensions.get('window')

export default class PresentItemsScreen extends Component {

    constructor(props) {
        super(props)
        imagesList = []; 
      
        this.state = {
          isLoading: true,
        };

       
    const dataRef = firebase.database().ref().child('items');
    dataRef.once('value').then(snapshot => {
        // snapshot.val() is the dictionary with all your keys/values from the '/store' path
        snapshot.forEach(function (childSnapshot) {

          var value = childSnapshot.val();
          imagesList.push(value.picture1url);
          //console.log("Picture 1 url is : " + value.picture1url);
      });
      }).then(() => {

        console.log(imagesList);
        this.setState({isLoading: false})
      }
      );

    }

    


  render() {

   const columns = this.state.columns;
    
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }

    else {
      // alert(dimension.height);
      return( 
        
//         <GridView
//   itemDimension={100}
//   staticDimension	= {100}
//   items={[1,2,3,4,5,6]}
//   renderItem={item => (<Text>{item}</Text>)}
// />
        
        <View style = {{width:dimension.width,height:dimension.height-200,justifyContent:'flex-start'}}>
        <GridView
        itemDimension={130}
        // staticDimension	= {300}
        items={imagesList}
        style={styles.gridView}
        renderItem={item => (
          <View style={[styles.itemContainer]}>
            <Image source={{uri: item}} key={item} style = {styles.image} />
          </View>
        )}
      />
      </View>
      )
    }
    
  }
}

const styles = StyleSheet.create({
  
  gridView: {
    paddingTop: 25,
    paddingBottom: 45,
    flex: 1,
    // backgroundColor: 'blue',
    height:'80%',
    // justifyContent: 'flex-start',
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }

});

