import React, { Component } from 'react';
import {    
  StyleSheet,
  Text,
  View,
  Slider,
  Picker
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { RaisedTextButton } from 'react-native-material-buttons';
import { TextField } from 'react-native-material-textfield';

export default class UserProfileScreen extends Component {
  constructor(props) {
   super(props)
   this.state = { 
    price: '', 
    fromDate:new Date().toDateString(),
    toDate:new Date().toDateString(),
    per: 'Day',
    securitydeposit:''
    }

    this.onChangeText = this.onChangeText.bind(this);

    this.priceRef = this.updateRef.bind(this, 'price');
    this.securityDepositRef = this.updateRef.bind(this, 'securitydeposit');  
  }
  
  onChangeText(text) {
    ['price','securitydeposit']
      .map((name) => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.isFocused()) {
          this.setState({ [name]: text });
        }
      });
  }

  updateRef(name, ref) {
    this[name] = ref;
  }
     
  render() {    

    let {...data } = this.state;

    return (
      
      <View style={styles.container}>
      <View style={styles.container}>
         <Text>Renting Period</Text>
         <Text>From:</Text>
         <DatePicker
        style={{width: 200}}
        date={this.state.fromDate}
        mode="date"
        placeholder="select date"
        format="MM-DD-YYYY"
        minDate="01-01-2015"
        maxDate="01-01-9999"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({fromDate: date})}}
      /> 

      <Text>To:</Text>
      <DatePicker
        style={{width: 200}}
        date={this.state.toDate}
        mode="date"
        placeholder="select date"
        format="MM-DD-YYYY"
        minDate="01-01-2015"
        maxDate="01-01-9999"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({toDate: date})}}
      />

<TextField
              ref={this.securityDepositRef}
              value={data.securitydeposit}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              keyboardType = 'numeric'
              // onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              //onSubmitEditing={this.onSubmitFirstName}
              //returnKeyType='next'
              label='Security Deposit'
              // error={errors.itemtitle}
              //characterRestriction={140}
            />

      <TextField
              ref={this.priceRef}
              value={data.price}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              keyboardType = 'numeric'
              // onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              //onSubmitEditing={this.onSubmitFirstName}
              //returnKeyType='next'
              label='Rent Price'
              // error={errors.itemtitle}
              //characterRestriction={140}
            />

      <Text>Per:</Text>  
      <Picker
  selectedValue={this.state.per}
  style={{ height: 20, width: 100 }}
  onValueChange={(itemValue, itemIndex) => this.setState({per: itemValue})}>
  
  <Picker.Item label="Hour" value="Hour" />
  <Picker.Item label="Day" value="Day" />
  <Picker.Item label="Week" value="Week" />
  <Picker.Item label="Month" value="Month" />
  
</Picker>      


      </View>
      <RaisedTextButton onPress={this.onSubmit} title='Next' color={TextField.defaultProps.tintColor} titleColor='white' />      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    //margin: 8,
    marginTop: "10%",
    marginTop: "20%",
    justifyContent: 'flex-start',
    width: '85%',
  },
 
});