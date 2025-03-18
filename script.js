// Keep score
let roundNumber = 1;
let humanScore = 0;
let computerScore = 0;

function getRockPaperScissors(number) {
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
    return getRockPaperScissors(number);
}

function getHumanChoice(event) {
    playRound(getComputerChoice(), event.target.id);
}

// then matching the two together
function determineWhoWins(computer, human) {
const roundMessage = document.querySelector('.round-message');
const roundCount = document.querySelector('.round-count');
            
    if (computer > human) {
        roundMessage.textContent = (computerScore++, '-- Computer Wins -- | Computer: ' + computerChoice + ' | Human: ' + humanChoice);
    } else if (computer < human) {
        roundMessage.textContent = (humanScore++, ' -- Human Wins -- | Computer: ' + computerChoice + ' | Human: ' + humanChoice);
    } else {
        roundMessage.textContent = ('It\'s a tie!');
    }
    roundCount.textContent = ('Round ' + roundNumber)
}

function logicRockPaperScissors(computer, human) {
    computerChoice = computer;
    humanChoice = human;
    if (computer === human) {
        return determineWhoWins(0, 0);
    } else if (
        computer === 'rock' && human === 'scissors' ||
        computer === 'paper' && human === 'rock' ||
        computer === 'scissors' && human === 'paper'
    ) {
        return determineWhoWins(1, 0);
    } else {
        return determineWhoWins(0, 1);
    }
}

// outputting the result
function playRound(computer, human) {
    const humanScoreDisplay = document.querySelector('.human-score');
    const computerScoreDisplay = document.querySelector('.computer-score');

    const resetContainer = document.querySelector('#reset-container');
    const resetButton = document.createElement('button');
    resetButton.textContent = ('Play Again?');

    resetButton.addEventListener('click', () => {
        window.location.reload();
    })
    
    logicRockPaperScissors(computer, human);
    roundNumber++;
    const result = document.querySelector('.results');
    
    if (humanScore === 5) {
        result.textContent = 'Human Wins!';
        buttonsContainer.forEach((button) => button.removeEventListener('click', getHumanChoice));
        resetContainer.appendChild(resetButton);
        
    }
    else if (computerScore === 5) {
        result.textContent = 'Computer Wins!';
        buttonsContainer.forEach((button) => button.removeEventListener('click', getHumanChoice));
        resetContainer.appendChild(resetButton);
    }

    humanScoreDisplay.textContent = (`Human Score: ${humanScore}`);
    computerScoreDisplay.textContent = (`Computer Score: ${computerScore}`);

}

// return the thing that I clicked and it's properties
const buttonsContainer = document.querySelectorAll('button')

buttonsContainer.forEach((button) => button.addEventListener('click', getHumanChoice));



