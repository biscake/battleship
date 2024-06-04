import { gameBoard } from "../gameboard";
import { Carrier, Destroyer, Submarine } from "../ships";

const gridAlphabets = ["A", "B", "C", "D", "E", "F", "G", "H ", "I", "J"];

function alphaToNum(alpha) {
  return gridAlphabets.findIndex((element) => element === alpha);
}

let board;

function createBoard() {
  board = new gameBoard();
}

beforeEach(() => {
  createBoard();
});

test("Check if baord is created correctly", () => {
  for (let i = 0; i < 10; i++) {
    let x = gridAlphabets[i];
    for (let j = 0; j < 10; j++) {
      let grid = x + (j + 1).toString();
      expect(board.grids[grid].ship).toBe(null);
      expect(board.grids[grid].peg).toBe(false);
    }
  }
});

test("Check if able to place ship correctly", () => {
  board.placeShip(Carrier, "B3");
  for (let i = 0; i < 5; i++) {
    let grid = "B" + (3 + i).toString();
    expect(board.grids[grid].ship instanceof Carrier).toBe(true);
  }
  board.placeShip(Submarine, "C7", 1);
  expect(board.grids["C7"].ship instanceof Submarine).toBe(true);
  expect(board.grids["D7"].ship instanceof Submarine).toBe(true);
  expect(board.grids["E7"].ship instanceof Submarine).toBe(true);
  expect(board.grids["F7"].ship instanceof Submarine).toBe(false);
});

test("Check if placing two ships of same type returns error", () => {
  board.placeShip(Carrier, "B3");
  expect(board.placeShip(Carrier, "D3") instanceof Error).toBe(true);
});

test("Check if ships overlap return error", () => {
  board.placeShip(Carrier, "B3");
  expect(board.placeShip(Submarine, "A4", 1) instanceof Error).toBe(true);
});

test("Check if board received attack", () => {
  board.receiveAttack("B3");
  expect(board.grids.B3.peg).toBe(true);
});

test("Check if ship received hit", () => {
  board.placeShip(Carrier, "B3");
  board.receiveAttack("B3");
  expect(board.grids.B3.ship.hits).toBe(1);
  board.receiveAttack("B4");
  expect(board.grids.B4.ship.hits).toBe(2);
});

test("Check if gameboard tracks sunk ship", () => {
  board.placeShip(Destroyer, "B3");
  board.receiveAttack("B3");
  board.receiveAttack("B4");
  expect(board.sunkShips).toBe(1);
});
