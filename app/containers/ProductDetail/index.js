import React from 'react';
import {
  connect,
} from 'react-redux';
import { compose } from 'redux';
import {
  makeSelectProduct
} from './selectors';

class ProductDetail extends React.PureComponent {
  
  render() {
    const {
      productData
    } = this.props;

    console.log(productData)
    
    return (
      <p>product detail</p>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productData: makeSelectProduct(state),
  }
}

export default compose(
  connect(mapStateToProps),
)(ProductDetail);