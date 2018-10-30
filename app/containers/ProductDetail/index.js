import React from 'react';
import {
  connect,
} from 'react-redux';
import { compose } from 'redux';
import {
  makeSelectProduct
} from './selectors';
import {
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core';

class ProductDetail extends React.PureComponent {
  
  render() {
    const {
      productData,
      classes,
    } = this.props;

    const title = productData.get('name');
    const ratingImageURL = productData.get('customerRatingImage');
    const numRating = productData.get('numReviews');
    const lgImageURL = productData.get('largeImage');
    const sellerInfo = productData.get('sellerInfo');
    const price = productData.get('salePrice', '');
    const msrp = productData.get('msrp', '');
      
    const msrpGroup = msrp 
      ? <Grid
          container={true}
          direction='row'
          wrap='nowrap'
          justify='flex-start'
          alignItems='center'
        >
          <Typography>Was</Typography>
          <Typography
            variant='h5'
            className={classes.msrp}
          >
            ${msrp}
          </Typography>
        </Grid>
      : null;
    
    return (
      <Grid
        container={true}
        direction='row'
        wrap='wrap'
      >
        <Grid>
          {
            lgImageURL
            ? <img src={lgImageURL} alt={`image of ${title}`} />
            : null
          }
        </Grid>
        <Grid
          container={true}
          direction='column'
        >
          <Typography
            variant='h5'
          >
            {title}
          </Typography>
          <Typography
            variant='subtitle1'
          >
            Sold and shipped by {sellerInfo}
          </Typography>

          {/* price container */}
          <Grid
            container={true}
          >
            <span className={classes.priceSign}>$</span>
            <Typography
              variant='h3'
              color='primary'
            >
              {price}
            </Typography>
            {msrpGroup}
          </Grid>
        </Grid>
        {/* review container */}
        <Grid
          container={true}
          direction='row'
          wrap='nowrap'
          alignContent='center'
          spacing={16}
          >
          <Grid
            item={true}
          >
            {
              ratingImageURL 
              ? <img src={ratingImageURL} alt="image of the review stars" />
              : null
            }
          </Grid>
          <Grid
            item={true}
          >
            <Typography
              variant='subtitle1'
              color='primary'
            >
              {numRating} Reviews
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const styles = {
  priceSign: {
    fontSize: '1.6rem',
  },
  msrp: {
    textDecoration: 'line-through',
    paddingLeft: '5px'
  },
}

const mapStateToProps = (state) => {
  return {
    productData: makeSelectProduct(state),
  }
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
)(ProductDetail);