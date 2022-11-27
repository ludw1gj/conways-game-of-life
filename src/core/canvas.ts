import { createGameGrid, generateNextGrid } from './game'
import {
  GameConfig,
  PainterInterupt,
  PainterInterupter,
  Painter,
  PainterOptions,
  Grid,
} from './types'

export const paintCanvas = ({
  canvas,
  gridDimension,
  painterOptions,
  framesPerSecond,
}: GameConfig): PainterInterupter => {
  const interupt: PainterInterupt = { stopPaint: false }
  const grid = createGameGrid(gridDimension)
  const paint = generatePainter(grid, framesPerSecond)
  canvas.height =
    gridDimension.numRows * painterOptions.cellSize + painterOptions.padding
  canvas.width =
    gridDimension.numCols * painterOptions.cellSize + painterOptions.padding
  paint(painterOptions, interupt)

  return () => {
    interupt.stopPaint = true
  }
}

/** Generate a painter function that can paint the game grid. */
export const generatePainter =
  (game: Grid, framesPerSecond: number): Painter =>
  (options: PainterOptions, interupt: PainterInterupt) =>
    paintGrid(game, options, interupt, framesPerSecond)

const paintGrid = (
  grid: Grid,
  options: PainterOptions,
  interupt: PainterInterupt,
  framesPerSecond: number
): void => {
  if (interupt.stopPaint) {
    return
  }
  const { ctx, cellSize, padding } = options
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
  setTimeout(() => {
    const nextGrid = generateNextGrid(grid)
    requestAnimationFrame(() =>
      paintGrid(nextGrid, options, interupt, framesPerSecond)
    )
  }, 1000 / framesPerSecond)
}
