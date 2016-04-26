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
} from 'react-native';

var SchedulerView = require('./app/views/scheduler-view');
var PublishView = require('./app/views/publish-view');
var Notification = require('./app/helpers/notification');

class InstagramScheduler extends Component {
  constructor(props) {
    super(props);
    Notification.listen.bind(this, this.renderPublishPhoto)();

    this.state = {
      route: 'scheduler',
      route_props: {}
    };
  }

  renderPublishPhoto(payload) {
    this.setState({
      route: 'publish',
      route_props: payload
    });
  }

  render() {
    if (this.state.route == 'scheduler')
      return (
        <SchedulerView />
      );
    else if (this.state.route == 'publish')
      return (
        <PublishView data={this.state.route_props} />
      );
  }
}

AppRegistry.registerComponent('InstagramScheduler', () => InstagramScheduler);
