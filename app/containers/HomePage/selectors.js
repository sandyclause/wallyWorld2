import { createSelector } from 'reselect';

// const selectMyState = () => createSelector(

// );
const homePage = state => state.get('HomePage');

const makeSelectTrends = createSelector(
  homePage,
  state => state.getIn(['trendsData', 'items'])
);

export {
  makeSelectTrends,
};