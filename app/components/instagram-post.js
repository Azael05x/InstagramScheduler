'use strict';

import React, {
  Component,
} from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  NativeModules
} from 'react-native';

import {
  MKButton,
  MKColor,
} from 'react-native-material-kit';

class InstagramPost extends Component {
  constructor(props) {
    super(props);
    var react = this;

    this.syncPicsButton = {
      ...MKButton.coloredButton().toProps(),
      backgroundColor: MKColor.LightBlue,
      onPress: (() => {
        react.openInstagram();
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

  openInstagram() {
    console.log('open-instagram');
  }

  openDetails() {
    console.log('open-details');
  }

  render() {
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }

    return(
      <View style={style.container}>
        <View style={style.containerProfile}>
          <Image source={{uri: this.props.data.profile}} style={style.containerProfileImage} />
          <Text style={style.profileText}>{this.props.data.username}</Text>
          <View style={style.containerProfileTime}>
            <Text style={style.profileTime}>{this.props.data.time}</Text>
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
            <TouchableElement onPress={this.openDetails}>
              <View style={style.containerDetailsMoreTouchable}>
                <Image style={style.detailsMore} resizeMode='stretch' source={require('../../assets/more.png')} />
              </View>
            </TouchableElement>
          </View>
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
        borderRadius: 5
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
