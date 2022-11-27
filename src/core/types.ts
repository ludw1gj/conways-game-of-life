export interface GameConfig {
  canvas: HTMLCanvasElement
  gridDimension: GridDimensions
  painterOptions: PainterOptions
  framesPerSecond: number
}

/** A readonly 2D number array. */
export type Grid = number[][]

/** Dimensions of a 2D Grid. */
export interface GridDimensions {
  /** Number of rows. */
  numRows: number
  /** Number of columns. */
  numCols: number
}

export interface PainterOptions {
  ctx: CanvasRenderingContext2D
  cellSize: number
  padding: number
}

export interface GameInterupt {
  stop: boolean
}

/** A callback that can interupt the painter. */
export type GameInterupter = () => void

export type GameCallback = (grid: Grid) => void
