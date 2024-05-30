/*
    Name: Karsten Leung
    Student Number: 200547539
    Date: Thursday, May 30th, 2024
    Project: Rock, paper, scissors with the prompt library from NPM
*/
// Load prompt module
const prompt = require('prompt');

// Start prompt
prompt.start();

// Seeking specific information with certain parameters
prompt.get([{ 
    properties: {
        // User selection parameters
        userSelection: {
            pattern: /(rock|paper|scissors)/i, // must only be rock, paper, or scissors and it's case insensitive
            message: 'Rock, Paper, or Scissors only.', // error message if it does not fit the parameter
            required: true // a valid value MUST be inputted to continue
        }
    }
 }], (err, result) => {
    // Variable declarations
    let gameOverMessage;
    let comp = Math.random();
    // If it is equal or under a certain amount then it will be whatever value is on here
    let computerSelection = comp <= 0.34 ? 'PAPER' : 
        comp <= 0.67 ? 'SCISSORS' : 'ROCK';
    // Decision structure
    // If the values are equal, set to tie
    if (result.userSelection.toUpperCase() == computerSelection) {
        gameOverMessage = "It's a Tie.";
    } else {
        // Otherwise check who wins or loses in a switch statement
        // Checks for computer selection and compares in cases
        switch (computerSelection) {
            case 'ROCK':
                if (result.userSelection.toUpperCase() == 'PAPER') {
                    gameOverMessage = "User Wins.";
                    return;
                }
                gameOverMessage = "Computer Wins";
                break;
            case 'PAPER':
                if (result.userSelection.toUpperCase() == 'SCISSORS') {
                    gameOverMessage = "User Wins.";
                    return;
                }
                gameOverMessage = "Computer Wins";
                break;
            case 'SCISSORS':
                if (result.userSelection.toUpperCase() == 'ROCK') {
                    gameOverMessage = "User Wins.";
                    return;
                }
                gameOverMessage = "Computer Wins";
                break;
        }
    }
    // Console.log message for choices and the game over message
    console.log(`Player chose: ${result.userSelection.toUpperCase()}`);
    console.log(`Computer chose: ${computerSelection}`);
    console.log(gameOverMessage);
});