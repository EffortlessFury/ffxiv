import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { LINES, validateGrid, getSuggestion } from './calculate-mini-cactpot'
import Section from '../Section'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import CalculatorCell from './CalculatorCell'
import CalculatorLineIndicator from './CalculatorLineIndicator'

const useStyles = makeStyles((theme) => ({
  gridShrink: {
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      flex: '0 0 auto'
    }
  },
  gridGrow: {
    [theme.breakpoints.up('md')]: {
      flex: '1 1 0px'
    }
  },
  cellsContainer: {
    display: 'inline-block',
    border: theme.palette.type === 'dark' ? '1px solid gray' : '1px solid black'
  },
  suggestion: {
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(8)
    }
  }
}))

const Calculator = () => {
  const [grid, setGrid] = useState(Array(9).fill(null))
  const classes = useStyles()

  const handleInputDigit = (cellIndex, digit) => {
    const newGrid = grid.slice()
    newGrid[cellIndex] = digit
    setGrid(newGrid)
  }

  const handleClickReset = (event) => {
    setGrid(Array(9).fill(null))
  }

  const error = validateGrid(grid)
  const errorCells = {}
  if (error) {
    switch (error.type) {
      case 'TOO MANY':
      case 'DUPLICATES':
        for (const cellIndex of error.cells) {
          errorCells[cellIndex] = true
        }
        break
    }
  }

  const suggestion = !error && getSuggestion(grid)
  const suggestedCells = {}
  if (suggestion) {
    switch (suggestion.type) {
      case 'CELL':
        for (const cellIndex of suggestion.maxCellLocations) {
          suggestedCells[cellIndex] = true
        }
        break
      case 'LINE':
        for (const lineId of suggestion.maxLineIds) {
          for (const cellIndex of LINES[lineId]) {
            suggestedCells[cellIndex] = true
          }
        }
    }
  }

  function isLineSuggested (lineId) {
    return suggestion && suggestion.type === 'LINE' && suggestion.maxLineIds.includes(lineId)
  }

  return (
    <Section>
      <Grid container spacing={4}>
        <Grid item xs={12} className={classes.gridShrink}>
          <table>
            <tbody>
              <tr>
                <td><CalculatorLineIndicator rotate={45} suggested={isLineSuggested(3)} /></td>
                <td><CalculatorLineIndicator rotate={90} suggested={isLineSuggested(4)} /></td>
                <td><CalculatorLineIndicator rotate={90} suggested={isLineSuggested(5)} /></td>
                <td><CalculatorLineIndicator rotate={90} suggested={isLineSuggested(6)} /></td>
                <td><CalculatorLineIndicator rotate={135} suggested={isLineSuggested(7)} /></td>
              </tr>
              <tr>
                <td><CalculatorLineIndicator rotate={0} suggested={isLineSuggested(2)} /></td>
                <td rowSpan={3} colSpan={3}>
                  <div className={classes.cellsContainer}>
                    {[0, 1, 2, null, 3, 4, 5, null, 6, 7, 8].map((cellIndex, index) =>
                      cellIndex !== null
                        ? (
                          <CalculatorCell
                            key={index}
                            value={grid[cellIndex]}
                            suggested={suggestedCells[cellIndex]}
                            error={errorCells[cellIndex]}
                            onInputDigit={handleInputDigit.bind(null, cellIndex)}
                          />
                        )
                        : <br key={index} />
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td><CalculatorLineIndicator rotate={0} suggested={isLineSuggested(1)} /></td>
              </tr>
              <tr>
                <td><CalculatorLineIndicator rotate={0} suggested={isLineSuggested(0)} /></td>
              </tr>
            </tbody>
          </table>
        </Grid>
        <Grid item xs={12} className={classes.gridGrow}>
          <div className={classes.suggestion}>
            {(() => {
              if (error) {
                switch (error.type) {
                  case 'EMPTY':
                    return <Typography paragraph>Click on a square to enter a digit.</Typography>
                  case 'TOO MANY':
                    return <Typography paragraph>Too many cells have been filled!</Typography>
                  case 'DUPLICATES':
                    return <Typography paragraph>Cells cannot repeat digits!</Typography>
                }
              } else {
                switch (suggestion.type) {
                  case 'CELL':
                    return (
                      <>
                        <Typography><b>Expected value:</b> {suggestion.maxCellEV | 0}</Typography>
                        <Typography paragraph>Reveal a highlighted square.</Typography>
                      </>
                    )
                  case 'LINE':
                    return (
                      <>
                        <Typography><b>Expected value:</b> {suggestion.maxLineEV | 0}</Typography>
                        <Typography paragraph>Select a highlighted line!</Typography>
                      </>
                    )
                }
              }
            })()}
            <Button variant='contained' color='secondary' onClick={handleClickReset}>Reset</Button>
          </div>
        </Grid>
      </Grid>
    </Section>
  )
}

export default Calculator
