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

const DOMAIN = "https://schedule.ngrok.io";

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

  _onRefresh(set_refreshing=true) {
    AsyncStorage.getItem("auth").then((auth) => {
      auth = JSON.parse(auth);
      fetch(DOMAIN + "/mobile/pics" + General.getAuthParams(auth), {
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

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderPost.bind(this)}
        renderSeparator={this.renderSeperator}
        refreshControl={this.renderRefresh()}
        renderHeader={this.renderHeader.bind(this)}
        enableEmptySections={true} />
    )
  }

  renderRefresh() {
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh.bind(this)}
        colors={['tomato', 'forestgreen', 'deepskyblue']} />
    );
  }

  renderHeader() {
    return (
      <View style={{flexDirection:'row', height: 40}}>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <Icon.Button name="chevron-left" onPress={this.props.onBack} style={{borderRadius: 0, height: 40}}>
            <Text style={{color: 'white'}}> Back </Text>
          </Icon.Button>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
          <Text> Scheduler </Text>
        </View>
        <View style={{flex: 1}} />
      </View>
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
