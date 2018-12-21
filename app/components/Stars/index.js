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
    if ((starNum - i) < 1) {
      starsArray.push(
        <FontAwesomeIcon
          key={i}
          icon='star-half-alt'
        />
      )
    } 
    else {
      starsArray.push(
        <FontAwesomeIcon
          key={i}
          icon={['fas', 'star']}
        />
      )
    }
  }

  let starsFinal = starsArray;
  console.log(starsArray.length)
  const missingStar = 5 - starsArray.length;
  for (let i = (5 - missingStar); i < 5; i++) {
    starsFinal.push(
      <FontAwesomeIcon
        key={i + Date.now()}
      icon={['far', 'star']}
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
        starsFinal.map((star) => {
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