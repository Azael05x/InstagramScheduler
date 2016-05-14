'use strict';

import React, {
  Component,
} from 'react';

import {
  View,
  Text,
  TextInput,
  AsyncStorage,
  ToastAndroid
} from 'react-native';

var Icon = require('react-native-vector-icons/FontAwesome')
var DeviceInfo = require('react-native-device-info');

var style = require('../styles/login-navigator');

const DOMAIN = "https://schedule.ngrok.io";

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    };

  };

  login() {
    if (this.state.email && this.state.password) {
      ToastAndroid.show('Logging in', ToastAndroid.SHORT);

      fetch(DOMAIN + "/mobile/auth", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          uuid: DeviceInfo.getUniqueID()
        })
      }).then((response) => {
        return response.json();
      }).then((json) => {
        if (json.status == "success") {
          AsyncStorage.setItem("auth", JSON.stringify(json.mobile)).then(() => {
            ToastAndroid.show('Logged in!', ToastAndroid.SHORT);
            this.props.loggedIn()
          });
        }
        else {
          this.setState({
            error: json.error,
            password: ''
          })
        }
      });

      this.setState({
        error: ''
      })
    }
    else {
      ToastAndroid.show('Fill in all the fields', ToastAndroid.SHORT);
    }
  }

  render() {
    return (
      <View style={[{justifyContent: 'center'}, style.login_wrap]}>
        <Text style={style.login_heading}> Instagram Scheduler </Text>
        <Text style={{fontWeight: 'bold', color: 'red'}}> {this.state.error} </Text>
        <View style={{paddingLeft: 10, paddingRight: 10}}>
          <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, color: "#2ecc71", fontWeight: 'bold'}}
              autoCorrect={false}
              onChangeText={(text) => this.setState({email: text})}
              placeholder={"E-mail"}
              value={this.state.email}
              keyboardType={'email-address'}
              underlineColorAndroid={'#27ae60'}
              placeholderTextColor={'#2ecc71'}
              color={'#2ecc71'}
            />

          <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, color: "#2ecc71", fontWeight: 'bold'}}
              autoCorrect={false}
              onChangeText={(text) => this.setState({password: text})}
              placeholder={"Password"}
              secureTextEntry={true}
              value={this.state.password}
              underlineColorAndroid={'#27ae60'}
              placeholderTextColor={'#2ecc71'}
            />
        </View>

        <View style={{marginTop: 20}}>
          <Icon.Button name="sign-in" borderRadius={100} backgroundColor={'#34495e'} style={style.login_button} onPress={this.login.bind(this)} >
            <Text style={{color: 'white'}}>Sign In</Text>
          </Icon.Button>
        </View>
      </View>
    )
  };
}

module.exports = LoginView;
