/* eslint-disable react/prop-types */
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
  renderSquare(i) {
    const { squares } = this.props;
    const { onClick } = this.props;
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  }

  render() {
    return (
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
    );
  }
}

// eslint-disable-next-line react/prefer-stateless-function
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  handleClick(i) {
    // eslint-disable-next-line react/destructuring-assignment
    const history = [...this.state.history];
    const current = history[history.length - 1];
    const squares = [...current.squares];
    const { xIsNext } = this.state;
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares,
        },
      ]),
      xIsNext: !xIsNext,
      stepNumber: history.length,
    });
  }

  render() {
    const { history } = this.state;
    const { stepNumber } = this.state;
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    const { xIsNext } = this.state;
    const moves = history.map((step, move) => {
      const desc = move ? `Go to move ${move}` : 'Go to game start';
      return (
        <li key={move}>
          <button type="submit" onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });
    let status;
    if (winner) {
      status = `${winner} Wins!`;
    } else {
      status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
