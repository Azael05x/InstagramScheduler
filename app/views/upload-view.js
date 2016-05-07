'use strict';
var InstagramPost = require('../components/instagram-post');

import React, {
  Component,
} from 'react';

import {
  View,
  Text
} from 'react-native';

var ImagePickerManager = require('NativeModules').ImagePickerManager;
var FileUpload = require('NativeModules').FileUpload;
var Icon = require('react-native-vector-icons/FontAwesome');

const DOMAIN = "https://schedule.ngrok.io";

class UploadView extends Component {
  constructor(props) {
    super(props);

    this.filePickerOptions = {
      title: 'Select Image', // specify null or empty string to remove the title
      takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
      chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
      cancelButtonTitle: 'Cancel',
      cameraType: 'back', // 'front' or 'back'
      mediaType: 'photo', // 'photo' or 'video'
      videoQuality: 'high', // 'low', 'medium', or 'high'
      durationLimit: 10, // video recording max time in seconds
      maxWidth: 100, // photos only
      maxHeight: 100, // photos only
      aspectX: 2, // android only - aspectX:aspectY, the cropping image's ratio of width to height
      aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
      quality: 1, // 0 to 1, photos only
      angle: 0, // android only, photos only
      allowsEditing: false, // Built in functionality to resize/reposition the image after selection
      noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
      storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
        skipBackup: true, // ios only - image will NOT be backed up to icloud
        path: 'images' // ios only - will save image at /Documents/images rather than the root
      }
    };
  }

  componentDidMount() {
    ImagePickerManager.showImagePicker(this.filePickerOptions, (response) => {
      console.warn('Response = ', JSON.stringify(response));

      if (response.didCancel) {
        console.warn('User cancelled image picker');
      }
      else if (response.error) {
        console.warn('ImagePickerManager Error: ', JSON.stringify(response.error));
      }
      else if (response.customButton) {
        console.warn('User tapped custom button: ', JSON.stringify(response.customButton));
      }
      else {
        // You can display the image using either data:
        const source = {uri: 'data:image/jpeg;base64,' + JSON.stringify(response.data), isStatic: true};

        // // uri (on iOS)
        // const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        // // uri (on android)
        // const source = {uri: response.uri, isStatic: true};

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  render() {
    return(
      <View>

      </View>
    );
  }

}


module.exports = UploadView;
