import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';
import {
  Grid,
} from '@material-ui/core';

const Stars = (props) => {
  const {
    starNum
  } = props;

  let starsArray = [];
  for (let i = 0; i < starNum; i++) {
    starsArray.push(
      <FontAwesomeIcon
        key={i}
        icon='star'
      />
    )
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