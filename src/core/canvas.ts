import { runGame } from './game'
import { GameConfig, GameInterupter, PainterOptions, Grid } from './types'

export const paintCanvas = ({
  canvas,
  gridDimension,
  painterOptions,
  framesPerSecond,
}: GameConfig): GameInterupter => {
  const tickerRate = 1000 / framesPerSecond
  const gridPainter = generateGridPainter(painterOptions)
  canvas.height =
    gridDimension.numRows * painterOptions.cellSize + painterOptions.padding
  canvas.width =
    gridDimension.numCols * painterOptions.cellSize + painterOptions.padding
  return runGame(gridDimension, tickerRate, gridPainter)
}

/** Generate a painter function that can paint the game grid. */
const generateGridPainter =
  ({ ctx, cellSize, padding }: PainterOptions) =>
  (grid: Grid) => {
    const sidePadding = padding / 2
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        ctx.beginPath()
        ctx.rect(
          rowIndex * cellSize + sidePadding,
          colIndex * cellSize + sidePadding,
          cellSize,
          cellSize
        )
        ctx.fillStyle = cell ? 'black' : 'white'
        ctx.fill()
        ctx.stroke()
      })
    })
  }
