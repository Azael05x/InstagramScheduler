import Notification from 'react-native-system-notification';

module.exports = {
  createNotification: function(year, month, day, hour, minute) {
    Notification.create({
      subject: 'Instagram Scheduler',
      message: 'You need to post a photo',
      sendAt: new Date(year, month, day, hour, minute)
    });
  },

  
}
