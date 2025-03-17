// keeping score
let roundNumber = 1;
let humanScore = 0;
let computerScore = 0;

// then computer input
function convertRockPaperScissors(number) {
    if (number > 66) {
        return 'scissors';
    } else if (number <= 66 && number > 33) {
        return 'rock';
    } else if (number <= 33 && number > 0) {
        return 'paper';
    }
}

function getComputerChoice() {
    let number = Math.floor(Math.random() * 100) + 1;
    return convertRockPaperScissors(number);
}

//round consists of getting user input
function getHumanChoice(event) {
    playRound(getComputerChoice(), event.target.id);
}

// then matching the two together
function determine(computer, human) {
    if (computer > human) {
        return (computerScore++, 'Computer: ' + computerChoice + ' | Human: ' + humanChoice + ' -- Computer Wins --');
    } else if (computer < human) {
        return (humanScore++, 'Computer: ' + computerChoice + ' | Human: ' + humanChoice + ' -- Human Wins --');
    } else {
        return ('It\'s a tie!');
    }
}

function logicRockPaperScissors(computer, human) {
    computerChoice = computer;
    humanChoice = human;
    if (computer === human) {
        return determine(0, 0);
    } else if (
        computer === 'rock' && human === 'scissors' ||
        computer === 'paper' && human === 'rock' ||
        computer === 'scissors' && human === 'paper'
    ) {
        return determine(1, 0);
    } else {
        return determine(0, 1);
    }
}


const scoreContainer = document.querySelector('#score-container');
const roundContainer = document.querySelector('#round-container');
const resetContainer = document.querySelector('#reset-container');
const humanScoreDisplay = document.querySelector('.human-score');
const computerScoreDisplay = document.querySelector('.computer-score');


// outputting the result
function playRound(computer, human) {
    console.log(('Round ' + roundNumber))
    console.log(logicRockPaperScissors(computer, human))
    roundNumber++
    const result = document.querySelector('.results');
    
    if (humanScore === 5) {
        result.textContent = 'Human Wins!';
        buttonsContainer.forEach((button) => button.removeEventListener('click', getHumanChoice));
    }
    else if (computerScore === 5) {
        result.textContent = 'Computer Wins!';
        buttonsContainer.forEach((button) => button.removeEventListener('click', getHumanChoice));
    }
    humanScoreDisplay.textContent = (`Human Score: ${humanScore}`);
    computerScoreDisplay.textContent = (`Computer Score: ${computerScore}`);
}




// return the thing that I clicked and it's properties
const buttonsContainer = document.querySelectorAll('button')

buttonsContainer.forEach((button) => button.addEventListener('click', getHumanChoice));



