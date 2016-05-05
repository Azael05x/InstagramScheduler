'use strict';

import React, {
  Component,
} from 'react';

import {
  Navigator
} from 'react-native';

class LoginNavigator extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <Navigator
        initialRoute={{name: 'My First Scene', index: 0}}
        renderScene={(route, navigator) =>
          <MySceneComponent
            name={route.name}
            onForward={() => {
              var nextIndex = route.index + 1;
              navigator.push({
                name: 'Scene ' + nextIndex,
                index: nextIndex,
              });
            }}
            onBack={() => {
              if (route.index > 0) {
                navigator.pop();
              }
            }}
          />
        }
      />
    )
  };
}

module.exports = LoginNavigator;


// else if (this.state.route == 'login')
//   return (
//     <LoginView loggedIn={(() => {
//       this.setState({
//         route: 'scheduler'
//       });
//     }).bind(this)} />
//   );
