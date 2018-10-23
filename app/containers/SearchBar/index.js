import React from 'react';
import {
  connect,
} from 'react-redux';
import { compose } from 'redux';
import saga from './saga';
import reducer from './reducer';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  getSearch
} from './actions';

import {
  Input,
  withStyles
} from '@material-ui/core';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing.unit,
  },
})

class SearchBar extends React.PureComponent {
  componentDidMount = () => {
    const {
      dispatch,
    } = this.props;
    console.log('searchMounted');
    dispatch(getSearch('ipod'));
  }

  render() {
    const {
      classes
    } = this.props;

    return (
      <div className={classes.conatiner}>
        <Input
          placeholder="Placeholder"
          className={classes.input}
          inputProps={{
            'aria-label': 'Description',
          }}
        />
      </div>
    );
  }
}

export default compose(
  injectReducer({key: 'SearchBar', reducer }),
  injectSaga({key: 'SearchBar', saga }),
  connect(),
  withStyles(styles),
)(SearchBar);