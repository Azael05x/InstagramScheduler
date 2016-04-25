module.exports = {
  zeroFill: function(number, digits) {
      return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
  },

  getPublishDate(year, month, day, hour, minute) {
    if (minute) {
      return `${this.zeroFill(day, 2)}/${this.zeroFill(month, 2)}/${year} ${this.zeroFill(hour, 2)}:${this.zeroFill(minute, 2)}`
    }
    else {
      return "";
    }
  }
};
