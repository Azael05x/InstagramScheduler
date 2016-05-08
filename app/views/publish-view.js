'use strict';
var InstagramPost = require('../components/instagram-post');

import React, {
  Component,
} from 'react';

import {
  BackAndroid,
  Clipboard,
  ToastAndroid,
  AsyncStorage
} from 'react-native';

class PublishView extends Component {
  constructor(props) {
    super(props);

    AsyncStorage.getItem(`custom_caption:${this.props.id}`).then((response) => {
      if (response) {
        Clipboard.setString(JSON.parse(response).caption || '');
        ToastAndroid.show('We have copied caption to clipboard, just paste it in Instagram', ToastAndroid.LONG)
      }
    });

    BackAndroid.addEventListener('hardwareBackPress', this.props.onBackPress);
  };

  render() {
    return (
      <InstagramPost data={this.props} publish={true} />
    )
  };
}

module.exports = PublishView;
