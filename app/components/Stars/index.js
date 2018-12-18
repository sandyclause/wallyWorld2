import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';
import {
  Grid,
} from '@material-ui/core';

const isOdd = (number) => {
  return !!(number % 2);
}

const Stars = (props) => {
  const {
    starNum
  } = props;
  
  let starsArray = [];

  console.log(starNum)
  for (let i = 0; i < starNum; i++) {
    if ((starNum - i) < 1) {
      starsArray.push(
        <FontAwesomeIcon
          key={i}
          icon='star-half'
        />
      )
    } else {
      starsArray.push(
        <FontAwesomeIcon
          key={i}
          icon='star'
        />
      )

    }
  }

  return (
    <Grid
      container={true}
      style={{width: 'auto'}}
      direction='row'
      wrap='nowrap'
    >
      {
        starsArray.map((star) => {
          return star;
        })
      }
    </Grid>
  )
}

Stars.propTypes = {
  starNum: PropTypes.string.isRequired,
}

export default Stars;