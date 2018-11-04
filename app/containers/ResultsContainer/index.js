import React from 'react';
import {
  Grid
} from '@material-ui/core';
import {
  connect,
} from 'react-redux';
import { compose } from 'redux';
import {makeSelectSearchResults} from '../../selectors/product';

import ProductCard from '../../containers/ProductCard';
import {
  getSearch
} from '../../actions/product';

class ResultsContainer extends React.PureComponent {
  componentDidMount() {
    const {
      searchData,
      dispatch,
      match,
    } = this.props;

    const query = match.params.query;
    console.log(searchData, query)
    if (searchData.size === 0) {
      dispatch(getSearch(query))
    }
  }
  
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
          }).valueSeq().toArray()
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