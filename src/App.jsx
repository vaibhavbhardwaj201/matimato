import { useState, useEffect } from 'react'

import './App.css'

function App() {

  const [visibility, setVisibility] = useState(
    Array(9).fill().map(() => Array(9).fill(false))
  );

  const handleClick = (rowIndex, cellIndex) => {
    const updatedVisibility = [...visibility];
    updatedVisibility[rowIndex][cellIndex] = true;
    setVisibility(updatedVisibility);

    console.log(grid[rowIndex][cellIndex]);
  };


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
    generateGrid()
  
    
  }, [])
  


  const [grid, setGrid] = useState(generateGrid())
  // const grid = generateGrid()

 

  // grid.forEach(row => console.log(row.join('   ')))

  grid.forEach(row => console.log(row.map(cell => cell[0]).join('   ')));


  return (
    <>
      <div className="container">

        <h1 className='heading'>Matimato</h1>

        <div className="section">

          <div className="aside">
            <h3 className="player">Player A</h3>
            <h4 className="score">Total score: 8</h4>
          </div>

          <div className="game">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className='row'>
                {row.map((cell, cellIndex) => (
                  <span key={cellIndex} className='cell' onClick={() => handleClick(rowIndex, cellIndex)}>
                    {visibility[rowIndex][cellIndex] ? cell[0] : ' '}
                    {/* {cell[0]} */}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <div className="aside">
            <h3 className="player">Player B</h3>
            <h4 className="score">Total score: 5</h4>
          </div>

        </div>

      </div>
    </>
  )
}

export default App
