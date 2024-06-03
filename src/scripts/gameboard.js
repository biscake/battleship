import { Carrier } from "./ships";

const gridAlphabets = ["A", "B", "C", "D", "E", "F", "G", "H ", "I", "J"];

function alphaToNum(alpha) {
  return gridAlphabets.findIndex((element) => element === alpha);
}

function numToAlpha(idx) {
  return gridAlphabets[idx];
}

class gameBoard {
  constructor() {
    this.grids = initGrid();
  }

  placeShip(shipType, startGrid) {
    const ship = new shipType();
    const start = [...startGrid];
    let isHorizontal = true;
    if (isHorizontal) {
      for (let length = 0; length < ship.length; length++) {
        let grid = [];
        grid[0] = start[0];
        grid[1] = parseInt(start[1]) + length;
        console.log(grid);
        // console.log(this.grids[grid]);
        this.grids[grid.join("")].ship = ship;
        console.log(this.grids[grid.join("")]);
      }
    }
  }
}

class grid {
  constructor() {
    this.peg = false;
    this.ship = null;
  }
}

const initGrid = () => {
  let grids = {};

  for (let rows = 0; rows < 10; rows++) {
    for (let columns = 0; columns < 10; columns++) {
      let currentGrid = numToAlpha(rows).toString() + (columns + 1).toString();
      grids[currentGrid] = new grid();
    }
  }

  return grids;
};

const a = new gameBoard();
a.placeShip(Carrier, "B3");

export { gameBoard };
