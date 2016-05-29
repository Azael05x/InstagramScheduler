'use strict';

var FileSystem = require('react-native-fs');
var style = require('../styles/instagram-post');
var Helper = require('../helpers/general');
var Notification = require('../helpers/notification');
var Icon = require('react-native-vector-icons/FontAwesome');

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
  DeviceEventEmitter,
  ProgressBarAndroid,
  AsyncStorage,
  TextInput,
  ToastAndroid,
  Clipboard
} from 'react-native';

const DOWNLOAD_FOLDER_PATH = FileSystem.PicturesDirectoryPath + "/instagram-scheduler-app";

class InstagramPost extends Component {
  constructor(props) {
    super(props);

    // Initial State
    this.state = {
      progress: 0,
      downloading: false,
      temp_year: null,
      temp_month: null,
      temp_day: null,
      temp_hour: null,
      temp_minute: null,
      notification: {},

      caption_open: false,
      caption: null
    };
  }

  // When component has mounted, get notification data from storage
  // Or if it from notification open, then start Instagrma Publish cycle
  componentDidMount() {
    if (this.props.publish) {
      this.publishOnInstagram()
    } else {
      this.getNotification((notification) => {
        notification = JSON.parse(notification || '{}');
        if (Object.keys(notification).length > 0) {
          // If Notification is Past Due, reset Notification
          if (new Date(notification.year, notification.month,
            notification.day, notification.hour,
            notification.minute) < new Date().getTime())
          {
            this.cancelNotification();
          } else {
            // If Notification is to be fired in future, set it to state
            this.setState({
              notification: notification
            })
          }
        }
      });
    }
  }

  // Publish on Instagram:
  publishOnInstagram() {
    // Get bool if file exists:
    FileSystem.exists(this.getDownloadPath()).then((exists) => {
      // If file exists then: open Instagram Intent for sharing
      if (exists) {
        this.openInstagramIntent();
      // Download image, because file is needed for Instagram Share Intent action
      } else {
        this.download();
        this.setState({
          progress: 0,
          downloading: true
        });
      }
    });
  }

  getDownloadPath() {
    return DOWNLOAD_FOLDER_PATH + "/photo-" + this.props.data.id + "-" + this.props.data.media_id + ".jpg"
  }

  // Download file and open Instagram intent
  download() {
    var link = this.props.data.cdn;

    // Download image from URL
    FileSystem.downloadFile(link, this.getDownloadPath(), function(){}, this.updateProgress.bind(this)).then(() => {
      // Set resseting state and open Instagram Intent
      this.setState({
        downloading: false,
        progress: 0
      }, this.openInstagramIntent);
    });
  }

  // Update Progress of download bar
  updateProgress(progress) {
    this.setState({
      progress: (progress.bytesWritten / progress.contentLength)
    })
  }

  // Checks if file for this image exists and then open Instagram Intent
  openInstagramIntent() {
    AsyncStorage.getItem(`custom_caption:${this.props.data.id}`).then((response) => {
      if (response) {
        Clipboard.setString(JSON.parse(response).caption || '');
        ToastAndroid.show('We have copied caption to clipboard, just paste it in Instagram', ToastAndroid.LONG)
      }

      FileSystem.exists(this.getDownloadPath()).then((exists) => {
        if (exists) {
          NativeModules.InstagramPublish.share(this.getDownloadPath());
        }
      });
    });
  }

  // TIME PICKER + SETTING NOTIFICATIONS
  // Show Date Picker View
  async showDatePicker() {
    try {
      var options = {
        date: new Date(),
        minDate: new Date()
      };

      const {action, year, month, day} = await DatePickerAndroid.open(options);
      // If date choosed
      if (action === DatePickerAndroid.dateSetAction) {
        // Open Time Picker
        this.showTimePicker();

        // Save intermidiate state
        this.setState({
          temp_year: year,
          temp_month: month,
          temp_day: day
        });
      // If pressed canceled
      }
    } catch ({code, message}) {
      console.warn(`Error in example: `, message);
    }
  }

  // Show Time Picker
  async showTimePicker() {
    var options = {
      is24Hour: true
    };

    try {
      const {action, minute, hour} = await TimePickerAndroid.open(options);
      // If time choosed
      if (action === TimePickerAndroid.timeSetAction) {
        // Remove old notification if such existed
        if (this.state.notification.id) {
          Notification.remove(this.state.notification.id);
        }

        // Set intermidiate state so that afterwards we can use it for Notification creation
        this.setState({
          temp_hour: hour,
          temp_minute: minute
        },
        () => {
          Notification.create(this.state.temp_year,
            this.state.temp_month,
            this.state.temp_day,
            this.state.temp_hour,
            this.state.temp_minute,
            this.props.data,
            (notification) =>
            {
              // Create Notification data which we should store in state and storage
              var notification_data = {
                                        id: notification.id,
                                        year: this.state.temp_year,
                                        month: this.state.temp_month,
                                        day: this.state.temp_day,
                                        hour: this.state.temp_hour,
                                        minute: this.state.temp_minute
                                      };
              // Save to storage
              this.storeNotification(notification_data);

              var new_state = this.get_resseted_time_state();
              new_state.notification = notification_data;
              this.setState(new_state);
            }
          );
        });
      }
    } catch ({code, message}) {
      console.warn(`Error in example: `, message);
    }
  }

