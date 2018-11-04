import React from 'react';
import {
  connect,
} from 'react-redux';
import { compose } from 'redux';
import { withRouter } from "react-router";
import saga from '../../sagas/product';
import reducer from '../../reducers/product';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  getSearch
} from '../../actions/product';

import {
  Input,
  withStyles,
  Button,
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
  constructor() {
    super();

    this.state = {
      input: ''
    }
  }
  
  handleChange = (e) => {
    this.setState({
      input: e.currentTarget.value
    });
  }
  
  handleSubmit = (e) => {
    const {
      dispatch,
      history,
    } = this.props;
    e.preventDefault();
    const query = this.state.input;
    dispatch(getSearch(query));
    history.push(`/search/${query}`);
    console.log('submit fired')
  }

  render() {
    const {
      classes
    } = this.props;

    return (
      <div className={classes.container}>
        <form onSubmit={this.handleSubmit}>
          <Input
            placeholder="Placeholder"
            className={classes.input}
            inputProps={{
              'aria-label': 'Description',
            }}
            onChange={this.handleChange}
          />
          <button>Search</button>
        </form>
      </div>
    );
  }
}

export default compose(
  injectReducer({key: 'Product', reducer }),
  injectSaga({key: 'Product', saga }),
  connect(),
  withStyles(styles),
  withRouter,
)(SearchBar);