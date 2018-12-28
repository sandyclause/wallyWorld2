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
      grabNumber,
    } = this.props;
    
    const reviews = reviewsData && reviewsData.get('reviews');
    const reviewStats = reviewsData && reviewsData.get('reviewStatistics', Map());
    const totalReviewcCount = reviewStats.get('totalReviewCount', '');

    const ratingDistributions = reviewStats && reviewStats.get('ratingDistributions', List());

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
          className={classes.ratingBars}
          container={true}
          direction='row'
          wrap='nowrap'
          key={key}
          onClick={() => grabNumber(key)}
        >
          <Grid
            className={classes.starIcon}
            container={true}
            direction='row'
            wrap='nowrap'
            justify='center'
            alignItems='center'
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
    
    const averageOverallRating = reviewStats.get('averageOverallRating', '');

    // api review stats of 'averageOverallRating' sometimes returns a string of null
    const averageRating = reviewsData && averageOverallRating !== 'null'
      ? <Grid
          container={true}
          direction='row'
          wrap='nowrap'
        >
          <Typography>
            Average Customer Ratings
          </Typography>
          <Typography>
            Overall
          </Typography>
          <Stars
            starNum={averageOverallRating}
          />
          <Typography>
            {averageOverallRating}
          </Typography>
        </Grid>
      : null;

    return (
      <Grid
				container={true}
				direction='row'
        wrap='wrap'
        className={classes.root}
        spacing={32}
			>
        <Grid
          container={true}
          item={true}
          lg={6}
          md={6}
          direction='column'
          wrap='nowrap'
        >
          <Typography>
            Rating Snapshot
          </Typography>
          <Typography>
            Select a row below to filter reviews.
          </Typography>
          {ratingBars}
        </Grid>
        <Grid
          item={true}
          lg={6}
          md={6}
        >
          {averageRating}
        </Grid>
      </Grid>
    )
  }
}

const styles = theme => ({
  root: {
    padding: `${theme.spacing.unit * 3}px 0`,
  },
  ratingBars: {
    border: '1px solid red',
    cursor: 'pointer',
  },
  barContainer: {
    minWidth: '300px',
    background: 'lightgrey',
    margin: 10
  },
  bar: {
    background: 'lightblue',
    height: theme.spacing.unit,
  },
  starIcon: {
    width: 40
  },
  starCount: {
    width: 40
  }
})

ReviewBarChart.propTypes = {
  reviewsData: PropTypes.object.isRequired,
  grabNumber: PropTypes.func.isRequired,
}

export default compose(
  connect(),
  withStyles(styles),
)(ReviewBarChart);