import React from 'react';
import {
  Grid,
  Typography,
  withStyles,
  Paper,
} from '@material-ui/core';
import { compose } from 'redux';
import { withRouter } from "react-router";

const ProductCard = (props) => {
  const {
    productData,
    classes,
    history,
  } = props;

  const title = productData.get('name', 'untitled');
  const review = productData.get('customerRating', '');
  const price = productData.get('salePrice', '');
  const msrp = productData.get('msrp', '');
  const thumbnailDefault = productData.get('thumbnailImage', '');
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

  const itemId = productData.get('itemId');
  const handleClick = () => {
    history.push(`/${itemId}`)
  }

  return (
    <Paper>
      <Grid
        container={true}
        direction='column'
        wrap='nowrap'
        className={classes.root}
        onClick={handleClick}
      >
        <Grid
          container={true}
          justify='center'
        >
          <img src={thumbnailDefault} alt={`thumbnail image of ${title}`}/>
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

const styles = {
  root: {
    border: '1px solid red',
    maxWidth: '140px',
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


export default compose(
  withStyles(styles),
  withRouter,
)(ProductCard);