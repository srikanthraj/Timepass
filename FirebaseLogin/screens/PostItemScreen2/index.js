import React, { Component } from 'react';
import {StyleSheet, Text, View,TouchableOpacity, Button, Image, ActivityIndicator, Slider } from 'react-native';
import { RaisedTextButton } from 'react-native-material-buttons';
import { TextField } from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {w, h, totalSize} from '../../api/Dimensions';
import PostItemScreen3 from '../PostItemScreen3';
import RNSwiper from 'react-native-3d-swiper';
import ShowCategories from '../ShowCategories';
import ShowCondition from '../../components/ShowCondition';

  export default class PostItemScreen2 extends Component {
    constructor(props) {
      super(props);

      this.state = {
        description: '',
        page: "PostItemScreen2",
        dataFromShowCategories: null,
        dataFromShowCondition:''
      };


      // this.onFocus = this.onFocus.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onChangeText = this.onChangeText.bind(this);
      //this.onSubmitItemTitle = this.onSubmitItemTitle.bind(this);
      this.descriptionRef = this.updateRef.bind(this, 'description');  
      
    }

    

    // Methods to Handle the behaviour of text Field and Button

    // onFocus() {
    //   let { errors = {} } = this.state;

    //   for (let name in errors) {
    //     let ref = this[name];

    //     if (ref && ref.isFocused()) {
    //       delete errors[name];
    //     }
    //   }

    //   this.setState({ errors });
    // }

    myCallbackForCategories = (dataFromShowCategories) => {
      this.setState({ dataFromShowCategories: dataFromShowCategories });
    }

    myCallbackForCondition = (dataFromShowCondition) => {
      this.setState({ dataFromShowCondition: dataFromShowCondition });
    }

    onChangeText(text) {
      ['description']
        .map((name) => ({ name, ref: this[name] }))
        .forEach(({ name, ref }) => {
          if (ref.isFocused()) {
            this.setState({ [name]: text });
          }
        });
    }


    onSubmit() {      
            this.setState({page: 'PostItemScreen3'})
    }

    updateRef(name, ref) {
      this[name] = ref;
    }



    render() {
      let {...data } = this.state;
  
      //let { firstname = 'name', lastname = 'house' } = data;
      
      if(this.state.page == 'PostItemScreen2') {
      return (
      
        
          <View style={styles.container}>
            <ShowCategories callbackFromParent={this.myCallbackForCategories}/>
            <Text>Condition:</Text>
            <ShowCondition callbackFromParent={this.myCallbackForCondition}/>
            <TextField
              ref={this.descriptionRef}
              value={data.description}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              
              // onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              //onSubmitEditing={this.onSubmitFirstName}
              //returnKeyType='next'
              label='Description(Optional)'
              // error={errors.itemtitle}
              multiline={true}
              //characterRestriction={140}
            />

            <RaisedTextButton onPress={this.onSubmit} title='Next' color={TextField.defaultProps.tintColor} titleColor='white' />

          </View>

        
      );
      }

      else if(this.state.page == 'PostItemScreen3') {

        if(this.state.dataFromShowCategories ==  null)
        this.setState({ dataFromShowCategories: [] });
        return (
          
          <PostItemScreen3 description = {this.state.description} categories = {this.state.dataFromShowCategories} condition = {this.state.dataFromShowCondition} itemtitle={this.props.itemtitle} images={this.props.images}/>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    // scroll: {
    //       backgroundColor: '#E8EAF6',
    //     },
      
        container: {
          flex:1,
          margin: 8,
          marginBottom: 60,
          //alignItems: 'center',
    justifyContent: 'flex-end',
    width: '85%',
        },
  });

 