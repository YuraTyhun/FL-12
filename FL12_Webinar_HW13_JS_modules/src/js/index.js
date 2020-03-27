import {cell, reset, newGame, message, winCombinations} from './variables';
import '../scss/index.scss';

let stepCount = 0;

let dataX = [];
let dataO = [];

let playerOneWins = 0;
let playerTwoWins = 0;

const symbols = ['X', 'O'];
let turnIndex = Math.round(Math.random());
let player = symbols[turnIndex];
document.getElementById("message").innerText = `Player ${player} turn`;

document.getElementById('p1-wins').innerText = playerOneWins;
document.getElementById('p2-wins').innerText = playerTwoWins;

for (var i = 0; i < cell.length; i++) {
  cell[i].addEventListener("click", currentStep);
}

function currentStep() {
  let num = Number(this.getAttribute("data-cell"));
  if (!this.textContent) {
    this.innerText = player;
    if (player === 'X') {
      dataX.push(num);
      this.classList.add("x");
    } else {
      dataO.push(num);
      this.classList.add("o");
    }
    if ((dataO.length > 2 || dataX.length > 2) && (checkWin(dataO, num) || checkWin(dataX, num))) {
      for (let i = 0; i < cell.length; i++) {
        cell[i].removeEventListener("click", currentStep);
      }
      if (player === "X") {
        playerOneWins += 1;
        document.getElementById('p1-wins').innerText = playerOneWins;
      } else {
        playerTwoWins += 1;
        document.getElementById('p2-wins').innerText = playerTwoWins;
      }
      return (message.innerText = `Congratulations! Player ${player} won`);
    }
    changePlayer();
    stepCount++;
    if (stepCount === 9) {
      message.innerText = "DRAW!!!";
      playerOneWins += 1;
      playerTwoWins += 1;
      document.getElementById('p1-wins').innerText = playerOneWins;
      document.getElementById('p2-wins').innerText = playerTwoWins;

    } else {
      message.innerText = `Player ${player} turn`;
    }
  }
}

const changePlayer = () => {
  if (player === 'X') {
    player = 'O';
  } else {
    player = "X";
  }
}

const init = () => {
  for (var i = 0; i < cell.length; i++) {
    cell[i].innerText = "";
  }
  dataO = [];
  dataX = [];
  turnIndex = Math.round(Math.random());
  player = symbols[turnIndex];
  stepCount = 0;
  message.innerText = `Player ${player} turn`;
  for (var i = 0; i < cell.length; i++) {
    cell[i].addEventListener("click", currentStep);
    cell[i].classList.remove("x", "o");
  }
}

reset.addEventListener("click", () => {
  playerOneWins = 0;
  playerTwoWins = 0;
  document.getElementById('p1-wins').innerText = playerOneWins;
  document.getElementById('p2-wins').innerText = playerTwoWins;
  init();
});

newGame.addEventListener("click", init);

const checkWin = (arr, number) => {
  for (let i = 0; i < winCombinations.length; i++) {
    let winArr = winCombinations[i],
      count = 0;
    if (winArr.indexOf(number) !== -1) {
      for (var j = 0; j < winArr.length; j++) {
        if (arr.indexOf(winArr[j]) !== -1) {
          count++;
          if (count === 3) {
            return true;
          }
        }
      }
      count = 0;
    }
  }
}
