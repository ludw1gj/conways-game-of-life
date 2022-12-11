import {
  GridDimensions,
  Grid,
  GameInterupt,
  GameCallback,
  GameInterupter,
} from './types'

export const runGame = (
  dimensions: GridDimensions,
  tickerRate: number,
  callback: GameCallback
): GameInterupter => {
  const interupt: GameInterupt = { stop: false }
  const grid = createGameGrid(dimensions)
  callback(grid)
  gameLoop(grid, tickerRate, callback, interupt)
  return () => {
    interupt.stop = true
  }
}

const gameLoop = (
  grid: Grid,
  tickerRate: number,
  callback: GameCallback,
  interupt: GameInterupt
) => {
  if (interupt.stop) {
    return
  }
  setTimeout(() => {
    const nextGrid = generateNextGrid(grid)
    requestAnimationFrame(() => {
      callback(nextGrid)
      gameLoop(nextGrid, tickerRate, callback, interupt)
    })
  }, tickerRate)
}

/** Create a conway's game of life game grid. */
const createGameGrid = (dimensions: GridDimensions): Grid =>
  Array(dimensions.numRows)
    .fill(Array(dimensions.numCols).fill(undefined))
    .map((row) => row.map(() => Math.floor(Math.random() * 2)))

/** Generate the next state of the grid. */
const generateNextGrid = (grid: Grid): Grid =>
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

const cellNeighbourIndexes: ReadonlyArray<[x: number, y: number]> = [-1, 0, 1]
  .flatMap((y) => [-1, 0, 1].map((x) => [x, y] as [x: number, y: number]))
  .filter(([x, y]) => !(x === 0 && y === 0))

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
