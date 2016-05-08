'use strict';

import React, {
  Component,
} from 'react';

import {
  Navigator,
  View,
  Text
} from 'react-native';

var MenuView = require('../views/menu-view');
var SchedulerView = require('../views/scheduler-view');
var UploadView = require('../views/upload-view');
// var SettingsView = require('../views/settings-view');

class AppNavigator extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <Navigator
        configureScene={() => Navigator.SceneConfigs.HorizontalSwipeJump}
        initialRoute={{name: 'SchedulerView', index: 0}}
        renderScene={this._renderScene.bind(this)}
      />
    )
  };

  _renderScene(route, navigator) {
    if (route.name == 'MenuView')
      return (
        <MenuView navigator={navigator}/>
      );
    else if (route.name == 'SchedulerView')
      return (
        <SchedulerView onBack={() => {
          if (route.index > 0) {
            navigator.pop();
          }
        }} />
      );
    else if (route.name == 'UploadView')
      return (
        <UploadView action={route.action} onBack={() => {
          if (route.index > 0) {
            navigator.pop();
          }
        }} />
      );

    else
      return (
        <View>
          <Text> Routing error </Text>
        </View>
      )
  }
}

module.exports = AppNavigator;
