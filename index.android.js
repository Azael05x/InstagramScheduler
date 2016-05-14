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
  AsyncStorage,
  View,
  Text
} from 'react-native';

var FileSystem = require('react-native-fs');
var Notification = require('./app/helpers/notification');

var AppNavigator = require('./app/navigators/app-navigator');
var LoginNavigator = require('./app/navigators/login-navigator');
var PublishView = require('./app/views/publish-view');

class InstagramScheduler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigator: '',
      navigator_props: {}
    };

    // AsyncStorage.removeItem("auth");

    // !! Neccessary setup:
    FileSystem.mkdir(FileSystem.PicturesDirectoryPath + "/instagram-scheduler-app/");

    // !! Routes:
    // If came from Notification then publish it:
    Notification.listen.bind(this, this.routePublishPhoto)();

    // Check Authentication
    // If hadn't authenticated go to login navigator
    // Else go to app navigator
    AsyncStorage.getItem("auth").then((response) => {
      if (response) {
        this.setState({
          navigator: 'app'
        })
      } else {
        this.setState({
          navigator: 'login'
        });
      }
    });
  }

  onBackPress() {
    switch (this.state.navigator) {
      case 'publish':
        this.setState({
          navigator: 'app',
          navigator_props: {}
        })
        return true;
        break;
      default:
        return false;
        break;
    }
  }

  routePublishPhoto(payload) {
    this.setState({
      navigator: 'publish',
      navigator_props: payload
    });
  }

  onLoggedIn() {
    this.setState({
      navigator: 'app',
      navigator_props: {}
    });
  }

  render() {
    switch (this.state.navigator) {
      case 'app':
        return <AppNavigator {...this.state.navigator_props} />
      case 'login':
        return <LoginNavigator {...this.state.navigator_props} onLoggedIn={this.onLoggedIn.bind(this)} />
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
