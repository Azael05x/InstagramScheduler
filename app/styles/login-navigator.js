import {
  StyleSheet
} from 'react-native';

module.exports = StyleSheet.create({
  // Login View
  login_heading: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold'
  },
  login_wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34495e'
  },
  login_button: {
    borderRadius: 100,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#2ecc71',
    paddingLeft: 50,
    paddingRight: 50
  }
});
