import Notification from 'react-native-system-notification';

module.exports = {
  create: function(year, month, day, hour, minute, payload, callback) {
    var object = {
      // id: parseInt(new Date().getTime().toString() + payload.id),
      subject: 'Instagram Scheduler',
      message: 'You need to post a photo',
      sendAt: new Date(year, month, day, hour, minute),
      payload: payload,
      action: 'PUBLISH'
    };
    Notification.create(object).then(callback);

    return object;
  },

  remove: function(notification_id) {
    Notification.find(notification_id).then((object) => {
      Notification.delete(notification_id);
    }).catch(() => {});
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
