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

    const ratingDistributions = reviewStats && reviewStats.get('ratingDistributions', List());
    console.log(ratingDistributions)

    const ratingBars = ratingDistributions.reverse().map((rating, index) => {
      return (
        <Grid
          container={true}
          key={index}
          direction='row'
          wrap='nowrap'
        >
          <p>
            {rating.get('ratingValue')}
          </p>
          <p>
            {rating.get('count')}
          </p>
        </Grid>
      )
    })

    
    // const ratings = reviews && reviews.reduce((acc, review, index) => {
    //   return acc.push(review.getIn(['overallRating', 'rating']));
    // }, List())
    // console.log(ratings)

    
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