'use strict';
var InstagramPost = require('../components/instagram-post');

import React, {
  Component,
} from 'react';

import {
  ListView,
  View,
  Text,
  RefreshControl
} from 'react-native';

class SchedulerView extends Component {
  constructor(props) {
    super(props);
    var react = this;
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      images: THUMBS,
      dataSource: ds.cloneWithRows(THUMBS),
      refreshing: false
    };
  };

  _onRefresh() {
    var react = this;
    new Promise(function(resolve, reject) {
    	setTimeout(function() {
        resolve();
      }, 5000)
    }).then(() => {react.setState({refreshing: false})})
    react.setState({
      refreshing: true
    });
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        initialListSize={3}
        pageSize={5}
        renderRow={this.renderPost}
        renderSeparator={this.renderSeperator}
        refreshControl={this.renderRefresh()} />
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
      <View key={sectionID+rowID} style={{height: 30}} />
    );
  };

  renderPost(post) {
    return(
      <InstagramPost data={post} />
    );
  };

}

const THUMBS = [
  {id: 1, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/11379925_572014776289415_1652671942_n.jpg?ig_cache_key=MTIxMzEzMDY2NTM5NzQ3ODI2Ng%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 2, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/11259869_1584280688562925_636650324_n.jpg?ig_cache_key=MTE5ODUzMjAzODc5MjQ3MTM5Mg%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 3, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/e15/12784058_961832577235262_1364469160_n.jpg?ig_cache_key=MTE5MzMwNzQ2MzI5NzE2MzMwMQ%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 4, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/sh0.08/e35/p640x640/12728444_1703792063200424_572411268_n.jpg?ig_cache_key=MTE4NDQyMTY1NzEyMzkwNjEyMA%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 5, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/12276784_921466431267750_1782043432_n.jpg?ig_cache_key=MTEzMDUwMjQ4NTc0NzA2NTA0Mw%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 6, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/sh0.08/e35/p640x640/11372080_1027786177278267_1530068525_n.jpg?ig_cache_key=MTExMjM4NzU4NjMxOTg2ODQzNw%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 7, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/12141965_755851214543313_419004948_n.jpg?ig_cache_key=MTA5Njk2Nzg1ODcxMzY4MjEzNg%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 8, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/sh0.08/e35/p640x640/11349297_1688899341347058_180258968_n.jpg?ig_cache_key=MTA5NDY2MTMxMTc3Mzk1ODM3MA%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 9, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/12107405_888796154552704_1480400683_n.jpg?ig_cache_key=MTA4OTY0NTM0OTUxNzU0OTc4OA%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 10, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/12081255_909172179172938_969594869_n.jpg?ig_cache_key=MTA4NzYwNzIwNDc3Mjk5NTMzMQ%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 11, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/12135212_1647153505501574_1404438946_n.jpg?ig_cache_key=MTA4Njg0NDAxMTAyOTA5NDQ4NQ%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 12, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/sh0.08/e35/p640x640/11887210_1470168983289067_218446397_n.jpg?ig_cache_key=MTA2ODE4ODc0MDA0ODI4MjU0Mg%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 13, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/11925586_806347276130015_393188600_n.jpg?ig_cache_key=MTA2NjY5NzkxNjMxNTc1NDcyMw%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 14, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/11821154_669924373142920_1086157051_n.jpg?ig_cache_key=MTA2MTMwOTI0MDU3MjI3MzU1NA%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 15, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/11875579_942466722461197_432055888_n.jpg?ig_cache_key=MTA1ODc2OTExOTUyMDEyMTUzNw%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 16, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/11856840_1616704571922761_257892204_n.jpg?ig_cache_key=MTA1NTgwODY4NzY3NTE3MTU2NQ%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 17, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/10817872_1481528428826614_586724269_n.jpg?ig_cache_key=MTA1Mjk1OTIwNTE1MzQ2NDYxOA%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 18, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/11850149_661753350592878_1461454460_n.jpg?ig_cache_key=MTA1Mjg4ODIzMDM5OTQ2Nzk1OA%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 19, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/11849020_903246823076404_1591591028_n.jpg?ig_cache_key=MTA1MjA1OTkxOTk3NjkxNTU1OA%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 20, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/11849841_1479512195681790_1179909188_n.jpg?ig_cache_key=MTA0NTY4ODA3MjI5NzQwNzE4NA%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 21, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/10809784_1495729850566713_733876897_n.jpg?ig_cache_key=MTA0Mjg0NjU4MjUxNjkwMDYwOA%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 22, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/e15/11820579_129620707377865_1971859135_n.jpg?ig_cache_key=MTA0MjEzODQ4OTY0NjYzNzQyMQ%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 23, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/11355759_1476577405993822_931237036_n.jpg?ig_cache_key=MTA0MjAxNzA4OTE5MTU2Nzc5NQ%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 24, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/11249182_876564372451358_1235023175_n.jpg?ig_cache_key=MTAzNzA5NTU5MjcyNzU2ODc4Ng%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 25, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/e15/11419275_481562232011176_905908597_n.jpg?ig_cache_key=MTAzNjQwNzI3NTMxMjgwMDE4OQ%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 26, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/11420819_446233412230009_257317010_n.jpg?ig_cache_key=MTAyMTY4NDUzNzgzNDc1ODk5OQ%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 27, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/e15/11336171_469139879913493_196892436_n.jpg?ig_cache_key=MTAxMzk0Nzg0Nzg0NjI4OTk0Mw%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 28, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/e15/11248222_771476509638013_1978012708_n.jpg?ig_cache_key=OTg1NDg0MDU2NzM3NTA2MDkw.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 29, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/e15/11280266_835773926515736_385032497_n.jpg?ig_cache_key=OTg1MzU5MTYyNjUzNjk2MTgy.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 30, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/e15/11190683_1597599267184364_1307180534_n.jpg?ig_cache_key=OTg0NTA5NTM2ODIwMTU5MjMy.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 31, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/e15/11232630_1659150537676668_477121537_n.jpg?ig_cache_key=OTc5ODA0NzQ1MTg3NjE1Mjg3.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 32, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/e15/11055893_1542143872704175_1744065764_n.jpg?ig_cache_key=OTM0Nzc3MTM1MDgwODI1ODAx.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 33, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/e15/10950581_1564632603776045_1207679383_n.jpg?ig_cache_key=OTA1MTY4NjI2MDYwMjU2MDMz.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 34, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/e15/10899577_378841718943484_2122078517_n.jpg?ig_cache_key=ODkxMjI1MDkyNTIxMzU0MDIz.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 35, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/e15/10899485_211884542315460_1786675843_n.jpg?ig_cache_key=ODg2MzI2NjIzMjIyNTIyNTQ0.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 36, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/e15/10838584_397578370393031_543348437_n.jpg?ig_cache_key=ODgzMTkyOTYxNjgxNDgyMDgy.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 37, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/e15/10853095_428978900588003_1357659518_n.jpg?ig_cache_key=ODc2NjE5MDMxMzY5OTAwMDQ4.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 38, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/e15/10542764_1493310054274083_281744690_n.jpg?ig_cache_key=ODIzNzk4MzkxNTIxMDQzMjY0.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 39, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/e15/914351_1422579284680380_1244934742_n.jpg?ig_cache_key=NzIyODg1Mjc1MjUwMjIyMDIy.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 40, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/12424629_1688277368112129_231395229_n.jpg?ig_cache_key=MTIwNjYzMzMyODgxNDc0NDE4NA%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 41, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/12104966_1677806255838980_660439881_n.jpg?ig_cache_key=MTA4NzYzNzYxNDI4MjMwMTQ4Mw%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 42, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/sh0.08/e35/p640x640/11887210_1470168983289067_218446397_n.jpg?ig_cache_key=MTA2ODE4ODc0MDA0ODI4MjU0Mg%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 43, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/11934851_966142370149716_65585368_n.jpg?ig_cache_key=MTIyMjk3ODU3MDcyMDUyMjU5Mg%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'},
  {id: 44, time: '18:00', username: 'iamaigars', url: "https://scontent.cdninstagram.com/t51.2885-15/s480x480/e35/12231003_683667548441264_2011716283_n.jpg?ig_cache_key=MTIyMjk3NzQyODk3ODI4MDA2Nw%3D%3D.2", profile: 'https://scontent-ams3-1.cdninstagram.com/t51.2885-19/s150x150/11821657_939173349476177_1511397910_a.jpg'}
];

module.exports = SchedulerView;
