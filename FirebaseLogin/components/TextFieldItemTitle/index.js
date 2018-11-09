import React, { Component } from 'react';
import {StyleSheet, Text, View,TouchableOpacity, Button, Image, ActivityIndicator } from 'react-native';
import { RaisedTextButton } from 'react-native-material-buttons';
import { TextField } from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {w, h, totalSize} from '../../api/Dimensions';

// let styles = {
//   scroll: {
//     backgroundColor: '#E8EAF6',
//   },

//   container: {
//     flex:1,
//     margin: 8,
//     marginTop: 24,
//   },

//   contentContainer: {
//     padding: 8,
//   },
// };


  export default class TextFieldItemTitle extends Component {
    constructor(props) {
      super(props);

      this.state = {
        firstname: '',
      };


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



    render() {
      let { errors = {}, ...data } = this.state;
      //let { firstname = 'name', lastname = 'house' } = data;
      
      return (
      
          <View style={styles.container}>
            <TextField
              ref={this.itemTitleRef}
              value={data.itemtitle}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              //onSubmitEditing={this.onSubmitFirstName}
              //returnKeyType='next'
              label='Item Title'
              error={errors.itemtitle}
            />

            <RaisedTextButton onPress={this.onSubmit} title='submit' color={TextField.defaultProps.tintColor} titleColor='white' />

          </View>

        
      );
    }
  }

  const styles = StyleSheet.create({
    // scroll: {
    //       backgroundColor: '#E8EAF6',
    //     },
      
        container: {
          flex:1,
          margin: 8,
          marginBottom: 24,
          //alignItems: 'center',
    //justifyContent: 'center',
    width: '85%',
        },
  });

  