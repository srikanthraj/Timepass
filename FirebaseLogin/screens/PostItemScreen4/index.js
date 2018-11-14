import React, { Component } from 'react';
import {StyleSheet, Text, View,ScrollView, Dimensions, Image } from 'react-native';
import RNSwiper from 'react-native-3d-swiper';
import firebase from '@firebase/app'
import '@firebase/auth'
import { RaisedTextButton } from 'react-native-material-buttons';
import PostSuccessful from '../PostSuccessful'
import { TextField } from 'react-native-material-textfield';
import RNFetchBlob from 'react-native-fetch-blob'

const {width} = Dimensions.get('window');
const height = width * 0.8;

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

    //     <RNSwiper style={styles.scrollContainer}
    //   minimumScale={0.7}  //scale of out of focus components
    //   minimumOpacity={0.6} // opacity of out of focus components
    //   overlap={0}  // the degree to which components overlap.  
    //   cardWidth={width} // the width of each component
    //   duration={100} // animation duration on swipe
    //   swipeThreshold={100}
    //   //onSwipeUp={this.onSwipeUp}
    //   >


    //    {this.props.images}     
    // </RNSwiper>
      );
  }
}

export default class PostItemScreen4 extends Component {

  
  constructor(props) {
    super(props)
    this.state = {
      page: "PostItemScreen4",
      imageurl:[]
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.uploadPhoto = this.uploadPhoto.bind(this);
  }

 async uploadPhoto() {

    

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
             return imageRef.put(blob, {contentTpe:mime})     
          })
          .then(() => {
            //console.log(imageRef.getDownloadURL())
              uploadBlob.close()
              
              imageRef.getDownloadURL().then((url) => {
                //imageurl.push(url);
                this.setState({
                  imageurl: [...this.state.imageurl, url],  
              }); 
              //console.log(this.state.imageurl);
              })
          })
          .catch((error) => {
            console.log(error)
        })
      }
      
        }



  onSubmit() {
    
    (async () => {
      await this.uploadPhoto();
  })();

    // Setting Other Items Data to Firebase
    let dateposted = Date.parse(new Date())
    let itemprimarykey = firebase.auth().currentUser.uid+'_'+ dateposted;
    // let image1Path = firebase.storage().ref().child(itemprimarykey).child('dp_0.jpg'); 
    // image1Path.getDownloadURL().then((url) => {
    //   image1url = url;

    // });
    
    console.log(this.state.imageurl.length);
    
    this.state.imageurl.map(image => {
            
      console.log(image);
   });
    
    firebase.database().ref('items/'+itemprimarykey).set(
      {
        itemid:itemprimarykey,
        title:this.props.itemtitle,
        description:this.props.description,
        rentingfrom:this.props.fromDate,
        rentingtill:this.props.toDate,
        rentalprice:this.props.price,
        per:this.props.per,
        securitydeposit:this.props.securitydeposit,
        condition:this.props.condition,
        categories:this.props.categories,
        dateposted:new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(dateposted),
        // picture1url:firebase.storage().ref(itemprimarykey).child(itemprimarykey+'/dp_0.jpg').getDownloadURL()
        // picture2url:firebase.storage().ref(itemprimarykey).child('dp_1.jpg').getDownloadURL(),
        // picture3url:firebase.storage().ref(itemprimarykey).child('dp_2.jpg').getDownloadURL()
      }
      

    ).then(() => {
      console.log('Intserted');
      this.setState({page: 'PostSuccessful'})
    }).catch((error) => {
      console.log(error);
    })

}

  render() {
    
    if(this.state.page == 'PostItemScreen4') {
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
