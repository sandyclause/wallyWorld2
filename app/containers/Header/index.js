import React from 'react';
import {
  connect,
} from 'react-redux';
import { compose } from 'redux';
import {
  withStyles,
  Grid,
} from '@material-ui/core';
import {
  withRouter
} from "react-router";
import SearchBar from 'containers/SearchBar';
import walmartLogo from '../../images/walmartLogo.svg'

class Header extends React.PureComponent {
  
  handleClick = () => {
    const {
      history,
    } = this.props;

    history.push('/');
  }
  
  render() {
    const {
      classes
    } = this.props;
    
    const logo = <Grid
        onClick={this.handleClick}
        className={classes.logo}
      >
        <img src={walmartLogo} alt='walmart logo'/>
      </Grid>
    
    return (
      <Grid style={{border: '1px solid red'}}>
        <Grid
          container={true}
          direction='row'
          wrap='nowrap'
        >
          {logo}
          <SearchBar />
        </Grid>
      </Grid>
    );
  }
}

const styles = theme => ({
  logo: {
    cursor: 'pointer'
  }
})

export default compose(
  connect(),
  withStyles(styles),
  withRouter,
)(Header);