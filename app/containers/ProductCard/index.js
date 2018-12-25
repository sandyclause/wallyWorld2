import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  Grid,
  Typography,
  withStyles,
  Paper,
} from '@material-ui/core';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import Stars from '../../components/Stars';

class ProductCard extends React.PureComponent {
  handleClick = () => {
    const {
      productData,
      history,
    } = this.props;

    const itemId = productData.get('itemId');
    history.push(`/productDetail/${itemId}`);
  }

  render() {
    const {
      productData,
      classes,
    } = this.props;
  
    const title = productData.get('name', 'untitled');
    const reviewRating = productData.get('customerRating', '');
    const price = productData.get('salePrice', '');
    const msrp = productData.get('msrp', '');
    const thumbnailDefault = productData.get('mediumImage', '');
  
    const msrpGroup = msrp && price
      ? <Grid
          container={true}
          direction='column'
          wrap='nowrap'
          justify='flex-start'
          alignItems='center'
          style={{border: '1px solid red'}}
        >
          <Grid
            container={true}
            direction='row'
            wrap='nowrap'
          >
            <span className={classes.priceSign}>$</span>
            <Typography
              variant='h3'
              color='primary'
            >
              {price}
            </Typography>
          </Grid>
          <Grid
            container={true}
            direction='row'
            wrap='nowrap'
          >
            <Typography>Was</Typography>
            <Typography
              variant='h5'
              className={classes.msrp}
            >
              ${msrp}
            </Typography>
          </Grid>
        </Grid>
      : 
        <Grid
          style={{border: '1px solid blue'}}
        >
          <Typography
            variant='h5'
          >
            ${msrp}{price}
          </Typography>
        </Grid>;
  
    return (
      <Paper>
        <Grid
          container={true}
          direction='column'
          wrap='nowrap'
          className={classes.root}
          onClick={this.handleClick}
        >
          <Grid
            container={true}
            justify='center'
          >
            <div>
              <img src={thumbnailDefault} alt={`thumbnail image of ${title}`}/>
            </div>
          </Grid>
          <Typography
            variant='subtitle1'
          >
            {title}
          </Typography>
          <Grid
            container={true}
            justify='flex-start'
          >
            {
              reviewRating
                ? <Stars
                    starNum={reviewRating}
                  />
                : null
            }
          </Grid>
          {msrpGroup}
        </Grid>
      </Paper>
    )
  }
}

const styles = {
  root: {
    border: '1px solid red',
    maxWidth: '240px',
    cursor: 'pointer',
  },
  price: {
    fontSize: '2rem',
    fontWeight: '600',
  },
  priceSign: {
    paddingTop: '10px',
    fontSize: '1.1rem',
  },
  msrp: {
    textDecoration: 'line-through',
    paddingLeft: '5px'
  },
}

ProductCard.propTypes = {
  productData: PropTypes.object.isRequired,
}

export default compose(
  connect(),
  withStyles(styles),
  withRouter,
)(ProductCard);