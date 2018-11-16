import React, { Component } from 'react';
import {StyleSheet, Text, View,TouchableOpacity, Button, Image, ActivityIndicator } from 'react-native';
import {w, h, totalSize} from '../../api/Dimensions';
import ImagePicker from 'react-native-customized-image-picker';
import RNFetchBlob from 'react-native-fetch-blob'
import { firebase } from '@firebase/app';
import StepIndicator from 'react-native-step-indicator';
//import Carousel from 'react-native-snap-carousel';

import SwipeCard from './SwipeCard';
import update from 'immutability-helper';
import { TextField } from 'react-native-material-textfield';
import { RaisedTextButton } from 'react-native-material-buttons';
import UserProfileScreen from '../UserProfileScreen';
import NavigationBar from 'react-native-navbar';
import TextFieldItemTitle from '../../components/TextFieldItemTitle'


export default class PostItemScreen extends Component {
   
    constructor(props) {
        super(props)
        this.state = {
            loading:false,
            imagesLoaded:[],
            dp:null,
            
        };

        this.onSwipeUp = this.onSwipeUp.bind(this);

      this.onFocus = this.onFocus.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onChangeText = this.onChangeText.bind(this);
      //this.onSubmitItemTitle = this.onSubmitItemTitle.bind(this);
      this.itemTitleRef = this.updateRef.bind(this, 'itemtitle');
        
    }

    // Methods to Handle the behaviour of text Field and Button

    onFocus() {
        let { errors = {} } = this.state;
  
        for (let name in errors) {
          let ref = this[name];
  
          if (ref && ref.isFocused()) {
            delete errors[name];
          }
        }
  
        this.setState({ errors });
      }
  
      onChangeText(text) {
        ['itemtitle']
          .map((name) => ({ name, ref: this[name] }))
          .forEach(({ name, ref }) => {
            if (ref.isFocused()) {
              this.setState({ [name]: text });
            }
          });
      }
  
  
      onSubmit() {
        let errors = {};
  
        ['itemtitle']
          .forEach((name) => {
            let value = this[name].value();
  
            if (!value) {
              errors[name] = 'Give your item a title';
            }
          });
  
        this.setState({ errors });
      }
  
      updateRef(name, ref) {
        this[name] = ref;
      }

      //Till Here -  Methods to Handle the behaviour of text Field and Button

      
      selectPhoto = () => {

        this.setState({loading:true})
        const Blob = RNFetchBlob.polyfill.Blob
        const fs = RNFetchBlob.fs
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
        window.Blob = Blob
        const uid = firebase.auth().currentUser.uid
        const timestamp = Date.parse(new Date())
        const imageKey = uid + '_'+ timestamp
          ImagePicker.openPicker({
            multiple: true,
            maxSize:3,
            mediaType:'photo',
            width:300,
            height:300
          }).then(images => {
            let count = 0;
            for(let image of images) {
            
            const imagePath = image.path
            count++;
            
            this.setState({
                imagesLoaded: [...this.state.imagesLoaded, imagePath],
                
            }); 
            if(count == images.length)
            this.setState({
                dp:true,
                
            }); 
            }
        })
        .catch((error) => {
            console.log(error)
        })
            //}
      }

      takePhoto = () => {
        
        this.setState({loading:true})
        const Blob = RNFetchBlob.polyfill.Blob
        const fs = RNFetchBlob.fs
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
        window.Blob = Blob
        const uid = firebase.auth().currentUser.uid
        const timestamp = Date.parse(new Date())
        const imageKey = uid + '_'+ timestamp
          ImagePicker.openCamera({
            multiple: true,
            maxSize:3,
            mediaType:'photo',
            width:300,
            height:300
          }).then(images => {
            let count = 0;
            for(let image of images) {
            
            const imagePath = image.path
            count++;
            
            this.setState({
                imagesLoaded: [...this.state.imagesLoaded, imagePath],
                
            }); 
            if(count == images.length)
            this.setState({
                dp:true,
                
            }); 
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }


    // onSwipeUp(index){
    //     //parameter returned is the index of active child
    //     //alert(this.state.imagesLoaded)
    //     // var array = [...this.state.imagesLoaded]; // make a separate copy of the array
    //     // array.splice(index, 1)
    //     // alert(this.state.imagesLoaded.length)
    //     // this.setState({imagesLoaded: array})
    //     // this.forceUpdate();
    //     prevState = this.state
    //     this.setState((prevState) => ({
    //         imagesLoaded: update(prevState.imagesLoaded, {$splice: [[index, 1]]})
    //       }))
    //   }

      onSwipeUp = (index) => {

        var array = [...this.state.imagesLoaded];
        array.splice(index, 1);
        
        this.setState(
            { imagesLoaded:array },
        );
      }
  render() {
    
    
    if(this.state.dp) {
        
        let { errors = {}, ...data } = this.state;
        
        let images = this.state.imagesLoaded.map(image => {
            
            return <Image source={{uri: image}} key={image} style = {{width:200,height:100}} />
         });

         
        return(
        <View style={styles.container}>

<TextFieldItemTitle images={images}/>
</View>
        );
      
       // }
        } 
        else {
        return(    
        <View style={styles.container}>
        
        <TouchableOpacity
        onPress={this.selectPhoto}
        style={styles.button}
        activeOpacity={0.6}
        >
        <Text style={styles.text}>Select Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={this.takePhoto}
        style={styles.button}
        activeOpacity={0.6}
      >
        <Text style={styles.text}>Take Photo</Text>
        </TouchableOpacity>
        </View>); }


              
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    width: 100 + '%',
    height: 100 + '%',
  },
  
  stepindicator: {
    flex: 1,
  },
  button: {
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: w(2),
    backgroundColor: '#888', 
    borderRadius: w(10),
    marginTop: h(8),
  },
  text: {
    color: 'white',
    fontWeight: '700',
    paddingVertical: h(1),
    fontSize: totalSize(2.1),
  },
  spinner: {
    height: h(5),
  },
});

