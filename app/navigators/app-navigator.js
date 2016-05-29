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
var PublishView = require('../views/publish-view');

class AppNavigator extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <Navigator
        configureScene={() => Navigator.SceneConfigs.HorizontalSwipeJump}
        initialRoute={{name: 'MenuView', index: 0}}
        renderScene={this._renderScene.bind(this)}
        onItemRef={(ref, index, route) => {
            console.warn('here');
            route.sceneRef = ref;
          }
        }
        onDidFocus={
          function(route) {
            if (route.sceneRef && route.sceneRef.sceneDidFocus)
              route.sceneRef.sceneDidFocus();
          }
        }
      />
    )
  };

  _renderScene(route, navigator) {
    if (route.name == 'MenuView')
      return (
        <MenuView navigator={navigator} onLogOut={this.props.onLogOut}/>
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
        <PublishView action={route.action} onBack={() => {
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
