import React, { Component } from 'react';
import {StyleSheet, Text, View,TouchableOpacity, Button, Image, ActivityIndicator } from 'react-native';
import {w, h, totalSize} from '../../api/Dimensions';
import ImagePicker from 'react-native-customized-image-picker';
import RNFetchBlob from 'react-native-fetch-blob'
import { firebase } from '@firebase/app';
import StepIndicator from 'react-native-step-indicator';
import * as myConstantClass from '../../../constants'

export default class PostItemScreen extends Component {

    
    constructor(props) {
        super(props)
        this.state = {
            loading:false,
            dp:null,
            currentPosition:2
        }
        
    }
    onPageChange(position){
        this.setState({currentPosition: position});
    }

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
            console.log(image);
            const imagePath = image.path 
            let uploadBlob = null
            const imageRef = firebase.storage().ref(imageKey).child('dp_'+ count++ +'.jpg')
            let mime = 'image/jpg'
            fs.readFile(imagePath,'base64')
            .then((data) => {
                return Blob.build(data, {type:`${mime};BASE64`})    
            })
            .then((blob) => {
               uploadBlob = blob
               return imageRef.put(blob, {contentTpe:mime})     
            })
            .then(() => {
                uploadBlob.close()
                //alert(imageRef.getDownloadURL())
                return imageRef.getDownloadURL()
            })
            .then((url) => {

                let userData = {}
                let obj = {}
                obj["loading"] = false;
                obj["dp"] = url
                this.setState(obj)
            })
            .catch((error) => {
                console.log(error)
            })
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
            console.log(image);
            const imagePath = image.path 
            let uploadBlob = null
            const imageRef = firebase.storage().ref(imageKey).child('dp_'+ count++ +'.jpg')
            let mime = 'image/jpg'
            fs.readFile(imagePath,'base64')
            .then((data) => {
                return Blob.build(data, {type:`${mime};BASE64`})    
            })
            .then((blob) => {
               uploadBlob = blob
               return imageRef.put(blob, {contentTpe:mime})     
            })
            .then(() => {
                uploadBlob.close()
                //alert(imageRef.getDownloadURL())
                return imageRef.getDownloadURL()
            })
            .then((url) => {

                let userData = {}
                let obj = {}
                obj["loading"] = false;
                obj["dp"] = url
                this.setState(obj)
            })
            .catch((error) => {
                console.log(error)
            })
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }
  render() {
    

    //     if(this.state.dp) {     
    //     return(
    //     <View style={styles.container}>    
    //     <Text style={styles.text}>Photo Uploaded by Take Photo</Text></View>); } 
    //     else {
    //     return(    
    //     <View style={styles.container}>    
    //     <TouchableOpacity
    //     onPress={this.takePhoto}
    //     style={styles.button}
    //     activeOpacity={0.6}
    //   >
    //     <Text style={styles.text}>Take Photo</Text>
    //     </TouchableOpacity></View>); }

    if(this.state.dp) {
        return(
        <View> 
        <Text>Photo Uploaded by Select/Take Photo</Text>
        <StepIndicator
        //customStyles={myConstantClass.stepIndicatorCustomStyles}
        currentPosition={this.state.currentPosition}
        direction='horizontal'
        labels={myConstantClass.labels}
        />  
        </View>
        
        ); 
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
        <StepIndicator
        //customStyles={myConstantClass.stepIndicatorCustomStyles}
        currentPosition={this.state.currentPosition}
        direction='horizontal'
        labels={myConstantClass.labels}
        />  
        </View>); }


              
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
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
