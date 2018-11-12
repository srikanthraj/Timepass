import React, { Component } from 'react';
import {    
  StyleSheet,
  Text,
  View,
  Slider
} from 'react-native';

export default class ShowCondition extends Component {
  constructor(props) {
   super(props)
   this.state = { 
    condition: "",
    stepNumber: 3
    }
  } 
  getVal(val){
    
    if(val == 1) {
    this.setState({ condition: "Other (See Description)", stepNumber:val })
    this.props.callbackFromParent("Other (See Description)");  
    }

    if(val == 2) {
    this.setState({ condition: "For parts" , stepNumber:val})
    this.props.callbackFromParent("For parts");  
    }

    if(val == 3) {
    this.setState({ condition: "Used (Normal Wear)" , stepNumber:val})
    this.props.callbackFromParent("Used (Normal Wear)");    
    }

    if(val == 4) {
    this.setState({ condition: "Open box (Never Used)" , stepNumber:val})
    this.props.callbackFromParent("Open box (Never Used)");      
    }

    if(val == 5) {
    this.setState({ condition: "Reconditioned/Certified" , stepNumber:val})
    this.props.callbackFromParent("Reconditioned/Certified");        
    }

    if(val == 6) {
    this.setState({ condition: "New (Never Used)" , stepNumber:val})
    this.props.callbackFromParent("New (Never Used)");          
    }
    
  }     
  render() {    

    if(this.state.condition == "")
    {
    return (
      <View style={styles.container}>
        <Slider
          style={{ width: 300 }}
          step={1}
          minimumValue={1}
          maximumValue={6}
          value={this.state.stepNumber}
          onValueChange={val => this.setState({ stepNumber: val })}
          onSlidingComplete={ val => this.getVal(val)}
          />
        <Text style={styles.welcome}>Used (Normal Wear)</Text>            
      </View>
    );
    }

    else {

      return (
        <View style={styles.container}>
          <Slider
            style={{ width: 300 }}
            step={1}
            minimumValue={1}
            maximumValue={6}
            value={this.state.stepNumber}
            onValueChange={val => this.setState({ stepNumber: val })}
            onSlidingComplete={ val => this.getVal(val)}
            />
          <Text style={styles.welcome}>{this.state.condition}</Text>            
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});