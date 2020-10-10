import React from 'react';
import Square from './square.js';
import {getLoc} from '../functions/functions.js';

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        sqProp={this.props.boardProp[i]}
        onClick={() => {
          this.props.onClick(i);
        }}
        sqLocProp={getLoc(i)}
      />
    );
  }

  // Rewrite Board to use two loops to make the squares instead of hardcoding them.

  render() {
    let sq = [];
    let count = 0;
    for (let i = 0; i < 3; i++) {
      for (let k = 0; k < 3; k++) {
        sq.push(this.renderSquare(count));
        count++;
      }
      sq.push(<div className="board-row"></div>);
    }
    return (
      <div>
        {sq}
      </div>
    );
  }
}



export default Board;