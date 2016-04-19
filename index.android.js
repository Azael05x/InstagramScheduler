/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

// adb reverse tcp:8081 tcp:8081
// react-native run-android

'use strict';
import React, {
  AppRegistry,
  Component,
} from 'react-native';

var SchedulerView = require('./app/views/scheduler-view');

class InstagramScheduler extends Component {
  render() {
    return (
      <SchedulerView />
    );
  }
}

AppRegistry.registerComponent('InstagramScheduler', () => InstagramScheduler);
