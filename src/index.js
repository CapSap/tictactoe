import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Colour from "./components/colour.js";
import Board from "./components/board.js";
import {  getLoc } from "./functions/functions.js";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xNext: true,
      stepNumber: 0,
      moveLoc: [],
    };
  }

  calculateWinner(sq) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
        return sq[a];
      }
    }
    return null;
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    const moveLocHistory = this.state.moveLoc.slice(0, this.state.stepNumber);
    const calculateWinner = this.calculateWinner;

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xNext ? "X" : "O";

    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      xNext: !this.state.xNext,
      stepNumber: history.length,
      moveLoc: moveLocHistory.concat([getLoc(i)]),
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const calculateWinner = this.calculateWinner;
    const winner = calculateWinner(current.squares);
    let makeBold = "";

    const moves = history.map((item, index) => {
      const desc = index
        ? "Go to move #" +
        index +
        " Coordinate: " +
        this.state.moveLoc[index - 1]
        : "Go to game start";
      //Bold the currently selected item in the move list.
      if (this.state.stepNumber === index) {
        makeBold = "makeBold";
      }
      return (
        <li key={index}>
          <button className={makeBold} onClick={() => this.jumpTo(index)}>
            {desc}
          </button>
        </li>
      );
    });
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next Player: " + (this.state.xNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            boardProp={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <div className="colour">
          <Colour />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
