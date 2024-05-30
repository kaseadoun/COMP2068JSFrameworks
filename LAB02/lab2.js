const prompt = require('prompt');

prompt.start();

prompt.get([{ 
    properties: {
        userSelection: {
            pattern: /(rock|paper|scissors)/i,
            message: 'Rock, Paper, or Scissors only.',
            required: true
        }
    }
 }], (err, result) => {

    let gameOverMessage;
    let comp = Math.random();
    let computerSelection = comp <= 0.34 ? 'PAPER' : 
        comp <= 0.67 ? 'SCISSORS' : 'ROCK';

    if (result.userSelection.toUpperCase() == computerSelection) {
        gameOverMessage = "It's a Tie.";
    } else {
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

    console.log(`Player chose: ${result.userSelection.toUpperCase()}`);
    console.log(`Computer chose: ${computerSelection}`);
    console.log(gameOverMessage);
});