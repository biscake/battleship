import {
  Battleship,
  Carrier,
  Cruiser,
  Destroyer,
  Submarine,
  isSunk,
} from "./ships";

const gridAlphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

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

  placeShip(shipType, startGrid, isVertical) {
    if (this.ships.includes(shipType)) {
      throw new Error(`Already placed a ${shipType.name}`);
      // return 0;
    }
    this.ships.push(shipType);
    const ship = new shipType();
    const arr = [...startGrid];
    const start = [alphaToNum(arr[0]), parseInt(arr[1])];
    let tmp = [alphaToNum(arr[0]), parseInt(arr[1])];
    let min = 0;
    let max = 10 - ship.length + 1;
    let selectRowOrCol;
    let q = [];
    // 1 is vertical, 0 is horizontal
    // alpha is Y, num is X
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
          throw new Error("Overlapping of ships");
        }
      }
    } else {
      throw new Error("Out of bounds");
    }
    while (q.length) {
      this.grids[q.shift()].ship = ship;
    }
    return true;
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

  placeShipRandomly(
    shipTypes = [Carrier, Battleship, Cruiser, Submarine, Destroyer],
  ) {
    console.log("ran");
    if (!shipTypes.length) {
      return null;
    }
    try {
      this.placeShip(
        shipTypes[0],
        generateRandomGrid(),
        generateRandomOrientation(),
      );
      console.log("no error");
      shipTypes.shift();
      console.log("shifted");
    } catch {
      console.log("caugh error");
      this.placeShipRandomly(shipTypes);
    }
  }
}

function generateRandomGrid() {
  const randomX = Math.floor(Math.random() * 10) + 1;
  const randomY =
    gridAlphabets[Math.floor(Math.random() * gridAlphabets.length)];
  const grid = randomY + randomX.toString();
  return grid;
}
function generateRandomOrientation() {
  return Math.floor(Math.random() * 2);
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

class Player {
  constructor(name) {
    this.name = name;
    this.board = new gameBoard();
  }
}

export { Player, gameBoard };
