import React from 'react';
import {
  connect,
} from 'react-redux';
import { compose } from 'redux';
import { withRouter } from "react-router";
import {
  Grid,
  Typography,
  withStyles,
  CssBaseline,
  Divider,
} from '@material-ui/core';
import decode from 'decode-html';
import renderHTML from 'react-render-html';
import {
  makeSelectProduct,
  makeSelectVariants,
} from '../../selectors/product';
import {
  Map,
} from 'immutable';
import {
  getProduct
} from '../../actions/product';
import ProductCard from '../ProductCard';
import ProductReviewsContainer from '../ProductReviewsContainer';
import {
  Carousel
} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ReactLoading from 'react-loading';

class ProductDetail extends React.PureComponent {

  componentDidMount() {
    const {
      match,
      dispatch,
      productData,
    } = this.props;

    const itemId = match.params.itemId;
    if (productData !== undefined) {
      dispatch(getProduct(itemId));
    };
  }

  render() {
    const {
      productData,
      classes,
      variantsData,
      match,
    } = this.props;

    const itemId = match.params.itemId;
    const product = productData && String(productData.get('itemId', '')) === itemId ? productData : Map();
    console.log('data', {
      product,
      itemId,
      productData
    })

    const title = product.get('name');
    const ratingImageURL = product.get('customerRatingImage');
    const numRating = product.get('numReviews');
    const sellerInfo = product.get('sellerInfo');
    const price = product.get('salePrice', '');
    const msrp = product.get('msrp', '');
    const shortDesc = product.get('shortDescription');

    const longDesc = product.get('longDescription');
    const longDescDecoded = longDesc && renderHTML(decode(product.get('longDescription')));
      
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

    const variants = variantsData && String(variantsData.getIn([0, 'parentItemId'])) === itemId
      ? variantsData.map((variant, index) => {
        return <ProductCard
          productData={variant}
          key={index}
        />
        }).valueSeq().toArray()
      : null;

    const imageEntities = product.get('imageEntities');
    const largeImage = product.get('largeImage');
    const productImages = imageEntities 
      ? <Grid>
          <Carousel
            autoPlay={false}
            infiniteLoop={true}
            interval={4000}
            showStatus={false}
            showThumbs={true}
          >
            {
              imageEntities
                .reverse()
                .map((imageData, index) => {
                  return <div
                    key={index}
                  >
                    <img src={imageData.get('largeImage')} alt=""/>
                  </div>
                })
            }
          </Carousel>
        </Grid>
      : <Grid>
          <img src={largeImage} alt={`lareg image of ${product.name}`}/>
        </Grid>
    
    return (
      <Grid
        container={true}
        direction='column'
        className={classes.root}
      >
        {
          productData.size === 0
            ? <ReactLoading type='spin' color='#007dc6' height={60} width={30} />
            : null
        }
        <CssBaseline />
        {/* picture and sideInfo containers */}
        <Grid
          container={true}
          direction='row'
          wrap='wrap'
          className={classes.pictureSideInfoContainer}
          spacing={32}
        >
          {/* picture container */}
          <Grid
            item={true}
            lg={6}
            md={6}
            sm={12}
          >
            {productImages}
          </Grid>

          {/* side infoContainer */}
          <Grid
            item={true}
            lg={6}
            md={6}
            sm={12}
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

            {/* review summary container */}
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
        
        <Divider />
        {/* description and features */}
        <Grid
          container={true}
          direction='column'
          wrap='nowrap'
        >
          <Grid
            container={true}
            className={classes.descriptionTitleContainer}
          >
            <Typography
              variant='h5'
              color='primary'
            >
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
              md={6}
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
              md={6}
            >
              {
                longDescDecoded
              }
            </Grid>
          </Grid>

          {/* variants */}
          <Grid
            container={true}
            direction='row'
            wrap='wrap'
            justify='space-around'
          >
            {variants}
          </Grid>
        </Grid>
        {
          <ProductReviewsContainer />
        }
      </Grid>
    );
  }
}

const styles = {
  root: {
    padding: '0 20px',
  },
  priceSign: {
    fontSize: '1.6rem',
  },
  msrp: {
    textDecoration: 'line-through',
    paddingLeft: '5px'
  },
  titleContainer: {
    width: 'auto'
  },
  descriptionTitleContainer: {
    margin: '20px 0'
  },
  pictureSideInfoContainer: {
    margin: '50px 0'
  }
}

const mapStateToProps = (state) => {
  return {
    productData: makeSelectProduct(state),
    variantsData: makeSelectVariants(state),
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
  withRouter,
)(ProductDetail);