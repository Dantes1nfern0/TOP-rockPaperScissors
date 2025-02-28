let humanScore = 0;
let computerScore = 0;

// randomly return one of the following values:
// 'rock', 'paper', or 'scissors'
function getComputerChoice() {
    // Create variable name computerChoice
    let computerChoice;
    // Call math.random, apply math.floor function to it, multiply by 100, add 1, and store in variable randomNum
    let randomNum = Math.floor(Math.random() * 100) + 1;
    // IF randomNum is less then or equal to 33:
    if (randomNum <= 33) {
        // Assign string 'rock' to computerChoice
        computerChoice = 'rock';
        // Return computerChoice
        return computerChoice;
    }
    else if (randomNum <= 66) {
        // Assign string 'paper' to computerChoice
        computerChoice = 'paper';
        // Return computerChoice
        return computerChoice;
    }
    else {
        // Assign string 'paper' to computerChoice
        computerChoice = 'scissors';
        // Return computerChoice
        return computerChoice;
    }
}

// Prompt for user input for either 'rock', 'paper', or 'scissors'
// Return user input
function getHumanChoice() {
    // Prompt for human to enter 'rock', 'paper', or 'scissors' and assign to userInput
    userInput = prompt('Please enter \'Rock\', \'Paper\', or \'Scissors\'')
    // IF user inputs wrong invalid string:
    if (userInput.toLowerCase() === 'rock' || 
    userInput.toLowerCase() === 'paper' || 
    userInput.toLowerCase() === 'scissors') {
        // Cancel and return 'Invalid Input'
        return userInput.toLowerCase();
    }
    // ELSE IF user inputs valid string:
    else {
        return console.log('Cancelled: Invalid input.');
    }
        // RETURN user's input
}

// Takes a string value from humanChoice and computerChoice and outputs a round winner
// - 'paper' beats 'rock'
// - 'rock' beats 'scissors'
// - 'scissors' beats 'paper'
function playRound(humanChoice, computerChoice) {
    if (humanChoice === 'paper') {
        if (computerChoice === 'rock') {
            return humanScore++;
        } else if (computerChoice === 'scissors') {
            return computerScore++;
        }
    } 
    if (humanChoice === 'rock') {
        if (computerChoice === 'scissors') {
            return humanScore++;
        } else if (computerChoice === 'paper') {
            return computerScore++;
        }
    }
    if (humanChoice === 'scissors') {
        if (computerChoice === 'paper') {
            return humanScore++;
        } else if (computerChoice === 'rock') {
            return computerScore++;
        }
    } 
    if (humanChoice === computerChoice) {
        return console.log('It\'s tie!');
    }
}

const humanSelection = getHumanChoice();
const computerSelection = getComputerChoice();

function playGame() {
    playRound(humanSelection, computerSelection);
    console.log(humanScore);
    console.log(computerScore);
}

playRound(humanSelection, computerSelection);
playGame();
