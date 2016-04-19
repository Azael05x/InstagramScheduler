'use strict';

var React = require('react-native');
var {
  ListView,
  View,
  Text
} = React;

var InstagramPost = require('../components/instagram-post');

var SchedulerView = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(THUMBS),
    };
  },

  render: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderPost}
        renderSeparator={this.renderSeperator} />
    );
  },

  renderSeperator: function(sectionID, rowID) {
    return(
      <View key={sectionID+rowID} style={{height: 30}} />
    );
  },

  renderPost: function(post) {
    return(
      <InstagramPost data={post} />
    );
  }

});

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