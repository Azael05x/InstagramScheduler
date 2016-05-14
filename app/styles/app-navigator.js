import {
  StyleSheet
} from 'react-native';

module.exports = StyleSheet.create({
  // Menu View
  menu_heading: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold'
  },
  menu_wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34495e'
  },
  menu_button: {
    borderRadius: 100,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#2ecc71',
    paddingLeft: 50,
    paddingRight: 50
  },
  menu_button_outer: {
    backgroundColor: '#34495e',
    borderWidth: 2,
    borderColor: '#2ecc71',

  }

});
