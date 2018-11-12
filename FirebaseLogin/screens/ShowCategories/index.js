import React, { Component } from 'react';
import {StyleSheet, Text, View,TouchableOpacity, Button, Image, ActivityIndicator } from 'react-native';
import LabelSelect from 'react-native-label-select';


export default class ShowCategories extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      arr: [{
        name: 'Antiques',
        isSelected: false,
        value: 1
      }, {
        name: 'Appliances',
        isSelected: false,
        value: 2
      },{
        name: 'Arts & Crafts',
        isSelected: false,
        value: 3
      },{
        name: 'Audio Equipment',
        isSelected: false,
        value: 4
      },{
        name: 'Auto Parts',
        isSelected: false,
        value: 5
      },{
        name: 'Baby & Kids',
        isSelected: false,
        value: 6
      },{
        name: 'Beauty & Healths',
        isSelected: false,
        value: 7
      },{
        name: 'Bicycles',
        isSelected: false,
        value: 8
      },{
        name: 'Boats & Marine',
        isSelected: false,
        value: 9
      },{
        name: 'Books & Magazines',
        isSelected: false,
        value: 10
      }]
    };
   this.selectConfirm = this.selectConfirm.bind(this);
   this.deleteItem = this.deleteItem.bind(this);
  }
  selectConfirm(list) {
    let {arr} = this.state;
    for (let item of list) {
      let index = arr.findIndex(ele => ele === item);
      if (~index) arr[index].isSelected = true;
      else continue;
    }
    this.setState({arr: arr});
    this.props.callbackFromParent(list);
  }
  deleteItem(item) {
    let {arr} = this.state;
    let index = arr.findIndex(a => a === item);
    arr[index].isSelected = false;
    this.setState({arr: arr});
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Select a Category</Text>
        <LabelSelect
          title="Categories"
          ref="select"
          style={styles.labelSelect}
          onConfirm={this.selectConfirm}
        >
          {this.state.arr.filter(item => item.isSelected).map((item, index) =>
            <LabelSelect.Label
              key={'label-' + index}
              data={item}
              onCancel={() => {this.deleteItem(item);}}
            >{item.name}</LabelSelect.Label>
          )}
          {this.state.arr.filter(item => !item.isSelected).map((item, index) =>
            <LabelSelect.ModalItem
              key={'modal-item-' + index}
              data={item}
            >{item.name}</LabelSelect.ModalItem>
          )}
        </LabelSelect>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    //backgroundColor: '#e3eeee'
  },
  labelSelect: {
    marginTop: 5,
    marginBottom: 20,
    padding: 5,
    borderWidth: 1,
    borderRadius: 6,
    borderStyle: 'dashed',
    borderColor: '#6dc2a2'
  },
  text: {
    fontSize: 16,
    color: 'rgb(13, 131, 144)'
  }
});
