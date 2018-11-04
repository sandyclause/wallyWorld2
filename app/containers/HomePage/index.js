/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import {
  connect,
} from 'react-redux';
import { getTrends } from '../../actions/product';
import { compose } from 'redux';
import saga from '../../sagas/product';
import reducer from '../../reducers/product';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import SearchBar from '../SearchBar';
import TrendsGroupContainer from '../TrendsGroupContainer';


/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  componentDidMount() {
    const {
      dispatch,
    } = this.props;
    console.log('mounted');
    dispatch(getTrends());
  }
  
  render() {
    return (
      <div>
        <h1>
          test
        </h1>
        {/* <SearchBar /> */}
        <TrendsGroupContainer />
      </div>
    );
  }
}


export default compose(
  injectReducer({key: 'Product', reducer }),
  injectSaga({key: 'Product', saga }),
  connect(),
)(HomePage);