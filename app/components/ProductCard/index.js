import React from 'react';
import {
  Grid,
  Typography,
} from '@material-ui/core';

const ProductCard = (props) => {
  const {
    productData
  } = props;

  const title = productData.get('name', 'untitled');
  const review = productData.get('customerRating');
  const price = productData.get('salePrice');

  return (
    <Grid
      container={true}
      direction='column'
      wrap='nowrap'
    >
      <Typography>
        {title}
      </Typography>
      <Typography>
        {review}
      </Typography>
      <Typography>
        ${price}
      </Typography>
    </Grid>
  )
}


export default ProductCard;