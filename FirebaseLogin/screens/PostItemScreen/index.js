import React, { Component } from 'react';
import {StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {w, h, totalSize} from '../../api/Dimensions';

export default class PostItemScreen extends Component {

      getStarted = () => {
          alert('works');
      }
  render() {
    return (
    
        <View style={styles.container}>
        <TouchableOpacity
        onPress={this.getStarted}
        style={styles.button}
        activeOpacity={0.6}
      >
        <Text style={styles.text}>Take Photo</Text>
      </TouchableOpacity>

    <TouchableOpacity
    onPress={this.getStarted}
    style={styles.button}
    activeOpacity={0.6}
    >
    <Text style={styles.text}>Select Photo</Text>
    </TouchableOpacity>

    </View>
    );
       
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
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
