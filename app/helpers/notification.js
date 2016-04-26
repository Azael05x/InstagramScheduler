import Notification from 'react-native-system-notification';

module.exports = {
  create: function(year, month, day, hour, minute, payload) {
    Notification.create({
      subject: 'Instagram Scheduler',
      message: 'You need to post a photo',
      sendAt: new Date(year, month, day, hour, minute),
      payload: payload,
      action: 'PUBLISH'
    });
  },

  listen: function(callback) {
    var react = this;
    Notification.addListener('press', function(e) {
      switch (e.action) {
        case 'PUBLISH':
          callback.bind(react, e.payload)();
          break;
      }
    });
  }

}
