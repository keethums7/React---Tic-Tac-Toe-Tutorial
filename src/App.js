import {useState} from 'react';

function Square({ value, onSquareClick }) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}

function Board({ xIsNext, squares, onPlay }) {
    function handleClick(index) {
        // check for a winner, or if the square's filled in
        if (calculateWinner(squares) || squares[index]) {
            return; 
        }

        // create a copy of the current board-state, then update the copy
        const nextSquares = squares.slice();
        nextSquares[index] = xIsNext ? "X" : "O";
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status;
    // show next player OR winner
    status = winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O');

    return (
        <>
          <div className="status">{status}</div>
          <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
          </div>
          <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
          </div>
          <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
            <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
          </div>
        </>
    );
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        // TODO
        // create a copy of history by spreading
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

        // update stored moves
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        // TODO
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        // Update moves history status line
        description = move > 0 ? 'Go to move #' + move : 'Go to game start';
        description = move === currentMove ? `You are on move ${move}` : description;
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    /*
     TODO
     1. add ascending and descending sorting callback functions akin to handlePlay
     2. Rewrite Board to use two loops to make the squares instead of hardcoding them.
     3. When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).
     4. Display the location for each move in the format (row, col) in the move history list.
     */
    return (
        <div className="game">
            <div className="game-board">
               <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <button className="moves-sort-asc">Sort Asc.</button>
                <button className="moves-sort-desc">Sort Desc.</button>
                <ol>{moves}</ol>
            </div>
        </div>
    )
}

/*
assign every winning combination to an array to compare against state and declare winner
*/
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]; // check current board state
        // TODO - struggling to understand this maneuver lol
        if (squares[a] && squares [a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
}
