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

class ReviewBarChart extends React.PureComponent {

  render() {
		const {
			reviewsData,
    } = this.props;
    
    
    const reviews = reviewsData && reviewsData.get('reviews');
    const reviewStats = reviewsData && reviewsData.get('reviewStatistics', Map());
    const totalReviewcCount = reviewStats.get('totalReviewCount', '');

    const ratingDistributions = reviewStats && reviewStats.get('ratingDistributions', List());
    console.log(ratingDistributions)

    const parsedReviews = ratingDistributions.size !== 0 ? ratingDistributions.reduce((acc, rating, index) => {
      acc[rating.get('ratingValue')] = rating.get('count');
      return acc;
    }, {}) : null;

    const immutableReviews = fromJS(parsedReviews);
    
    const ratingBars = immutableReviews && immutableReviews.reverse().map((review, key) => {
      return (
        <Grid
          container={true}
          key={key}
          direction='row'
          wrap='nowrap'
        >
          <p>
            {key}
          </p>
          <p>
            {review}
          </p>
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

  },
}

ReviewBarChart.propTypes = {
  reviewsData: PropTypes.object.isRequired,
}

export default compose(
  connect(),
  withStyles(styles),
)(ReviewBarChart);