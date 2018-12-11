import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  Grid,
  Typography,
	withStyles,
	Chip,
} from '@material-ui/core';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import {
	makeSelectReviews,
} from '../../selectors/product';
import ReviewBarChart from '../../components/ReviewBarChart';
import ReviewsGroup from '../../components/ReviewsGroup';

class ProductReviewsContainer extends React.PureComponent {
	state = {
		selectedReviewNumber: '-1',
	}

	setSelectedReviewNumber = (number) => {
		this.setState({
			selectedReviewNumber: number,
		})
	}

	handleDelete = () => {
		this.setState({
			selectedReviewNumber: '-1',
		})
	}

  render() {
		const {
			reviewsData,
			classes,
		} = this.props;

		const {
			selectedReviewNumber
		} = this.state;

		const ReviewFilters = () => {
			return (
				selectedReviewNumber !== '-1'
					?	<Grid>
							<Chip
								label={selectedReviewNumber}
								onDelete={this.handleDelete}
								className={classes.chip}
								color="primary"
							/>
							<Chip
								label='Clear All'
								onDelete={this.handleDelete}
								className={classes.chip}
								color="primary"
							/>
						</Grid>
				: null
			)
		}
  
    return (
      <Grid
				container={true}
				direction='column'
				wrap='nowrap'
			>

				{/* review bar chart */}
				<ReviewBarChart
					reviewsData={reviewsData}
					grabNumber={this.setSelectedReviewNumber}
				/>

				{/* review filter chips */}
				<ReviewFilters />

				{/* review */}
				<ReviewsGroup
					selectedReviewNumber={this.state.selectedReviewNumber}
				/>
      </Grid>
    )
  }
}

const styles = {
  root: {

	},
	chip: {

	}
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