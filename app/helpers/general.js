module.exports = {
  zeroFill: function(number, digits) {
      return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
  },

  getPublishDate(notification) {
    if (notification.year) {
      return `${this.zeroFill(notification.day, 2)}/${this.zeroFill(notification.month+1, 2)}/${notification.year} ${this.zeroFill(notification.hour, 2)}:${this.zeroFill(notification.minute, 2)}`
    }
    else {
      return "";
    }
  },

  getAuthParams(auth_object) {
    return "?user_id=" + auth_object.user_id + "&token=" + auth_object.token;
  }
};
