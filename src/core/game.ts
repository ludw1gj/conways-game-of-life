import { GridDimensions, Grid, GameOfLife } from "./types";

/** Create a conway's game of life game state. */
export const createGameState = (
  gridDimensions: GridDimensions,
  grid?: Grid
): GameOfLife => ({
  gridDimensions,
  grid: grid || createRandomGrid(gridDimensions),
});

/** Conduct a step. */
export const step = (game: GameOfLife): GameOfLife => ({
  ...game,
  grid: generateNextGrid(game),
});

/** Create a random Grid. */
const createRandomGrid = (dimensions: GridDimensions): Grid =>
  Array(dimensions.numRows)
    .fill(Array(dimensions.numCols).fill(undefined))
    .map((row) => row.map(() => Math.floor(Math.random() * 2)));

/** Generate the next state of the grid. */
const generateNextGrid = (game: GameOfLife): Grid =>
  game.grid.map((row, y) =>
    row.map((cell, x) => {
      const neighbours = countNeighbours(game, x, y);
      const isAlive = isCellAlive(cell);

      if (isAlive && neighbours < 2) {
        return 0;
      }
      if (isAlive && (neighbours === 2 || neighbours === 3)) {
        return 1;
      }
      if (isAlive && neighbours > 3) {
        return 0;
      }
      if (!isAlive && neighbours === 3) {
        return 1;
      }
      return cell;
    })
  );

/** Count the amount of live cells surround the cell of the given position. */
const countNeighbours = (
  game: GameOfLife,
  positionX: number,
  positionY: number
): number => {
  let count = 0;
  for (let y = -1; y < 2; y++) {
    for (let x = -1; x < 2; x++) {
      if (x === 0 && y === 0) {
        continue;
      }
      const currentYPos = y + positionY;
      const currentXPos = x + positionX;
      if (
        currentXPos < 0 ||
        currentYPos < 0 ||
        currentXPos >= game.gridDimensions.numCols ||
        currentYPos >= game.gridDimensions.numRows
      ) {
        continue;
      }
      const neighbourCell = game.grid[currentYPos][currentXPos];
      if (isCellAlive(neighbourCell)) {
        count++;
      }
    }
  }
  return count;
};

/** Check if cell is alive. */
const isCellAlive = (cell: number): boolean => cell === 1;
