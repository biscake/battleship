import { Carrier, isSunk } from "./ships";

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
    this.sunkShips = 0;
    this.ships = [];
    this.maxShips = 5;
  }

  placeShip(shipType, startGrid, isVertical = 0) {
    if (this.ships.includes(shipType)) {
      return new Error(`Already placed a ${shipType.name}`);
    }
    this.ships.push(shipType);
    const ship = new shipType();
    const arr = [...startGrid];
    const start = [alphaToNum(arr[0]), parseInt(arr[1])];
    let tmp = start.slice();
    let min = 0;
    let max = 10 - ship.length + 1;
    let selectRowOrCol;
    let q = [];
    if (isVertical) {
      selectRowOrCol = 0;
    } else {
      selectRowOrCol = 1;
    }
    if (start[selectRowOrCol] >= min && start[selectRowOrCol] <= max) {
      for (let length = 0; length < ship.length; length++) {
        let grid = gridAlphabets[tmp[0]] + tmp[1].toString();
        if (!this.grids[grid].ship) {
          q.push(grid);
          tmp[selectRowOrCol] = tmp[selectRowOrCol] + 1;
        } else {
          return new Error("Overlapping of ships");
        }
      }
    }
    while (q.length) {
      this.grids[q.shift()].ship = ship;
    }
  }

  receiveAttack(grid) {
    if (!this.grids[grid].peg) {
      this.grids[grid].peg = true;
    } else {
      return new Error("Already pegged");
    }
    if (this.grids[grid].ship) {
      this.grids[grid].ship.hit();
      if (isSunk(this.grids[grid].ship)) {
        this.sunkShips += 1;
      }
      return 1;
    } else {
      return 0;
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

export { gameBoard };
