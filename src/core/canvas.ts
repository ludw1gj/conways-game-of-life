import { createGameState, step } from './game'
import {
  GameConfig,
  PainterInterupt,
  PainterInterupter,
  GameOfLife,
  Painter,
  PainterOptions
} from './types'

export const paintCanvas = (config: GameConfig): PainterInterupter => {
  const { canvas, gridDimension, painterOptions, framesPerSecond } = config
  canvas.height =
    gridDimension.numRows * painterOptions.cellSize + painterOptions.padding
  canvas.width =
    gridDimension.numCols * painterOptions.cellSize + painterOptions.padding

  const gameState = createGameState(gridDimension)
  const paint = generatePainter(gameState, framesPerSecond)
  const context = canvas.getContext('2d')
  if (!context) {
    console.warn('No canvas context')
    return () => {}
  }

  const interupt: PainterInterupt = { stopPaint: false }
  paint(painterOptions, interupt)
  return () => {
    interupt.stopPaint = true
  }
}

/** Generate a painter function that can paint the game grid. */
export const generatePainter = (
  game: GameOfLife,
  framesPerSecond: number
): Painter => (options: PainterOptions, interupt: PainterInterupt): void => {
  stepper(game, options, interupt, framesPerSecond)
}

const stepper = (
  currGame: GameOfLife,
  options: PainterOptions,
  interupt: PainterInterupt,
  framesPerSecond: number
): void => {
  if (interupt.stopPaint) {
    return
  }

  const { ctx, cellSize, padding } = options
  const sidePadding = padding / 2
  for (let y = 0; y < currGame.grid.length; y++) {
    for (let x = 0; x < currGame.grid[y].length; x++) {
      const cell = currGame.grid[y][x]
      ctx.beginPath()
      ctx.rect(
        x * cellSize + sidePadding,
        y * cellSize + sidePadding,
        cellSize,
        cellSize
      )
      ctx.fillStyle = cell ? 'black' : 'white'
      ctx.fill()
      ctx.stroke()
    }
  }
  setTimeout(() => {
    const steppedGame = step(currGame)
    requestAnimationFrame(() =>
      stepper(steppedGame, options, interupt, framesPerSecond)
    )
  }, 1000 / framesPerSecond)
}
