'use strict';
var InstagramPost = require('../components/instagram-post');

import React, {
  Component,
} from 'react';

import {
  BackAndroid,
} from 'react-native';

class PublishView extends Component {
  constructor(props) {
    super(props);

    BackAndroid.addEventListener('hardwareBackPress', this.props.onBackPress);
  };

  render() {
    return (
      <InstagramPost data={this.props} publish={true} />
    )
  };
}

module.exports = PublishView;
