'use strict';

import React, {
  Component,
} from 'react';

import {
  Text,
  View
} from 'react-native';

var Icon = require('react-native-vector-icons/FontAwesome');

module.exports = {
  LeftButton: function( route, navigator, index, navState ){
    if (route.index > 0)
      return(
        <Icon.Button name="chevron-left" onPress={() => {
            if (route.index > 0) {
                navigator.pop();
              }
          }}>
          <Text> Back </Text>
        </Icon.Button>
      )
  },
  
  Title: function( route, navigator, index, navState ){
    return(
      <Text style={{flex: 1, alignItems: 'center', textAlign: 'center'}}>Scheduler</Text>
    )
  },

  RightButton: function( route, navigator, index, navState ){
  }
};
