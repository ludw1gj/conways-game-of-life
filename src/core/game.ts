import { GridDimensions, Grid } from './types'

/** Create a conway's game of life game grid. */
export const createGameGrid = (dimensions: GridDimensions): Grid =>
  Array(dimensions.numRows)
    .fill(Array(dimensions.numCols).fill(undefined))
    .map((row) => row.map(() => Math.floor(Math.random() * 2)))

/** Generate the next state of the grid. */
export const generateNextGrid = (grid: Grid): Grid =>
  grid.map((row, y) =>
    row.map((cell, x) => {
      const isAlive = isCellAlive(cell)
      const aliveNeighboursAmt = countAliveNeighbours(grid, x, y)

      if (isAlive && aliveNeighboursAmt < 2) {
        return 0
      }
      if (isAlive && (aliveNeighboursAmt === 2 || aliveNeighboursAmt === 3)) {
        return 1
      }
      if (isAlive && aliveNeighboursAmt > 3) {
        return 0
      }
      if (!isAlive && aliveNeighboursAmt === 3) {
        return 1
      }
      return cell
    })
  )

const cellNeighbourIndexes: ReadonlyArray<ReadonlyArray<number>> = [-1, 0, 1]
  .flatMap((y) => [-1, 0, 1].map((x) => [x, y]))
  .filter(([x, y]) => x !== 0 && y !== 0)

/** Check if cell is alive. */
const isCellAlive = (cell: number): boolean => cell === 1

/** Count the amount of live cells surround the cell of the given position. */
const countAliveNeighbours = (
  grid: Grid,
  positionX: number,
  positionY: number
): number =>
  cellNeighbourIndexes.reduce((acc, [x, y]) => {
    const currentYPos = y + positionY
    const currentXPos = x + positionX
    if (
      currentXPos < 0 ||
      currentXPos >= grid[0]?.length ||
      currentYPos < 0 ||
      currentYPos >= grid.length
    ) {
      return acc
    }
    const neighbourCell = grid[currentYPos][currentXPos]
    if (isCellAlive(neighbourCell)) {
      return acc + 1
    }
    return acc
  }, 0)
