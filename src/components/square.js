import React from 'react';

function Square(props) {
  return (
  <button
    className="square"
    onClick={() => props.onClick()}
  >
    {props.sqProp}
  </button>
);
}

export default Square;