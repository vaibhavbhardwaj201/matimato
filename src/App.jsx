import { useState, useEffect } from 'react'

import './App.css'

function App() {

  const [visibility, setVisibility] = useState(
    Array(9).fill().map(() => Array(9).fill(false))
  );

  const [firstMove, setFirstMove] = useState(0)
  const [column, setColumn] = useState(true)

  const cellClick = (rowIndex, cellIndex) => {
    const updatedVisibility = [...visibility];
    updatedVisibility[rowIndex][cellIndex] = true;
    setVisibility(updatedVisibility);

  };

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

  const highlightMoves = (rowIndex, cellIndex, column) => {

  }

  const computerTurn = (rowIndex, cellIndex, column) => {
    const cell = column ? grid[chooseRandomCellFromCol(rowIndex, cellIndex)][cellIndex] : grid[rowIndex][chooseRandomCellFromRow(rowIndex, cellIndex)]
    console.log(cell);
    return cell
  }

  const gameStart = () => {

  }

  
  
  
  const [grid, setGrid] = useState(generateGrid())
  // const grid = generateGrid()
  
  computerTurn(4, 1, column)
 

  // grid.forEach(row => console.log(row.join('   ')))

  // grid.forEach(row => console.log(row.map(cell => cell[0]).join('   ')));


  return (
    <>
      <div className="container">

        <h1 className='heading'>Matimato</h1>

        <div className="section">

          <div className="aside">
            <div className="player">
              <h3 className="player">Player A</h3>
            </div>
            <h4 className="score">Total score: 8</h4>
          </div>

          <div className="game">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className='row'>
                {row.map((cell, cellIndex) => (
                  <span key={cellIndex} 
                    className={`cell ${visibility[rowIndex][cellIndex] ? getCellBackgroundColor(cell) : ''}`} 
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
            <h4 className="score">Total score: 5</h4>
          </div>

        </div>

      </div>
    </>
  )
}

export default App
