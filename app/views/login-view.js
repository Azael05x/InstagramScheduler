'use strict';

import React, {
  Component,
} from 'react';

import {
  View,
  Text,
  TextInput,
  AsyncStorage
} from 'react-native';

var Icon = require('react-native-vector-icons/FontAwesome')
var DeviceInfo = require('react-native-device-info');

const DOMAIN = "https://schedule.ngrok.io";

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'rvzp@inbox.lv',
      password: 'qwertyuiop',
      error: ''
    };

  };

  login() {
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
      console.warn("Got Response:");
      return response.json();
    }).then((json) => {
      if (json.status == "success") {
        AsyncStorage.setItem("auth", JSON.stringify(json.mobile)).then(() => {
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

  render() {
    return (
      <View style={{justifyContent: 'center', marginTop:50}}>
        <Text> Authenticate </Text>
        <Text style={{fontWeight: 'bold', color: 'red'}}> {this.state.error} </Text>
        <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            autoCorrect={false}
            onChangeText={(text) => this.setState({email: text})}
            placeholder={"E-mail"}
            value={this.state.email}
            keyboardType={'email-address'}
          />

        <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            autoCorrect={false}
            onChangeText={(text) => this.setState({password: text})}
            placeholder={"Password"}
            secureTextEntry={true}
            value={this.state.password}
          />

        <View style={{marginTop: 20}}>
          <Icon.Button name="sign-in" onPress={this.login.bind(this)} style={{borderRadius: 0, justifyContent: 'center'}}>
            <Text style={{color: 'white'}}>Sign In</Text>
          </Icon.Button>
        </View>
      </View>
    )
  };
}

module.exports = LoginView;
