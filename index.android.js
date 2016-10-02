/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

// adb reverse tcp:8081 tcp:8081
// touch ~/.gradle/gradle.properties && echo "org.gradle.daemon=true" >> ~/.gradle/gradle.properties
// react-native run-android

'use strict';

import React, {
  Component,
} from 'react';

import {
  AppRegistry,
  View,
  Text,
  AsyncStorage
} from 'react-native';

var FileSystem = require('react-native-fs');
var Notification = require('./app/helpers/notification');

var AppNavigator = require('./app/navigators/app-navigator');
var PublishView = require('./app/views/publish-view');

class InstagramScheduler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigator: 'app',
      navigator_props: {}
    };

    // !! Neccessary setup:
    FileSystem.mkdir(FileSystem.PicturesDirectoryPath + "/instagram-scheduler-app/");

    // !! Routes:
    // If came from Notification then publish it:
    Notification.listen.bind(this, this.routePublishPhoto)();
  }

  onBackPress() {
    this.setState({
      navigator: 'app',
      navigator_props: {}
    })
    return false;
  }

  routePublishPhoto(payload) {
    this.setState({
      navigator: 'publish',
      navigator_props: payload
    });
  }


  render() {
    switch (this.state.navigator) {
      case 'app':
        return <AppNavigator {...this.state.navigator_props}  onBackPress={this.onBackPress.bind(this)}/>
      case 'publish':
        return <PublishView {...this.state.navigator_props} onBackPress={this.onBackPress.bind(this)} />

      default:
        return (
          <View style={{backgroundColor: '#34495e'}}/>
        );
    }
  }
}

AppRegistry.registerComponent('InstagramScheduler', () => InstagramScheduler);
