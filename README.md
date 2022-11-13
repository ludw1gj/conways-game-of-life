# Conway's Game of Life

A TypeScript implementation of Conway's Game of Life. It includes functions to handle drawing the grid on a HTMLCanvasElement.

Game rules are as follows:

- Any live cell with fewer than two live neighbours dies, as if by underpopulation.
- Any live cell with two or three live neighbours lives on to the next generation.
- Any live cell with more than three live neighbours dies, as if by overpopulation.
- Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
