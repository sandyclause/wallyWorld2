import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core';
import {
  List,
  Map,
  fromJS,
} from 'immutable';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import Stars from '../Stars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ReviewBarChart extends React.PureComponent {

  render() {
		const {
      reviewsData,
      classes,
    } = this.props;
    
    
    const reviews = reviewsData && reviewsData.get('reviews');
    const reviewStats = reviewsData && reviewsData.get('reviewStatistics', Map());
    const totalReviewcCount = reviewStats.get('totalReviewCount', '');

    const ratingDistributions = reviewStats && reviewStats.get('ratingDistributions', List());
    console.log(ratingDistributions)

    const parsedReviews = ratingDistributions.size !== 0 
      ? ratingDistributions.reduce((acc, rating, index) => {
          acc[rating.get('ratingValue')] = rating.get('count');
          return acc;
        }, {}) 
      : null;

    const immutableReviews = fromJS(parsedReviews);
    
    const ratingBars = immutableReviews && immutableReviews.reverse().map((review, key) => {
      return (
        <Grid
          className={classes.root}
          container={true}
          direction='row'
          wrap='nowrap'
        >
          <Grid
            className={classes.starIcon}
            container={true}
            direction='row'
            wrap='nowrap'
            justify='center'
            alignItems='center'
            style={{background: 'red'}}
          >
            <Typography>
              {key}
            </Typography>
            <FontAwesomeIcon
              icon='star'
            />
          </Grid>
          <Grid
            container={true}
            key={key}
            direction='row'
            wrap='nowrap'
            className={classes.barContainer}
          >
            <Grid
              item={true}
              className={classes.bar}
              style={{width: `${review / totalReviewcCount * 100}%`}}
            >
            </Grid>
          </Grid>
          <Grid
            container={true}
            justify='center'
            alignItems='center'
            className={classes.starCount}
          >
            <Typography>
              {review}
            </Typography>
          </Grid>
          </Grid>
      )
    }).valueSeq().toArray();
    
    console.log(ratingBars);
    
    
    const averageOverallRating = reviewStats.get('averageOverallRating', '');
    console.log('average revs', averageOverallRating)
    const averageRating = reviewsData 
      ? <Stars
          starNum={averageOverallRating}
        />
      : null;

    
  
    return (
      <Grid
				container={true}
				direction='column'
				wrap='nowrap'
			>
			  <Typography>
          Average Customer Ratings
        </Typography>
        {averageRating}
        {ratingBars}
      </Grid>
    )
  }
}

const styles = {
  root: {
    border: '1px solid red'
  },
  barContainer: {
    minWidth: '300px',
    background: 'lightgrey',
    margin: 10
  },
  bar: {
    background: 'lightblue',
    height: 10,
  },
  starIcon: {
    width: 40
  },
  starCount: {
    width: 40
  }
}

ReviewBarChart.propTypes = {
  reviewsData: PropTypes.object.isRequired,
}

export default compose(
  connect(),
  withStyles(styles),
)(ReviewBarChart);