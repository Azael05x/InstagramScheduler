'use strict';

var React = require('react-native');
var {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  NativeModules
} = React;

var InstagramPost = React.createClass({
  getInitialState() {
    return {

    }
  },

  openInstagram() {
    console.log('open-instagram');
  },

  openDetails() {
    console.log('open-details');
  },

  render: function() {
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
          <TouchableElement onPress={this.openInstagram}>
            <View style={style.containerPublish}>
              <Text style={style.detailsPublish}>
                Publish
              </Text>
            </View>
          </TouchableElement>

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
});

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
