import { doc } from "prettier";
import { gameBoard, Player } from "./gameboard";
import {
  Battleship,
  Carrier,
  Cruiser,
  Submarine,
  Destroyer,
  isSunk,
} from "./ships";

const playerone = new Player();
const playertwo = new Player();

const domController = {
  init: () => {
    const playerOneDisplay = document.querySelector("#player-one");
    const playerTwoDisplay = document.querySelector("#player-two");
    Object.keys(playerone.board.grids).forEach((gridKey) => {
      const gridDiv = document.createElement("div");
      gridDiv.setAttribute("data", gridKey);
      playerOneDisplay.appendChild(gridDiv);
      playerTwoDisplay.appendChild(gridDiv);
    });
  },
  update: () => {
    console.log("testing");
  },
  pass: () => {
    console.log("pass modal");
  },
};

domController.init();
