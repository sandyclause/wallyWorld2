import React from 'react';
import {
  Grid
} from '@material-ui/core';
import {
  connect,
} from 'react-redux';
import { compose } from 'redux';
import {makeSelectSearchResults} from '../SearchBar/selectors';

import ProductCard from '../../containers/ProductCard';

class ResultsContainer extends React.PureComponent {
  
  render() {
    const {
      searchData,
    } = this.props;
    
    return (
      <Grid
        container={true}
        direction='row'
        wrap='wrap'
        justify='space-between'
      >
        {
          searchData && searchData.map((product, index) => {
            return <ProductCard productData={product} key={index} />
          })
        }
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchData: makeSelectSearchResults(state)
  }
}

export default compose(
  connect(mapStateToProps),
)(ResultsContainer);