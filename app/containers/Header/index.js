import React from 'react';
import {
  connect,
} from 'react-redux';
import { compose } from 'redux';
import {
  withStyles,
} from '@material-ui/core';

import SearchBar from 'containers/SearchBar';

const styles = theme => ({
})

class Header extends React.PureComponent {
  

  render() {
    const {
      classes
    } = this.props;

    return (
      <div>
        header
        <SearchBar />
      </div>
    );
  }
}

export default compose(
  connect(),
  withStyles(styles),
)(Header);