'use strict';
var InstagramPost = require('../components/instagram-post');
var General = require('../helpers/general');

import React, {
  Component,
} from 'react';

import {
  ListView,
  View,
  Text,
  RefreshControl,
  AsyncStorage
} from 'react-native';

var Icon = require('react-native-vector-icons/FontAwesome');

class SchedulerView extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      images: [],
      dataSource: ds.cloneWithRows([]),
      refreshing: false
    };

    this.getImagesFromStorage((images) => {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        images: images,
        dataSource: ds.cloneWithRows(images),
      });
    });
  }

  getImagesFromStorage(callback) {
    AsyncStorage.getItem("images").then((response) => callback(JSON.parse((response || '[]'))))
  }

  handleDelete(id) {
    AsyncStorage.getItem('images').then((images) => {
      images = JSON.parse(images);

      images = images.filter((element) => {
        return element.id != id;
      });

      AsyncStorage.setItem('images', JSON.stringify(images));

      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        images: images,
        dataSource: ds.cloneWithRows(images),
      });
    });
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderPost.bind(this)}
        renderSeparator={this.renderSeperator}
        enableEmptySections={true} />
    )
  }

  renderSeperator(sectionID, rowID) {
    return(
      <View key={sectionID+rowID} style={{height: 4}} />
    );
  };

  renderPost(post) {
    return(
      <InstagramPost data={post} onDelete={() => this.handleDelete.bind(this, post.id)() } />
    );
  };

}


module.exports = SchedulerView;
