'use strict';
var InstagramPost = require('../components/instagram-post');

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

const DOMAIN = "https://schedule.ngrok.io";

class SchedulerView extends Component {
  constructor(props) {
    super(props);
    var react = this;
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      images: this.props.images,
      dataSource: ds.cloneWithRows(this.props.images),
      refreshing: this.props.images == 0
    };

    if (this.props.images == 0) {
      this._onRefresh(false);
    }
  };

  _onRefresh(set_refreshing=true) {
    AsyncStorage.getItem("auth").then((auth) => {
      auth = JSON.parse(auth);
      fetch(DOMAIN + "/mobile/pics" + this.getParams(auth), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((response) => {
        return response.json();
      }).then((json) => {
        var images = json.images;
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        AsyncStorage.setItem("images", JSON.stringify(images));

        this.setState({
          refreshing: false,
          images: images,
          dataSource: ds.cloneWithRows(images)
        });
      });
    });

    if (set_refreshing) {
      this.setState({
        refreshing: true
      });
    }
  }

  getParams(auth_object) {
    return "?user_id=" + auth_object.user_id + "&token=" + auth_object.token;
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        initialListSize={3}
        pageSize={5}
        renderRow={this.renderPost}
        renderSeparator={this.renderSeperator}
        refreshControl={this.renderRefresh()}
        enableEmptySections={true} />
    )
  };

  renderRefresh() {
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh.bind(this)}
        colors={['tomato', 'forestgreen', 'deepskyblue']} />
    );
  }

  renderSeperator(sectionID, rowID) {
    return(
      <View key={sectionID+rowID} style={{height: 4}} />
    );
  };

  renderPost(post) {
    return(
      <InstagramPost data={post} />
    );
  };

}


module.exports = SchedulerView;
