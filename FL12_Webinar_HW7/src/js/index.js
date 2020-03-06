import Score from './score.js';
import '../scss/index.scss';

let score = new Score();

// Create variables from DOM elements
const rock = document.querySelector('.rock');
const paper = document.querySelector('.paper');
const scissors = document.querySelector('.scissors');
const reset = document.querySelector('.reset');

const gameStatus = document.querySelector('.status');
const gameResult = document.querySelector('.result');

// Computer turn
const computerTurn = () => {
  let rand = Math.floor(Math.random() * 3);
  let compTurn = ['rock', 'paper', 'scissors'];
  return compTurn[rand];
};

// Start the game
const startRound = e => {
  let result = {
    computer: computerTurn(),
    user: e.target.className
  };

  // Find a winner in every round
  const findWinner = () => {
    if (result.computer === result.user) {
      drawLog();
    } else if (result.computer === 'rock') {
      if (result.user === 'paper') {
        score.win++;
        winLog();
      } else if (result.user === 'scissors') {
        score.lose++;
        loseLog();
      }
    } else if (result.computer === 'paper') {
      if (result.user === 'rock') {
        score.lose++;
        loseLog();
      } else if (result.user === 'scissors') {
        score.win++;
        winLog();
      }
    } else if (result.computer === 'scissors') {
      if (result.user === 'rock') {
        score.win++;
        winLog();
      } else if (result.user === 'paper') {
        score.lose++;
        loseLog();
      }
    }
  };

  // Messages for each round.
  const winLog = () => {
    gameStatus.innerHTML = `<span class='round'>Round ${score.round}</span>.  
      <span class='player'>${result.user}</span> vs 
      <span class='player'>${result.computer}</span>, You’ve WON!`;
  };
  const loseLog = () => {
    gameStatus.innerHTML = `<span class='round'>Round ${score.round}</span>. 
      <span class='player'>${result.user}</span> vs 
      <span class='player'>${result.computer}</span>, You’ve LOSE!`;
  };
  const drawLog = () => {
    gameStatus.innerHTML = `<span class='round'>Round ${score.round}</span>. 
      <span class='player'>${result.user}</span> vs 
      <span class='player'>${result.computer}</span>, DRAW!`;
  };

  // Get total result. After 3 rounds.
  const winner = () => {
    const win = score.win;
    const lose = score.lose;
    let txt = '';
    if (win === lose) {
      txt = 'DRAW!!! Please, try again';
    } else if (win > lose) {
      txt = 'Congratulations!!! You Win The Game!';
    } else {
      txt = 'Sorry, but you lose! Have a nice day!';
    }

    // Message patterns.
    const stats = `User score: ${score.win} <br> 
                  Computer score: ${score.lose} <br>`;
    const resultTxt = `<span class='result'>${txt}</span>`;
    gameResult.innerHTML = stats + resultTxt;
  };

  // Three round for game.
  if (score.round < 2) {
    score.round++;
    findWinner();
  } else {
    score.round++;
    findWinner();
    winner();
    disableBtns();
  }
};

// Reset game.
const resetGame = () => {
  score.reset();
  rock.addEventListener('click', startRound);
  scissors.addEventListener('click', startRound);
  paper.addEventListener('click', startRound);
  gameStatus.innerHTML = '';
  gameResult.innerHTML = '';
};

// Remove click
const disableBtns = () => {
  rock.removeEventListener('click', startRound);
  scissors.removeEventListener('click', startRound);
  paper.removeEventListener('click', startRound);
};

rock.addEventListener('click', startRound);
scissors.addEventListener('click', startRound);
paper.addEventListener('click', startRound);
reset.addEventListener('click', resetGame);
