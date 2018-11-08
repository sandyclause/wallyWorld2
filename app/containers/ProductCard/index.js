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
import {
  selectProductAction
} from '../../actions/product';

class ProductCard extends React.PureComponent {
  handleClick = () => {
    const {
      productData,
      history,
      dispatch,
    } = this.props;

    const itemId = productData.get('itemId');
    history.push(`/productDetail/${itemId}`);
    dispatch(selectProductAction(productData));
  }

  render(){
    const {
      productData,
      classes,
    } = this.props;
  
    const title = productData.get('name', 'untitled');
    const review = productData.get('customerRating', '');
    const price = productData.get('salePrice', '');
    const msrp = productData.get('msrp', '');
    const thumbnailDefault = productData.get('mediumImage', '');
    const customerRatingImage = productData.get('customerRatingImage', '');
  
    const msrpGroup = msrp 
      ? <Grid
          container={true}
          direction='row'
          wrap='nowrap'
          justify='flex-start'
        >
          <Typography>Was</Typography>
          <Typography
            className={classes.msrp}
          >
            ${msrp}
          </Typography>
        </Grid>
      : null;
  
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
              customerRatingImage 
              ? <img src={customerRatingImage} alt={`thumbnail image of review rating ${review}`}/>
              : null
            }
          </Grid>
          <Grid
            container={true}
            direction='row'
            wrap='nowrap'
            justify='flex-start'
          >
            <span
              className={classes.priceSign}
            >$</span>
            <Typography
              className={classes.price}
            >
              {price}
            </Typography>
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