  cancelNotification() {
    // Remove from AsyncStorage Notification if present
    // Remove Notification
    // Reset State
    if (this.state.notification.id) {
      this.unstoreNotification();
      Notification.remove(this.state.notification.id);
    }
    var new_state = this.get_resseted_time_state();
    new_state.notification = {};
    this.setState(new_state);
  }

  get_resseted_time_state() {
    return({
      temp_year: null,
      temp_month: null,
      temp_day: null,
      temp_hour: null,
      temp_minute: null
    });
  }

  // Notification Async Storage
  getNotification(callback) {
    AsyncStorage.getItem(`notification:${this.props.data.id}`).then(callback);
  }

  storeNotification(notification) {
    AsyncStorage.setItem(`notification:${this.props.data.id}`, JSON.stringify(notification));
  }

  unstoreNotification() {
    AsyncStorage.removeItem(`notification:${this.props.data.id}`);
  }

  // Caption:
  openCaptionBox() {
    this.setState({
      caption_open: !this.state.caption_open
    }, () => {
      if (this.state.caption_open == true && this.state.caption == null) {
        AsyncStorage.getItem(`custom_caption:${this.props.data.id}`).then((response) => {
          if (response) {
            response = JSON.parse(response);
            var caption = response.caption || '';
            this.setState({caption});
          }
        })
      }
    })
  }

  saveCaption() {
    AsyncStorage.setItem(`custom_caption:${this.props.data.id}`, JSON.stringify({caption: this.state.caption}));
  }

  // Renders:
  render() {
    return(
      <View style={style.container}>
        <View style={style.containerProfile}>
          <Image source={{uri: this.props.data.profile_picture}} style={style.containerProfileImage} />
          <Text style={style.profileText}>{this.props.data.username}</Text>
          {this.renderTime()}
        </View>
        <View style={style.containerImage}>
          <Image
            source={{uri: this.props.data.cdn}}
            style={style.thumbnail}
          />
        </View>
        { this.renderFooter() }
        { this.renderProgressBar() }
        { this.renderCaptionInput() }
      </View>
    );
  }

  renderProgressBar() {
    if (this.state.downloading) {
      return(
        <ProgressBarAndroid
          progress={this.state.progress}
          indeterminate={false}
          styleAttr="Horizontal"
          color="darkslateblue" />
      );
    }
    return;
  }

  renderTime() {
    if (this.state.notification.id) {
      return(
        <View style={style.containerProfileTime}>
          <Text style={style.profileTime}>
            <Icon name="bell" /> {" "} {Helper.getPublishDate(this.state.notification)}
          </Text>
        </View>
      );
    }
  }

  renderCaptionInput() {
    if (this.state.caption_open) {
      return(
        <View>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(caption) => this.setState({caption}, this.saveCaption)}
            value={this.state.caption}
            placeholder={"Write your caption here"}
            />
        </View>
      );
    }
  }

  renderFooter() {
    if(this.props.publish == true)
    {
      return(
        this.state.downloading ?
          <Icon.Button name="instagram" borderRadius={0} style={style.containerPublishDisabled}>
            <Text style={style.detailsPublish}>Publish</Text>
          </Icon.Button>
        : <Icon.Button name="instagram" borderRadius={0} style={style.containerPublish} onPress={this.publishOnInstagram.bind(this)}>
            <Text style={style.detailsPublish}>Publish</Text>
          </Icon.Button>
      );
    }
    else
    {
      return(
        <View style={{flex: 1, height: 50, backgroundColor: '#2ecc71'}}>

          <View style={style.containerDetails}>
            <Icon.Button name="instagram" borderRadius={0} style={this.state.downloading ? style.containerPublishDisabled : style.containerPublish} onPress={this.publishOnInstagram.bind(this)}>
              <Text style={style.detailsPublish}>Publish</Text>
            </Icon.Button>

            <Icon.Button
                        name={this.state.notification.id == null ? "calendar" : "calendar-times-o"}
                        borderRadius={0}
                        style={style.dateButton}
                        onPress={this.state.notification.id == null ? this.showDatePicker.bind(this) : this.cancelNotification.bind(this)}>
              <Text style={style.detailsPublish}>{ this.state.notification.id == null ? "Schedule" : "Unschedule" }</Text>
            </Icon.Button>

            <Icon.Button name="comment" style={style.commentButton} borderRadius={0} onPress={this.openCaptionBox.bind(this)}>
              <Text style={style.detailsPublish}>Caption</Text>
            </Icon.Button>

          </View>
        </View>
      );
    }
  }
}
InstagramPost.defaultProps = {
  publish: false
};

module.exports = InstagramPost;
