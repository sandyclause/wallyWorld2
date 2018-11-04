import React from 'react';
import {
  Grid
} from '@material-ui/core';
import {
  connect,
} from 'react-redux';
import { compose } from 'redux';
import {makeSelectTrends} from '../../selectors/product';

import ProductCard from '../../containers/ProductCard';

class TrendsGroupContainer extends React.PureComponent {
  
  render() {
    const {
      trendsData,
    } = this.props;
    return (
      <Grid
        container={true}
        direction='row'
        wrap='wrap'
        justify='space-between'
      >
        {
          trendsData && trendsData.map((product, index) => {
            return <ProductCard productData={product} key={index} />
          }).valueSeq().toArray()
        }
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    trendsData: makeSelectTrends(state)
  }
}

export default compose(
  connect(mapStateToProps),
)(TrendsGroupContainer);