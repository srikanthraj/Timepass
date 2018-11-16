import React, { Component } from 'react';
import {StyleSheet, Text, View,ScrollView, Dimensions, Image } from 'react-native';
import RNSwiper from 'react-native-3d-swiper';
import firebase from '@firebase/app'
import '@firebase/auth'
import { RaisedTextButton } from 'react-native-material-buttons';
import PostSuccessful from '../PostSuccessful'
import { TextField } from 'react-native-material-textfield';
import RNFetchBlob from 'react-native-fetch-blob'
import InsertToFirebase from '../../components/InsertToFirebase';

const {width} = Dimensions.get('window');
const height = width * 0.8;
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

//let imageurl = []

class Carousel extends Component {

  render() {
    
    //alert(firebase.auth().currentUser.uid);
      return (

         <View style = {styles.scrollContainer}>
         <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator>
  
          {this.props.images}

         </ScrollView>

         
         
         </View>

   
      );
  }
}

export default class PostItemScreen4 extends Component {

  
  constructor(props) {
    super(props)
    this.state = {
      page: "PostItemScreen4",
      //imageurl:[]
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.uploadPhoto = this.uploadPhoto.bind(this);
    
  }

  uploadPhoto() {

        const Blob = RNFetchBlob.polyfill.Blob
        const fs = RNFetchBlob.fs
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
        window.Blob = Blob
        const uid = firebase.auth().currentUser.uid
        const timestamp = Date.parse(new Date())
        const imageKey = uid + '_'+ timestamp
        let count = 0;
       
        for(let image of this.props.images) {
          const imagePath = image.path
          
           let uploadBlob = null
            const imageRef = firebase.storage().ref(imageKey).child('dp_'+ count++ +'.jpg')
            let mime = 'image/jpg'
            fs.readFile(image.key,'base64')
            .then((data) => {
              return Blob.build(data, {type:`${mime};BASE64`})    
          })
          .then((blob) => {
             uploadBlob = blob
             var uploadTask =  imageRef.put(blob, {contentTpe:mime}) 

             // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        },
        function (error) {

          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;

            case 'storage/canceled':
              // User canceled the upload
              break;

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        function () {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log('File available at', downloadURL);
            //console.log(this.props.itemtitle);
            if(downloadURL.includes('dp_0.jpg')) {
              //console.log('first image')
              picture1url = downloadURL;
              firebase.database().ref('items/'+imageKey).set(
                {
                  itemid:imageKey,
                  title:itemtitle,
                  description:description,
                  rentingfrom:rentingfrom,
                  rentingtill:rentingtill,
                  rentalprice:rentalprice,
                  per:per,
                  securitydeposit:securitydeposit,
                  condition:condition,
                  categories:categories,
                  dateposted:new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp),
                  picture1url:downloadURL,
                  picture2url:picture2url,
                  picture3url:picture3url
                }
              ).then(() => {
                console.log('First Image Inserted');
                //this.setState({page: 'PostSuccessful'})
              }).catch((error) => {
                console.log(error);
              })
            }

            else if(downloadURL.includes('dp_1.jpg')) {

            //console.log('second image')
            picture2url = downloadURL;
            firebase.database().ref('items/'+imageKey).set(
              {
                  itemid:imageKey,
                  title:itemtitle,
                  description:description,
                  rentingfrom:rentingfrom,
                  rentingtill:rentingtill,
                  rentalprice:rentalprice,
                  per:per,
                  securitydeposit:securitydeposit,
                  condition:condition,
                  categories:categories,
                  dateposted:new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp),
                  picture1url:picture1url,
                  picture2url:downloadURL,
                  picture3url:picture3url
              }
              ).then(() => {
                console.log('Second Image Inserted');
                //this.setState({page: 'PostSuccessful'})
              }).catch((error) => {
                console.log(error);
              })

            }

            else if(downloadURL.includes('dp_2.jpg')) {
            //console.log('third image')
            picture3url = downloadURL;
            firebase.database().ref('items/'+imageKey).set(
              {
                  itemid:imageKey,
                  title:itemtitle,
                  description:description,
                  rentingfrom:rentingfrom,
                  rentingtill:rentingtill,
                  rentalprice:rentalprice,
                  per:per,
                  securitydeposit:securitydeposit,
                  condition:condition,
                  categories:categories,
                  dateposted:new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp),
                  picture1url:picture1url,
                  picture2url:picture2url,
                  picture3url:downloadURL,
              }
              ).then(() => {
                console.log('Third Image Inserted');
                //this.setState({page: 'PostSuccessful'})
              }).catch((error) => {
                console.log(error);
              })
            }
          });
        });
            return uploadTask;
          })
          .then((url) => {
              //console.log(count)
              //console.log(url)
              uploadBlob.close()
          })
          .catch((error) => {
            console.log(error)
        })
      }
      
  }

 

   onSubmit() {
    this.uploadPhoto();   

    // Setting Other Items Data to Firebase
    let dateposted = Date.parse(new Date())
    let itemprimarykey = firebase.auth().currentUser.uid+'_'+ dateposted;
    
    // firebase.database().ref('items/'+itemprimarykey).set(
    //   {
    //     itemid:itemprimarykey,
    //     title:this.props.itemtitle,
    //     description:this.props.description,
    //     rentingfrom:this.props.fromDate,
    //     rentingtill:this.props.toDate,
    //     rentalprice:this.props.price,
    //     per:this.props.per,
    //     securitydeposit:this.props.securitydeposit,
    //     condition:this.props.condition,
    //     categories:this.props.categories,
    //     dateposted:new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(dateposted),
        
    //     // picture1url:firebase.storage().ref(itemprimarykey).child('dp_0.jpg').getDownloadURL().then((url) => {

    //     // })
    //     // picture2url:firebase.storage().ref(itemprimarykey).child('dp_1.jpg').getDownloadURL(),
    //     // picture3url:firebase.storage().ref(itemprimarykey).child('dp_2.jpg').getDownloadURL()
    //   }
      
      

    // ).then(() => {
    //   console.log('Intserted');
    //   this.setState({page: 'PostSuccessful'})
    // }).catch((error) => {
    //   console.log(error);
    // })
  }

  render() {
    
    //console.log('render called with page ' + this.state.page);
    if(this.state.page == 'PostItemScreen4') {
      itemtitle = this.props.itemtitle;
      description = this.props.description;
      rentingfrom = this.props.fromDate;
      rentingtill = this.props.toDate;
      rentalprice = this.props.price;
      per = this.props.per;
      securitydeposit = this.props.securitydeposit; 
      condition = this.props.condition;
      {(this.props.categories).map((category,key) => (
        categories.push(category.name)
       ))}

    return (
      <View style={styles.container}>
        <Carousel images = {this.props.images} />

        <ScrollView pagingEnabled showsVerticalScrollIndicator>
          <Text style = {styles.iteminformation}>
            {this.props.itemtitle}{"\n"}{"\n"}
            Available From:{"\t"}{this.props.fromDate} To: {this.props.toDate} {"\n"}{"\n"}
            Description:{"\t"}{this.props.description}{"\n"}{"\n"}
            Rental Price:{"\t"}{this.props.price} per {this.props.per} {"\n"}{"\n"}
            Security Deposit:{"\t"}{this.props.securitydeposit} {"\n"}{"\n"}
            Item Condition:{"\t"}{this.props.condition} {"\n"}{"\n"}
            Categories: {"\t"}
            {(this.props.categories).map((category,key) => (
             <Text> {category.name} </Text>
            ))}
           
            </Text>
          </ScrollView>

          <RaisedTextButton onPress={this.onSubmit} title='Post Item' color={TextField.defaultProps.tintColor} titleColor='white' />
      </View>
    );
            }

            else {

              return (
                <PostSuccessful />
              );
            }

  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    // paddingTop: 10
    flex:1,
          margin: 8,
          marginBottom: 60,
          //alignItems: 'center',
    justifyContent: 'flex-end',
    width: '85%',
  },
  iteminformation:{
    paddingLeft:10,
    paddingRight:10,
    fontSize:15,
    alignItems: 'center',
    justifyContent: 'center',

  },
  scrollContainer:{
    height,
  },
  image: {
    width,
    height,
  },
});
