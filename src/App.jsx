import { useState, useEffect } from 'react'

import './App.css'

function App() {

  const [visibility, setVisibility] = useState(
    Array(9).fill().map(() => Array(9).fill(false))
  );

  const [highlighted, setHighlighted] = useState(
    Array(9).fill().map(() => Array(9).fill(false))
  );

  // generate random number 0 for player A (person), 1 for computer or player B
  const [firstMove, setFirstMove] = useState(0)
  const [column, setColumn] = useState(true)
  const [playerAScore, setPlayerAScore] = useState(0)
  const [playerBScore, setPlayerBScore] = useState(0)
  const [currnetPlayer, setCurrentPlayer] = useState('A')
  const [gameEnd, setGameEnd] = useState(false)

  const cellClick = (rowIndex, cellIndex) => {

    if (currnetPlayer === 'A') {
      // Check color for score | green to add, red to substract
      if (grid[rowIndex][cellIndex][1] === 0) {
        setPlayerAScore(prev => prev - grid[rowIndex][cellIndex][0])
      } else {
        setPlayerAScore(prev => prev + grid[rowIndex][cellIndex][0])
      }
    }
    if (currnetPlayer === 'B') {
      // Check color for score | green to add, red to substract
      if (grid[rowIndex][cellIndex][1] === 0) {
        setPlayerBScore(prev => prev - grid[rowIndex][cellIndex][0])
      } else {
        setPlayerBScore(prev => prev + grid[rowIndex][cellIndex][0])
      }
      // computerTurn()
    }
    const updatedVisibility = [...visibility];
    updatedVisibility[rowIndex][cellIndex] = true;
    setVisibility(updatedVisibility);

    highlightMoves(rowIndex, cellIndex, column)
    changeMove()
  };

  const changeMove = () => {
    const change = currnetPlayer === 'A' ? 'B' : 'A'
    setCurrentPlayer(change)
    setColumn(!column)
  }

  const getCellBackgroundColor = (cellValue) => {
    return cellValue[1] === 0 ? 'red' : 'green'
  }


    // Generate random numbers
   const getRandomNumber = (maxNum) => {
    return Math.floor(Math.random() * maxNum)
  }

   // Generate 9x9 Grid
  const generateGrid = () => {
    const grid = []

    for (let i = 0; i < 9; i++) {
      const row = []
      for (let j = 0; j < 9; j++) {
        const number = [getRandomNumber(9) + 1, getRandomNumber(2)]
        row.push(number)
      }
      grid.push(row)
    }
    return grid
  }

  useEffect(() => {
    setGrid(generateGrid())
    setFirstMove(getRandomNumber(2))
  }, [])

  const chooseRandomCellFromCol = (rowIndex, cellIndex) => {
  let row;
  do {
    row = getRandomNumber(9);
  } while (visibility[row][cellIndex]);

  return row;
};

  const chooseRandomCellFromRow = (rowIndex, cellIndex) => {
  let col;
  do {
    col = getRandomNumber(9);
  } while (visibility[rowIndex][col]);

  return col;
};

  const highlightMoves = (rowIndex, cellIndex, isColumn) => {
    const updatedHighlighted = Array(9).fill().map(() => Array(9).fill(false));

    if (isColumn) {
      for (let row = 0; row < 9; row++) {
        updatedHighlighted[row][cellIndex] = true;
      }
    } else {
      for (let col = 0; col < 9; col++) {
        updatedHighlighted[rowIndex][col] = true;
      }
      // updatedHighlighted[rowIndex] = Array(9).fill(true);
    }

    setHighlighted(updatedHighlighted);
  };

  const computerTurn = (rowIndex, cellIndex, column) => {
    const cell = column ? grid[chooseRandomCellFromCol(rowIndex, cellIndex)][cellIndex] : grid[rowIndex][chooseRandomCellFromRow(rowIndex, cellIndex)]
    return cell
  }

  const gameStart = () => {
    if (firstMove === 0) {
      setCurrentPlayer('A')
    } else {
      setCurrentPlayer('B')
    }
  }

  
  
  
  const [grid, setGrid] = useState(generateGrid())


  return (
    <>
      <div className="container">

        <h1 className='heading'>Matimato</h1>

        <div className="section">

          <div className="aside">
            <div className="player">
              <h3 className="player">Player A</h3>
              {currnetPlayer === 'A' && <h4>Your turn</h4>}
            </div>
            <h4 className="score">Total score: {playerAScore}</h4>
          </div>

          <div className="game">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className={`row `}>
                {row.map((cell, cellIndex) => (
                  <span key={cellIndex} 
                    className={`cell ${highlighted[rowIndex][cellIndex] ? 'highlighted' : ''} ${visibility[rowIndex][cellIndex] ? getCellBackgroundColor(cell) : ''}`} 
                    onClick={() => cellClick(rowIndex, cellIndex)}>
                    {visibility[rowIndex][cellIndex] ? ' ' : cell[0]}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <div className="aside">
            <div className="player">
              <h3 className="player">Player B</h3>
            </div>
            <h4 className="score">Total score: {playerBScore}</h4>
          </div>

        </div>

      </div>
    </>
  )
}

export default App
