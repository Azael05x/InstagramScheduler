'use strict';
var InstagramPost = require('../components/instagram-post');

import React, {
  Component,
} from 'react';

class PublishView extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <InstagramPost {...this.props} publish={true} />
    )
  };
}

module.exports = PublishView;
