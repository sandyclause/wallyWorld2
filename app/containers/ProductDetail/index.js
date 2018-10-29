import React from 'react';
import {
  connect,
} from 'react-redux';
import { compose } from 'redux';

class ProductDetail extends React.PureComponent {
  
  render() {
    
    return (
      <p>product detail</p>
    );
  }
}


export default compose(
  connect(),
)(ProductDetail);