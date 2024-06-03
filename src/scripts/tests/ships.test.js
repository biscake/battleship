import {
  Battleship,
  Carrier,
  Cruiser,
  Submarine,
  Destroyer,
  isSunk,
} from "../ships";

test("Check if ships sunk", () => {
  const BS = new Battleship();
  BS.hits = 4;
  expect(isSunk(BS)).toBeTruthy();
  const C = new Carrier();
  C.hits = 1;
  expect(isSunk(C)).toBeFalsy();
});
