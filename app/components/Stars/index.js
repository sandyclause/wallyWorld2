import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';

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
    starsArray.map((star) => {
      return star;
    })
  )
}

Stars.propTypes = {
  starNum: PropTypes.string.isRequired,
}

export default Stars;