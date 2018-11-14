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

class ProductReviewsContainer extends React.PureComponent {

  render() {
		const {
			reviewsData,
		} = this.props;

		const reviews = reviewsData.get('reviews', List());
		const reviewsNum = reviews.size;
		const reviewsGroup = reviews.map((review, index) => {
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
      <Grid
				container={true}
				direction='column'
				wrap='nowrap'
			>
				<Typography>
					{reviewsNum} of reviews
				</Typography>

				{/* review */}
				{
					reviewsGroup
				}
      </Grid>
    )
  }
}

const styles = {
  root: {

  },
}

// ProductReviewsContainer.propTypes = {
//   productData: PropTypes.object.isRequired,
// }

const mapStateToProps = (state) => {
	return {
    reviewsData: makeSelectReviews(state),
	}
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
)(ProductReviewsContainer);