import React, { Component } from 'react';
import {StyleSheet, Text, View, ActivityIndicator,ScrollView, Dimensions} from 'react-native';
import NavigationBar from 'react-native-navbar';
import firebase from '@firebase/app'
import '@firebase/auth'
import Slideshow from 'react-native-slideshow';

let itemtitle = '';
let description = '';
let picture1url = '';
let picture2url = '';
let picture3url = '';
let rentingfrom = null;
let rentingtill = null;
let rentalprice = '';
let per = '';
let securitydeposit = '';
let condition = '';
let categories = [];
const dimension = Dimensions.get('window')

export default class PresentIndividualItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
          };

    const dataRef = firebase.database().ref().child('items/'+this.props.itemid);
    dataRef.once('value').then(snapshot => {
        
        itemtitle = snapshot.val().title;
        description = snapshot.val().description;
        picture1url = snapshot.val().picture1url;
        picture2url = snapshot.val().picture2url;
        picture3url = snapshot.val().picture3url;
        rentingfrom = snapshot.val().rentingfrom;
        rentingtill = snapshot.val().rentingtill;
        rentalprice = snapshot.val().rentalprice;
        per = snapshot.val().per;
        securitydeposit = snapshot.val().securitydeposit;
        condition = snapshot.val().condition;

        (snapshot.val().categories).map((category,key) => (
            categories.push(category)
        ))
        // snapshot.val().categories.forEach(function (childSnapshot) {

        //           var value = childSnapshot.val();
        //           categories.push(value);
        // });

        // snapshot.val() is the dictionary with all your keys/values from the '/store' path
    //     snapshot.forEach(function (childSnapshot) {

    //       var value = childSnapshot.val();
    //       console.log("Item Title is : " + value.title);
    //   });
      }).then(() => {
        // console.log(imagesList);
        this.setState({isLoading: false})
      }
      );

    }

  render() {
    //   console.log(this.props.itemid)

    if(this.state.isLoading){
        return(
          <View style={styles.activity}>
            <ActivityIndicator size="large" color="#0000ff"/>
          </View>
        )
    }

    else { 
        
        return (

        <View style = {{width:dimension.width,height:dimension.height-200,justifyContent:'flex-start'}}>

            <Slideshow style = {{width:dimension.width,height:dimension.height,justifyContent:'flex-start'}}
      dataSource={[
        { url:picture1url },
        { url:picture2url },
        { url:picture3url }
    ]}/>

            <ScrollView pagingEnabled showsVerticalScrollIndicator>
            <Text style = {styles.iteminformation}>
            {itemtitle}{"\n"}{"\n"}
            Available From:{"\t"}{rentingfrom} To: {rentingtill} {"\n"}{"\n"}
            Description:{"\t"}{description}{"\n"}{"\n"}
            Rental Price:{"\t"}{rentalprice} per {per} {"\n"}{"\n"}
            Security Deposit:{"\t"}{securitydeposit} {"\n"}{"\n"}
            Item Condition:{"\t"}{condition} {"\n"}{"\n"}
            Categories: {"\t"}
            {(categories).map((category,key) => (
             <Text> {category} </Text>
            ))}
           
            </Text>
            </ScrollView>

        </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iteminformation:{
    flex:1,  
    paddingLeft:10,
    paddingRight:10,
    fontSize:15,
    alignItems: 'center',
    justifyContent: 'center',

  },
});
