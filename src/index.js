import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

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

class Board extends React.Component {
 
  renderSquare(i) {
    return (
      <Square
        sqProp={this.props.boardProp[i]}
        onClick={() => {this.props.onClick(i)}}
        sqLocProp={getLoc(i)}
      />
    );
  }

  render() {
    let sq = [];
    let count = 0;
    for (let i=0;i<3;i++) {
      sq.push(<div className="board-row"></div>)

      for (let k=0;k<3;k++) {
        sq.push(this.renderSquare(count))
        count++;
      }
    }
    return (
      <div>{sq}{console.log(sq)}</div>

    )
         
  
    
    /* return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    ); */
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      history: [{
        squares: Array(9).fill(null),
      }],
      xNext: true,
      stepNumber: 0,
      moveLoc: [],

    }
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    const moveLocHistory = this.state.moveLoc.slice(0, this.state.stepNumber);

      if (calculateWinner(squares) || squares[i]) {
      return;
    }
      squares[i] = (this.state.xNext ? 'X' : 'O')
  
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xNext: !this.state.xNext,
      stepNumber: history.length,
      moveLoc: moveLocHistory.concat([getLoc(i)])
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xNext: (step % 2) === 0,
    })

  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let makeBold = "";

    const moves = history.map((item, index) => {
      const desc = index ?
      'Go to move #' + index + ' Coordinate: ' + this.state.moveLoc[index-1]:
      'Go to game start';
      if (this.state.stepNumber === index ) {
        makeBold = "makeBold"
      }
      return(
        <li key={index}>
          <button className={makeBold} onClick={() => this.jumpTo(index)}>{desc}</button>
        </li>
      )
    })
    let status;
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next Player: ' + (this.state.xNext ? 'X' : 'O')
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            boardProp={current.squares}
            onClick={(i)=> this.handleClick(i)}/>
        </div>
        <div className="game-info">
    <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(sq) {
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

function getLoc(i) {
  const coords = [
    [1,1],
    [1,2],
    [1,3],
    [2,1],
    [2,2],
    [2,3],
    [3,1],
    [3,2],
    [3,3]
  ];
  return coords[i];
}



// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
