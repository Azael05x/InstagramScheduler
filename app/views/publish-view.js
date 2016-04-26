'use strict';
var InstagramPost = require('../components/instagram-post');

import React, {
  Component,
} from 'react';

import {
  ListView,
  View,
  Text
} from 'react-native';

import {
  MKButton,
  MKColor,
} from 'react-native-material-kit';

class PublishView extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <InstagramPost {...this.props} publish={true} />
    )
  };
}

module.exports = PublishView;
