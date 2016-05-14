import {
  ToastAndroid,
  AsyncStorage
} from 'react-native';

var General = require('../helpers/general');

var ImagePickerManager = require('NativeModules').ImagePickerManager;
var FileUpload = require('NativeModules').FileUpload;

const DOMAIN = "https://schedule.ngrok.io";

var filePickerOptions = {
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

var frontCamera = () => {
  ImagePickerManager.launchCamera(filePickerOptions, imagePickerCallback.bind(this));
};

var fromStorage = () => {
  ImagePickerManager.launchImageLibrary(filePickerOptions, imagePickerCallback.bind(this));
};

var imagePickerCallback = (response) => {
  if (response.didCancel) {
    ToastAndroid.show('You cancelled image picker', ToastAndroid.LONG)
  }
  else if (response.error) {
    ToastAndroid.show('ImagePickerManager Error: `JSON.stringify(response.error)`', ToastAndroid.LONG)
  }
  else {
    if (response != null) {
      ToastAndroid.show('Uploading...', ToastAndroid.LONG);
      uploadImage.bind(this, response)();
    }
  }
};

var uploadImage = (response) => {
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
      if (error)
        console.warn(error);

      if (error == null && result) {
        this.result = JSON.parse(result.data).image;

        AsyncStorage.getItem("images").
          then((response) => JSON.parse(response)).
          then((json) => {
            json.unshift(this.result);
            AsyncStorage.setItem("images", JSON.stringify(json));
          });
      }

    });
  });
}

module.exports = {
  DOMAIN: DOMAIN,

  filePickerOptions: filePickerOptions,

  fromCamera: frontCamera,

  fromStorage: fromStorage,

  imagePickerCallback: imagePickerCallback,

  uploadImage: uploadImage
};
