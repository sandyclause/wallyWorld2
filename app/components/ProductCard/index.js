import React from 'react';
import {
  Grid,
  Typography,
  withStyles,
  Paper,
} from '@material-ui/core';

const ProductCard = (props) => {
  const {
    productData,
    classes
  } = props;

  const title = productData.get('name', 'untitled');
  const review = productData.get('customerRating');
  const price = productData.get('salePrice');
  const thumbnailDefault = productData.get('thumbnailImage');
  const customerRatingImage = productData.get('customerRatingImage');

  return (
    <Paper>
      <Grid
        container={true}
        direction='column'
        wrap='nowrap'
        className={classes.root}
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
      </Grid>
    </Paper>
  )
}

const styles = {
  root: {
    border: '1px solid red',
    maxWidth: '140px'
  },
  price: {
    fontSize: '2rem',
    fontWeight: '600',
  },
  priceSign: {
    paddingTop: '10px',
    fontSize: '1.1rem',
  }
}


export default withStyles(styles)(ProductCard);