
let roundNumber = 1;
let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
    let number = Math.floor(Math.random() * 100) + 1;
    if (number <= 33) {
        return 'paper';
    } else if (number <= 66) {
        return 'rock';
    } else {
        return 'scissors';
    }
}

function rpsStamp(e) {
    const rpsArray = ['rock', 'paper', 'scissors'];
    for (i = 0; i < rpsArray.length; i++) {
        if (e.target.classList.contains(rpsArray[i]) == true) {
            return rpsArray[i];
        }
    }
}

const playerButtons = document.querySelectorAll('.player');
playerButtons.forEach((element) => element.addEventListener('click', getHumanChoice));
const rpsButtons = document.querySelectorAll('.rps-button');
rpsButtons.forEach((element) => element.addEventListener('mouseenter', defaultHoverMessageBar));

const messageBar = document.querySelector('.message-bar-container');
function defaultHoverMessageBar(e) {
    if (e.target.classList.contains('cpu')) {
        messageBar.textContent = ('No peeking!');
    } else if (e.target.classList.contains('player')) {
        messageBar.textContent = (`Going with ${rpsStamp(e)}?`);
    }
    rpsButtons.forEach((element) => element.addEventListener('mouseleave', () => {
        messageBar.textContent = ('Make a selection...');
    }))
}

function getHumanChoice(e) {
    playRound(getComputerChoice(), rpsStamp(e));
}

const roundCount = document.querySelector('.round-count');
const roundMessage = document.querySelector('.round-message');

function playRound(computer, human) {
    roundCount.textContent = (`Round: ${roundNumber++}`);
    RPSLogic(computer, human);
    // Game end check
    if (computerScore != 5 && humanScore != 5) {
        return
    } else {
        playerButtons.forEach((element) => element.removeEventListener('click', getHumanChoice));
        if (humanScore > computerScore) {
            roundMessage.textContent = 'You win!'
        } else {
            roundMessage.textContent = 'CPU wins!'
        }
        const resetButton = document.createElement('button');
        resetButton.addEventListener('click', () => window.location.reload());
        resetButton.textContent = 'Play Again?';

        rpsButtons.forEach((element) => element.removeEventListener('mouseenter', defaultHoverMessageBar));
        rpsButtons.forEach((element) => element.addEventListener('mouseleave', () => {
            messageBar.textContent = '';
            messageBar.appendChild(resetButton);
        }));
        messageBar.textContent = '';
        messageBar.appendChild(resetButton);
    }
}

const cpuScore = document.querySelector('.round-cpu-score');
const playerScore = document.querySelector('.round-player-score');
const gameHistory = document.querySelector('#history-log');

function RPSLogic(computer, human) {
    let winMessage;
    if (computer == human) {
        return RoundOutcome(0, 0);
    } else if (
        computer == 'rock' && human == 'scissors' ||
        computer == 'paper' && human == 'rock' ||
        computer == 'scissors' && human == 'paper'
    ) {
        return RoundOutcome(1, 0);
    } else {
        return RoundOutcome(0, 1);
    }
    function RoundOutcome(computerOutput, humanOutput) {
        if (computerOutput > humanOutput) {
            computerScore++
            cpuScore.textContent = (`CPU Score: ${computerScore}`)
            winMessage = 'CPU won!'
        } else if (computerOutput < humanOutput) {
            humanScore++
            playerScore.textContent = (`Score: ${humanScore}`)
            winMessage = 'You won!'
        } else {
            winMessage = 'It\'s a tie'
        }
        roundMessage.textContent = winMessage
        function gameLogList() {
            if (computerScore == 5){
                winMessage = 'CPU wins!';
            } else if (humanScore == 5) {
                winMessage = 'You win!';
            }
            const gameLogItem = document.createElement('li');
            gameLogItem.innerHTML = (`Round ${roundNumber - 1}: ${winMessage} <br> CPU: ${computer} | Player: ${human}`);
            gameHistory.prepend(gameLogItem);
        }
        gameLogList();
    }
}

// function messageBar()

// Click events:
// - If the player clicks one of the player buttons: 'You selected: {player RPS text} | CPU chose: ...'
// - When the player clicks after the initial selection: 'You selected: {player RPS text} | CPU chose: {CPU RPS text}'
// - If it's the final deciding round then display either:
//      - If the player wins: 'Congratulations, you won the game!' and then 'Play Again?' button after another click
//      - If the player loses: 'You can do better...' and then 'Try Again?' button after another click

// - If it's NOT the final deciding round: when player clicks again then reset make to 'Make a selection...'