import { createSelector } from 'reselect';

// const selectMyState = () => createSelector(

// );
const searchBarData = state => state.get('SearchBar');

const makeSelectSearchResults = createSelector(
  searchBarData,
  state => state.getIn(['searchData', 'items'])
);

export {
  makeSelectSearchResults,
};