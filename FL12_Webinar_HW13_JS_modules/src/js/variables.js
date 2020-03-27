const cell = document.getElementsByClassName("game-item");
const reset = document.getElementById("reset-game");
const newGame = document.getElementById("new-game");
const message = document.getElementById("message");

const winCombinations = [
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
    [4, 5, 6],
    [7, 8, 9]
];

export {cell, reset, newGame, message, winCombinations};