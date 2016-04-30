/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

// adb reverse tcp:8081 tcp:8081
// react-native run-android

'use strict';

import React, {
  Component,
} from 'react';

import {
  AppRegistry,
  BackAndroid,
  View,
  AsyncStorage
} from 'react-native';

var FileSystem = require('react-native-fs');
var Notification = require('./app/helpers/notification');


var SchedulerView = require('./app/views/scheduler-view');
var PublishView = require('./app/views/publish-view');
var LoginView = require('./app/views/login-view');

class InstagramScheduler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: '',
      route_props: {}
    };

    // AsyncStorage.removeItem("auth");

    // Neccessary setup:
    BackAndroid.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
    FileSystem.mkdir(FileSystem.PicturesDirectoryPath + "/instagram-scheduler-app/");

    // Routes:
    // If came from Notification:
    Notification.listen.bind(this, this.routePublishPhoto)();
    // Check Authentication
    // If hadn't authenticated go to login route
    // Else go to scheduler route
    AsyncStorage.getItem("auth").then((response) => {
      if (response) {
        AsyncStorage.getItem("images").then((response) => {
          this.setState({
            route: 'scheduler',
            route_props: (JSON.parse(response) || [])
          })
        })
      } else {
        this.setState({
          route: 'login'
        });
      }
    });
  }

  onBackPress() {
    switch (this.state.route) {
      case 'publish':
        this.setState({
          route: 'scheduler',
          route_props: {}
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
      route: 'publish',
      route_props: payload
    });
  }

  render() {
    if (this.state.route == 'scheduler')
      return (
        <SchedulerView images={this.state.route_props} />
      );
    else if (this.state.route == 'publish')
      return (
        <PublishView data={this.state.route_props} />
      );
    else if (this.state.route == 'login')
      return (
        <LoginView loggedIn={(() => {
          this.setState({
            route: 'scheduler'
          });
        }).bind(this)} />
      );

    else
      return (
        <View />
      )
  }
}

AppRegistry.registerComponent('InstagramScheduler', () => InstagramScheduler);
