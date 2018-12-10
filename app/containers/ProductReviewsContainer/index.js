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

  render() {
		const {
			reviewsData,
		} = this.props;
  
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