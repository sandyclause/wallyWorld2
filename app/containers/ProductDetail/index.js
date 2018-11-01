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
import decode from 'decode-html';
import renderHTML from 'react-render-html';

class ProductDetail extends React.Component {
  
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
    const shortDesc = productData.get('shortDescription');
    const longDesc = renderHTML(decode(productData.get('longDescription')));
      
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
      <Grid>
        {/* picture and sideInfo containers */}
        <Grid
          container={true}
          direction='row'
          wrap='wrap'
        >
          {/* picture container */}
          <Grid
            item={true}
            lg={6}
          >
            {
              lgImageURL
              ? <img src={lgImageURL} alt={`image of ${title}`} />
              : null
            }
          </Grid>

          {/* side infoContainer */}
          <Grid
            item={true}
            lg={6}
          >
            {/* title container */}
            <Grid
              container={true}
              direction='column'
              className={classes.titleContainer}
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
            </Grid>

            {/* review container */}
            <Grid
              container={true}
              direction='row'
              wrap='nowrap'
              alignContent='center'
              spacing={16}
              style={{width: 'auto'}}
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

        </Grid>

        {/* description and features */}
        <Grid
          container={true}
          direction='column'
          wrap='nowrap'
        >
          <Grid
            container={true}
          >
            <Typography>
              Description & Features
            </Typography>
          </Grid>

          {/* content */}
          <Grid
            container={true}
            direction='row'
            wrap='wrap'
            spacing={32}
          >
            <Grid
              item={true}
              lg={6}
            >
              <Typography>
                {
                  shortDesc
                }
              </Typography>
            </Grid>
            <Grid
              item={true}
              lg={6}
            >
              {
                longDesc
              }
            </Grid>
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
  titleContainer: {
    width: 'auto'
  }
}

const mapStateToProps = (state) => {
  return {
    productData: makeSelectProduct(state),
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(ProductDetail);