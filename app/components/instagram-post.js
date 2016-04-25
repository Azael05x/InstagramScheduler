'use strict';

var FileSystem = require('react-native-fs');
var style = require('../styles/instagram-post');
var Helper = require('../helpers/general');
var Notification = require('../helpers/notification');

import React, {
  Component,
} from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  NativeModules,
  TimePickerAndroid,
  DatePickerAndroid,
  DeviceEventEmitter
} from 'react-native';

const DOWNLOAD_PATH = FileSystem.PicturesDirectoryPath + "/instagram-scheduler-app.jpg";

class InstagramPost extends Component {
  constructor(props) {
    super(props);
    var react = this;

    // Initial State
    this.state = {
      progress: 0,
      downloading: false,
      year: null,
      month: null,
      day: null,
      hour: null,
      minute: null
    }
  }

  resetTimeState() {
    this.setState({
      year: null,
      month: null,
      day: null,
      hour: null,
      minute: null
    })
  }

  publishOnInstagram() {
    var react = this;
    react.download();
    react.setState({
      progress: 0,
      downloading: true
    });
  }

  download() {
    var react = this;
    var link = this.props.data.url;

    FileSystem.downloadFile(link, DOWNLOAD_PATH, function(){}, this.updateProgress.bind(react)).then(() => {
      react.setState({
        progress: 1
      });

      // For an effect
      new Promise(function(resolve, reject) {
        react.setState({
          downloading: false,
          progress: 0
        }, react.openInstagramIntent);
      })
    });
  }

  updateProgress(progress) {
    this.setState({
      progress: (progress.bytesWritten / progress.contentLength)
    })
  }

  openInstagramIntent() {
    FileSystem.exists(DOWNLOAD_PATH).then((exists) => {
      if (exists) {
        NativeModules.InstagramPublish.share(DOWNLOAD_PATH);
      }
    });
  }

  async showDatePicker() {
    try {
      var options = {
        date: new Date(),
        minDate: new Date()
      };
      var newState = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action === DatePickerAndroid.dateSetAction) {
        this.showTimePicker();

        var date = new Date(year, month, day);
        this.setState({
          year: year,
          month: month,
          day: day
        });
      } else {
        this.resetTimeState()
      }
    } catch ({code, message}) {
      console.warn(`Error in example: `, message);
    }
  }

  async showTimePicker() {
    var options = {
      is24Hour: true
    };

    try {
      const {action, minute, hour} = await TimePickerAndroid.open(options);
      if (action === TimePickerAndroid.timeSetAction) {
        Notification.createNotification(this.state.year, this.state.month, this.state.day, hour, minute);

        this.setState({
          hour: hour,
          minute: minute
        });
      } else if (action === TimePickerAndroid.dismissedAction) {
        this.resetTimeState()
      }
    } catch ({code, message}) {
      console.warn(`Error in example: `, message);
    }
  }

  render() {
    var TouchableElement = TouchableNativeFeedback;

    // Downloading progress bar:
    var progressBar = <View />;
    if (this.state.downloading == true) {
    }

    return(
      <View style={style.container}>
        <View style={style.containerProfile}>
          <Image source={{uri: this.props.data.profile}} style={style.containerProfileImage} />
          <Text style={style.profileText}>{this.props.data.username}</Text>
          <View style={style.containerProfileTime}>
            <Text style={style.profileTime}>{Helper.getPublishDate(this.state.year, this.state.month, this.state.day, this.state.hour, this.state.minute)}</Text>
          </View>
        </View>
        <View style={style.containerImage}>
          <Image
            source={{uri: this.props.data.url}}
            style={style.thumbnail}
          />
        </View>
        <View style={style.containerDetails}>
          <TouchableElement onPress={this.publishOnInstagram.bind(this)}>
            <View style={style.containerPublish}>
              <Text style={style.detailsPublish}>Publish</Text>
            </View>
          </TouchableElement>

          <View style={style.containerDetailsMore}>
            <TouchableElement onPress={this.showDatePicker.bind(this)}>
              <View style={style.containerDetailsMoreTouchable}>
                <Image style={style.detailsMore} resizeMode='stretch' source={require('../../assets/more.png')} />
              </View>
            </TouchableElement>
          </View>
        </View>
        <View>
          {progressBar}
        </View>
      </View>
    );
  }
}

module.exports = InstagramPost;
