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
      <View>
        <Icon.Button name="desktop" onPress={() => this.props.navigator.push({name: 'SchedulerDesktopView', index: 1})} >
          <Text>From Desktop</Text>
        </Icon.Button>
        <Icon.Button name="mobile" onPress={() => this.props.navigator.push({name: 'SchedulerMobileView', index: 1})}>
          <Text>From Mobile</Text>
        </Icon.Button>
        <Icon.Button name="cog" onPress={() => this.props.navigator.push({name: 'SettingsView', index: 1})}>
          <Text>Settings</Text>
        </Icon.Button>
      </View>
    )
  };
}

module.exports = MenuView;
