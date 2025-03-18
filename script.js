// Keep score
let roundNumber = 1;
let humanScore = 0;
let computerScore = 0;

// then matching the two together
function determineWhoWins(computer, human) {
    const roundCount = document.querySelector('.round-count');
    roundCount.textContent = ('Round ' + roundNumber)
    
    const roundMessage = document.querySelector('.round-message');
    function roundMessageFunc() {
        if (computer > human) {
            return (computerScore++, '-- Computer Wins -- | Computer: ' + computerChoice + ' | Human: ' + humanChoice);
        } else if (computer < human) {
            return (humanScore++, ' -- Human Wins -- | Computer: ' + computerChoice + ' | Human: ' + humanChoice);
        } else {
            return ('-- No Winner -- | It\'s a tie!');
        }
    }
    roundMessage.textContent = roundMessageFunc()
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

function playRound(computer, human) {
    const humanScoreDisplay = document.querySelector('.human-score');
    const computerScoreDisplay = document.querySelector('.computer-score');
    humanScoreDisplay.textContent = (`Human Score: ${humanScore}`);
    computerScoreDisplay.textContent = (`Computer Score: ${computerScore}`);
    
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
    } else if (computerScore === 5) {
        result.textContent = 'Computer Wins!';
        buttonsContainer.forEach((button) => button.removeEventListener('click', getHumanChoice));
        resetContainer.appendChild(resetButton);
    }
}

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

const buttonsContainer = document.querySelectorAll('button')
buttonsContainer.forEach((button) => button.addEventListener('click', getHumanChoice));