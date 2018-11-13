import React, { Component } from 'react';
import {StyleSheet, Text, View,ScrollView, Dimensions, Image } from 'react-native';
import RNSwiper from 'react-native-3d-swiper';

const {width} = Dimensions.get('window');
const height = width * 0.8;

class Carousel extends Component {

  render() {
    
    let images = this.props.images
    //alert(images[0].path)
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
  render() {
    
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 10
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
