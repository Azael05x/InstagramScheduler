import {
  ToastAndroid,
  AsyncStorage
} from 'react-native';


var ImagePickerManager = require('NativeModules').ImagePickerManager;


var filePickerOptions = {
  title: 'Select Image', // specify null or empty string to remove the title
  takePhotoButtonTitle: 'Take Photo', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: 'Choose from Library', // specify null or empty string to remove this button
  cancelButtonTitle: 'Cancel',
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  videoQuality: 'high', // 'low', 'medium', or 'high'
  durationLimit: 0, // video recording max time in seconds
  // maxWidth: 1000, // photos only
  // maxHeight: 1000, // photos only
  // aspectX: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  // aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  quality: 1, // 0 to 1, photos only
  angle: 0, // android only, photos only
  allowsEditing: true, // Built in functionality to resize/reposition the image after selection
  noData: true, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
  storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
    skipBackup: true, // ios only - image will NOT be backed up to icloud
    path: 'images' // ios only - will save image at /Documents/images rather than the root
  }
};

var fromStorage = () => {
  ImagePickerManager.launchImageLibrary(filePickerOptions, imagePickerCallback.bind(this));
};

var imagePickerCallback = (response) => {
  if (response.didCancel) {
    ToastAndroid.show('You cancelled image picker', ToastAndroid.LONG)
  }
  else if (response.error) {
    ToastAndroid.show('ImagePickerManager Error: ' + JSON.stringify(response.error), ToastAndroid.LONG)
  }
  else {
    if (response != null) {
      AsyncStorage.getItem("images").then((images) => {
        var image_array = JSON.parse(images || '[]');

        var filtered = image_array.filter((element) => {
          return (element.uri == response.uri);
        });

        if (filtered.length == 0) {
          image_array.push({id: Date.now(), ...response});
          AsyncStorage.setItem('images', JSON.stringify(image_array));
        }
      });
    }
  }
};


module.exports = {
  filePickerOptions: filePickerOptions,

  fromStorage: fromStorage,

  imagePickerCallback: imagePickerCallback,
};
