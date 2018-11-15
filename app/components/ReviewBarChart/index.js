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
} from 'immutable';
import { compose } from 'redux';
import PropTypes from 'prop-types';

class ReviewBarChart extends React.PureComponent {

  render() {
		const {
			reviewsData,
    } = this.props;
    
    
    const reviews = reviewsData && reviewsData.get('reviews');
    console.log(reviews)
    
    const ratings = reviews && reviews.reduce((acc, review, index) => {
      console.log(review)
      return acc.push(review.getIn(['overallRating', 'rating']));
    }, List())
    console.log(ratings)
  
    return (
      <Grid
				container={true}
				direction='column'
				wrap='nowrap'
			>
			  chart
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