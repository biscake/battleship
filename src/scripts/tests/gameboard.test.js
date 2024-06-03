import { gameBoard } from "../gameboard";
import { Carrier } from "../ships";

test("Check if able to place ship correctly", () => {
  const board = new gameBoard();
  board.placeShip(Carrier, "B3");
  for (let i = 0; i < 5; i++) {
    let grid = "B" + (3 + i).toString();
    expect(board.grids[grid].ship instanceof Carrier).toBe(true);
  }
});
