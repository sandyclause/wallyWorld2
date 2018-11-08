import React from 'react';
import { compose } from 'redux';
import saga from '../sagas/product';
import reducer from '../reducers/product';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

class ProductModule extends React.PureComponent {

  render() {

    return (
      <div></div>
    )
  }
}

export default compose(
  injectReducer({key: 'Product', reducer }),
  injectSaga({key: 'Product', saga }),
)(ProductModule);