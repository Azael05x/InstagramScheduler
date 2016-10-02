'use strict';

var Icon = require('react-native-vector-icons/FontAwesome');
var style = require('../styles/app-navigator');
var PickerUpload = require('../helpers/picker-upload');

import React, {
  Component,
} from 'react';

import {
  View,
  Text,
  TouchableNativeFeedback
} from 'react-native'

class MenuView extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <View style={style.menu_wrap}>
        <View>
          <Text style={style.menu_heading}> Instagram Scheduler </Text>
        </View>
        <View style={{height: 50}}/>
        <View>
          <Icon.Button name="clock-o" borderRadius={100} backgroundColor={'#34495e'} style={style.menu_button} onPress={() => this.props.navigator.push({name: 'SchedulerView', index: 1})} >
            <Text style={{color: 'white'}}>Schedule Photos</Text>
          </Icon.Button>
        </View>
        <View style={{height: 50}}/>
        <View>
          <Icon.Button name="upload" color={'#2ecc71'} borderRadius={100} backgroundColor={'#34495e'} style={[style.menu_button, style.menu_button_outer]} onPress={PickerUpload.fromStorage}>
            <Text style={{color: '#2ecc71'}}>Upload from Storage</Text>
          </Icon.Button>
        </View>
      </View>
    )
  };
}

module.exports = MenuView;
