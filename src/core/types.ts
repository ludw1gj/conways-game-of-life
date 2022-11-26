export interface GameConfig {
  canvas: HTMLCanvasElement
  gridDimension: GridDimensions
  painterOptions: PainterOptions
  framesPerSecond: number
}

/** Conway's Game of Life state. */
export interface GameOfLife {
  readonly grid: Grid
  readonly gridDimensions: GridDimensions
}

/** A readonly 2D number array. */
export type Grid = Array<Array<number>>

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

export declare type Painter = (
  options: PainterOptions,
  interupt: PainterInterupt
) => void

export interface PainterInterupt {
  stopPaint: boolean
}

/** A function that can interupt the painter. */
export type PainterInterupter = () => void
