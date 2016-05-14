'use strict';

import React, {
  Component,
} from 'react';

import {
  Navigator
} from 'react-native';

var LoginView = require('../views/login-view');

class LoginNavigator extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <Navigator
        initialRoute={{name: 'My First Scene', index: 0}}
        renderScene={(route, navigator) =>
          <LoginView loggedIn={this.props.onLoggedIn} />
        }
      />
    )
  };
}

module.exports = LoginNavigator;
