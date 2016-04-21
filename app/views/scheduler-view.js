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

class SchedulerView extends Component {
  constructor(props) {
    super(props);
    var react = this;
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      images: THUMBS,
      dataSource: ds.cloneWithRows(THUMBS),
    }

    this.syncPicsButton = {
      ...MKButton.coloredButton().toProps(),
      backgroundColor: MKColor.DeepOrange,
      borderRadius: 0,
      onPress: (() => {
        console.log("Hi, it's a colored button!");
        react.syncPhotos();
      }),
    };
    this.syncPicsButtonText = {
      pointerEvents: 'none',
      style: {
        color: 'white',
        fontWeight: 'bold',
      }
    };
  }

  syncPhotos() {
    console.log("SYNC PHOTOS");
  }

  render() {
    return (
      <View>
        <MKButton {...this.syncPicsButton}>
          <Text {...this.syncPicsButtonText}>
            Sync Photos
          </Text>
        </MKButton>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderPost}
          renderSeparator={this.renderSeperator} />
      </View>
    );
  }

  renderSeperator(sectionID, rowID) {
    return(
      <View key={sectionID+rowID} style={{height: 30}} />
    );
  }

  renderPost(post) {
    return(
      <InstagramPost data={post} />
    );
  }

}

const THUMBS = [
  {time: '18:00', username: 'iamaigars', url: 'http://lorempixel.com/1200/1200/sports/', profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {time: '19:00', username: 'iamaigars', url: 'http://lorempixel.com/1000/1000/sports/', profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {time: '20:00', username: 'iamaigars', url: 'http://lorempixel.com/1100/1100/sports/', profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {time: '21:00', username: 'iamaigars', url: 'http://lorempixel.com/900/900/sports/', profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {time: '22:00', username: 'iamaigars', url: 'http://lorempixel.com/800/800/sports/', profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {time: '23:00', username: 'iamaigars', url: 'http://lorempixel.com/1200/1200/sports/', profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {time: '00:00', username: 'iamaigars', url: 'http://lorempixel.com/1200/1200/sports/', profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {time: '01:00', username: 'iamaigars', url: 'http://lorempixel.com/1200/1200/sports/', profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {time: '', username: 'iamaigars', url: 'http://lorempixel.com/1200/1200/sports/', profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {time: '', username: 'iamaigars', url: 'http://lorempixel.com/1200/1200/sports/', profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {time: '', username: 'iamaigars', url: 'http://lorempixel.com/1200/1200/sports/', profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {time: '', username: 'iamaigars', url: 'http://lorempixel.com/1200/1200/sports/', profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {time: '', username: 'iamaigars', url: 'http://lorempixel.com/1200/1200/sports/', profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {time: '', username: 'iamaigars', url: 'http://lorempixel.com/1200/1200/sports/', profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {time: '', username: 'iamaigars', url: 'http://lorempixel.com/1200/1200/sports/', profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
];

module.exports = SchedulerView;
