'use strict';
var InstagramPost = require('../components/instagram-post');
var General = require('../helpers/general');

import React, {
  Component,
} from 'react';

import {
  View,
  Text,
  AsyncStorage,
  Image
} from 'react-native';

var ImagePickerManager = require('NativeModules').ImagePickerManager;
var FileUpload = require('NativeModules').FileUpload;

const DOMAIN = "https://schedule.ngrok.io";

class UploadView extends Component {
  constructor(props) {
    super(props);

    this.filePickerOptions = {
      title: 'Select Image', // specify null or empty string to remove the title
      takePhotoButtonTitle: 'Take Photo', // specify null or empty string to remove this button
      chooseFromLibraryButtonTitle: 'Choose from Library', // specify null or empty string to remove this button
      cancelButtonTitle: 'Cancel',
      cameraType: 'back', // 'front' or 'back'
      mediaType: 'photo', // 'photo' or 'video'
      videoQuality: 'high', // 'low', 'medium', or 'high'
      durationLimit: 0, // video recording max time in seconds
      maxWidth: 1000, // photos only
      maxHeight: 1000, // photos only
      aspectX: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
      aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
      quality: 0.5, // 0 to 1, photos only
      angle: 0, // android only, photos only
      allowsEditing: true, // Built in functionality to resize/reposition the image after selection
      noData: true, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
      storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
        skipBackup: true, // ios only - image will NOT be backed up to icloud
        path: 'images' // ios only - will save image at /Documents/images rather than the root
      }
    };

    this.state = {
      uploading: false,
      file: null,
      result: null
    };
  }

  componentDidMount() {
    if (this.props.action == 'storage')
      ImagePickerManager.launchImageLibrary(this.filePickerOptions, this.imagePickerCallback.bind(this));
    else if (this.props.action == 'camera')
      ImagePickerManager.launchCamera(this.filePickerOptions, this.imagePickerCallback.bind(this));
  }

  componentDidUpdate() {
    if (this.state.file != null && this.state.result == null) {
      this.uploadImage.bind(this, this.state.file)();
    }
  }

  imagePickerCallback(response) {
    if (response.didCancel) {
      console.warn('User cancelled image picker');
      this.props.onBack();
    }
    else if (response.error) {
      console.warn('ImagePickerManager Error: ', JSON.stringify(response.error));
      this.props.onBack();
    }
    else {
      this.setState({
        file: response
      });
    }
  }

  uploadImage(response) {
    AsyncStorage.getItem("auth").then((auth) => {
      auth = JSON.parse(auth);

      var obj = {
        uploadUrl: DOMAIN + "/mobile/pics" + General.getAuthParams(auth),
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        fields: {},
        files: [
          {
            name: "image",
            filename: response.fileName, // required, file name
            filepath: response.uri, // required, file absoluete path
          },
        ]
      };
      FileUpload.upload(obj, (error, result) => {
        console.warn(error);

        if (error == null && result) {
          this.result = JSON.parse(result.data).image;

          console.warn(JSON.stringify(this.result));
          AsyncStorage.getItem("images").
            then((response) => JSON.parse(response)).
            then((json) => {
              json.unshift(this.result);
              AsyncStorage.setItem("images", JSON.stringify(json));
            });

          this.props.onBack();
        } else {
          this.props.onBack();
        }

      });
    });
  }

  render() {
    if (this.state.file != null) {
      return(
        <View>
          <Text> We are uploading your image to our servers </Text>
        </View>
      );
    }
    else
      return(
        <View />
      );
  }

}


module.exports = UploadView;
