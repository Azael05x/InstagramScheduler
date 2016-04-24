'use strict';

var FileSystem = require('react-native-fs');

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
  TimePickerAndroid
} from 'react-native';

import {
  MKButton,
  MKColor,
  MKProgress
} from 'react-native-material-kit';

const DOWNLOAD_PATH = FileSystem.PicturesDirectoryPath + "/instagram-scheduler-app.jpg";

class InstagramPost extends Component {
  constructor(props) {
    super(props);
    var react = this;

    this.constructButtons();

    // Initial State
    this.state = {
      progress: 0,
      downloading: false,
      time: props.time
    }
  }

  constructButtons() {
    var react = this;

    this.syncPicsButton = {
      ...MKButton.coloredButton().toProps(),
      backgroundColor: MKColor.LightBlue,
      onPress: (() => {
        react.publishOnInstagram();
      })
    };
    this.syncPicsButtonText = {
      pointerEvents: 'none',
      style: {
        color: 'white',
        fontWeight: 'bold',
      }
    };
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

  async showPicker() {
    var options = {
      is24Hour: true
    };

    try {
      const {action, minute, hour} = await TimePickerAndroid.open(options);
      var newState = {};
      if (action === TimePickerAndroid.timeSetAction) {
        this.setState({
          time: (hour + ":" + minute)
        });
      } else if (action === TimePickerAndroid.dismissedAction) {

      }
      this.setState(newState);
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  }

  render() {
    var TouchableElement = TouchableNativeFeedback;

    // Downloading progress bar:
    var progressBar = <View />;
    if (this.state.downloading == true) {
      progressBar = <MKProgress progress={this.state.progress} />
    }

    return(
      <View style={style.container}>
        <View style={style.containerProfile}>
          <Image source={{uri: this.props.data.profile}} style={style.containerProfileImage} />
          <Text style={style.profileText}>{this.props.data.username}</Text>
          <View style={style.containerProfileTime}>
            <Text style={style.profileTime}>{this.state.time}</Text>
          </View>
        </View>
        <View style={style.containerImage}>
          <Image
            source={{uri: this.props.data.url}}
            style={style.thumbnail}
          />
        </View>
        <View style={style.containerDetails}>
          <MKButton {...this.syncPicsButton}>
            <Text {...this.syncPicsButtonText}>
              Publish
            </Text>
          </MKButton>

          <View style={style.containerDetailsMore}>
            <TouchableElement onPress={this.showPicker.bind(this)}>
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

var style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 3,
    marginLeft: -1,
    marginRight: -1,
  },
    containerProfile: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 50
    },
      containerProfileImage: {
        height: 40,
        width: 40,
        marginLeft: 10,
        borderRadius: 99
      },
      profileText: {
        marginLeft: 10,
        color: '#125688',
        fontWeight: '500',
      },
      containerProfileTime: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: 10,
      },
        profileTime: {
          color: '#125688',
          fontWeight: '500',
        },
    containerImage: {
      height: 306,
      flex: 1,
    },
      thumbnail: {
        height: 306,
        borderRadius: 0
      },
    containerDetails: {
      height: 50,
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
    },
      containerPublish: {
        height: 50,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#2d6599',
        flexDirection: 'row',
        alignItems: 'center',
      },
        detailsPublish: {
          color: '#fff',
          fontWeight: '500',
        },
      containerDetailsMore: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 50,
      },
        containerDetailsMoreTouchable: {
          height: 50,
          alignItems: 'center',
          flexDirection: 'row',
        },
          detailsMore: {
            height: 8,
            width: 35,
            marginRight: 10,
            marginLeft: 10,
          },
});

module.exports = InstagramPost;
