// eslint-disable-next-line max-classes-per-file
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  const { value } = props;
  const { onClick } = props;
  return (
    <button type="submit" className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const { squares } = this.state;
    const { xIsNext } = this.state;
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    this.setState({
      squares,
      xIsNext: !xIsNext,
    });
  }

  renderSquare(i) {
    const { squares } = this.state;
    return <Square value={squares[i]} onClick={() => this.handleClick(i)} />;
  }

  render() {
    const { squares } = this.state;
    const { xIsNext } = this.state;
    const symbol = xIsNext ? 'X' : 'O';
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
      status = `${winner} wins!`;
    } else {
      status = `Next player: ${symbol}`;
    }

    return (
      <div>
        <div className="status">{status}</div>
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
    );
  }
}

// eslint-disable-next-line react/prefer-stateless-function
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
