'use strict';

var Icon = require('react-native-vector-icons/FontAwesome');

import React, {
  Component,
} from 'react';

import {
  View,
  Text
} from 'react-native'

class MenuView extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
        <Icon.Button name="clock-o" style={{ borderRadius: 0, height: 50, justifyContent: 'center' }} onPress={() => this.props.navigator.push({name: 'SchedulerView', index: 1})} >
          <Text style={{color: 'white'}}>Schedule</Text>
        </Icon.Button>
        <View style={{height: 10}}/>
        <Icon.Button name="upload" style={{ borderRadius: 0, height: 50, justifyContent: 'center' }} onPress={() => this.props.navigator.push({name: 'UploadView', index: 1, action: 'storage'})}>
          <Text style={{color: 'white'}}>Upload from Storage</Text>
        </Icon.Button>
        <View style={{height: 10}}/>
        <Icon.Button name="camera" style={{ borderRadius: 0, height: 50, justifyContent: 'center' }} onPress={() => this.props.navigator.push({name: 'UploadView', index: 1, action: 'camera'})}>
          <Text style={{color: 'white'}}>Capture with Camera</Text>
        </Icon.Button>
      </View>
    )
  };
}

module.exports = MenuView;
