import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  Grid,
  Typography,
  withStyles,
	Divider,
} from '@material-ui/core';
import {
	List,
} from 'immutable';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import {
	makeSelectReviews,
} from '../../selectors/product';
import Stars from '../../components/Stars';

class ReviewsGroup extends React.PureComponent {

  render() {
		const {
			totalReviews,
			selectedReviewNumber,
		} = this.props;

		const reviews = totalReviews.get('reviews', List());
		const filteredReviews = selectedReviewNumber === '-1'
			? reviews
			: reviews.filter((review) => {
				return review.getIn(['overallRating', 'rating']) === selectedReviewNumber;
			});

		const reviewsNum = filteredReviews.size;
		const reviewsGroup = filteredReviews.map((review, index) => {
			const title = review.get('title', '');
			const reviewer = review.get('reviewer', '');
			const rating = review.getIn(['overallRating', 'rating'], '');
			const reviewText = review.get('reviewText');
			return (
				<Grid
					key={index}
					container={true}
					direction='column'
					wrap='nowrap'
				>
					<Grid
						container={true}
						direction='column'
						wrap='nowrap'
					>
						<Grid
							container={true}
							direction='row'
							wrap='nowrap'
						>
							<Stars
								starNum={rating}
							/>
							{reviewer}
						</Grid>
						<Typography>
							{title}
						</Typography>
					</Grid>
					<Grid
						item={true}
					>
						{reviewText}
					</Grid>
					<Divider />
				</Grid>
			)
		});
  
    return (
      <React.Fragment>
        <Typography>
          {reviewsNum} reviews
        </Typography>
        {
          reviewsGroup
        }
      </React.Fragment>
    )
  }
}

const styles = {
  root: {

  },
}

ReviewsGroup.propTypes = {
  selectedReviewNumber: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
	return {
    totalReviews: makeSelectReviews(state),
	}
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
)(ReviewsGroup);