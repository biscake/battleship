import { gameBoard, Player } from "./gameboard";
import {
  Battleship,
  Carrier,
  Cruiser,
  Submarine,
  Destroyer,
  isSunk,
} from "./ships";

const playerOneDisplay = document.querySelector("#player-one");
const playerTwoDisplay = document.querySelector("#player-two");

function initBoardDisplay() {
  const fillerBoard = new gameBoard();
  Object.keys(fillerBoard.grids).forEach((gridKey) => {
    const gridDiv = document.createElement("div");
    gridDiv.setAttribute("id", gridKey);
    const gridDiv1 = gridDiv.cloneNode();
    playerOneDisplay.appendChild(gridDiv);
    playerTwoDisplay.appendChild(gridDiv1);
  });
}

function refreshBoardDisplay(player1, player2) {
  let q = [player1, player2];
  let q2 = [playerOneDisplay, playerTwoDisplay];
  while (q.length) {
    const current = q.shift();
    const currentPlayerDisplay = q2.shift();
    Object.keys(current.board.grids).forEach((grid) => {
      const gridDisplay = currentPlayerDisplay.querySelector(`#${grid}`);
      const currentGrid = current.board.grids[grid];
      // console.log(current.name, grid, currentGrid);
      if (currentGrid.ship) {
        gridDisplay.style.backgroundColor = "pink";
      }
      if (currentGrid.peg) {
        if (currentGrid.ship) {
          //color red
          gridDisplay.classList.add("peg-ship");
          gridDisplay.style.backgroundColor = "red";
        } else {
          //peg it
          gridDisplay.classList.add("peg");
          gridDisplay.style.backgroundColor = "black";
        }
      }
    });
  }
}

function startGame() {
  playerOneDisplay.addEventListener("click", (e) => {
    const getGrid = e.target.id;
  });
}

const player1 = new Player("p1");
const player2 = new Player("p2");

initBoardDisplay();
// player1.board.placeShip(Carrier, "B3");
// player1.board.grids.B3.peg = true;

player2.board.placeShipRandomly();

refreshBoardDisplay(player1, player2);
