'use strict';

import React, {
  Component,
} from 'react';

import {
  Navigator,
  View,
  Text
} from 'react-native';

var AppNavigatorNode = require('./app-navigator-node');
var MenuView = require('../views/menu-view');
// var SchedulerMobileView = require('../views/scheduler-mobile-view');
var SchedulerDesktopView = require('../views/scheduler-desktop-view');
// var SettingsView = require('../views/settings-view');

class AppNavigator extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <Navigator
        configureScene={() => Navigator.SceneConfigs.FloatFromRight}
        // initialRoute={{name: 'MenuView', index: 0}}
        initialRoute={{name: 'SchedulerDesktopView', index: 0}}
        renderScene={this._renderScene.bind(this)}
        navigationBar={
          <Navigator.NavigationBar routeMapper={ AppNavigatorNode } />
        }
      />
    )
  };

  _renderScene(route, navigator) {
    if (route.name == 'MenuView')
      return (
        <View style={{marginTop: 50}}>
          <MenuView navigator={navigator}/>
        </View>
      );
    else if (route.name == 'SchedulerDesktopView')
      return (
        <SchedulerDesktopView onBack={() => console.warn('back pressed')}/>
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
