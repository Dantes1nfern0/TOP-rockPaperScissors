
const oneSecond = 1000
let roundNumber = 1;
let playerScore = 0;
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

function rpsPlayerSelection(e) {
    const rpsArray = ['rock', 'paper', 'scissors'];
    for (i = 0; i < rpsArray.length; i++) {
        if (e.target.classList.contains(rpsArray[i]) == true) {
            return rpsArray[i];
        }
    }
}

const gameContainer = document.querySelector('.game-container')
const rpsButtons = document.querySelectorAll('.rps-button');
const messageBarDefault = document.querySelector('.message-bar-default');
rpsButtons.forEach((element) => element.addEventListener('mouseleave', defaultLeaveHoverMessageBar));
function defaultLeaveHoverMessageBar(e) {
    messageBarDefault.textContent = ('Make a selection...');
}
rpsButtons.forEach((element) => element.addEventListener('mouseenter', defaultHoverMessageBar));
function defaultHoverMessageBar(e) {
    if (e.target.classList.contains('cpu')) {
        messageBarDefault.textContent = ('No peeking!');
    } else if (e.target.classList.contains('player')) {
        messageBarDefault.textContent = (`Going with ${rpsPlayerSelection(e)}?`);
    }
}

const playerButtons = document.querySelectorAll('.player');
playerButtons.forEach((element) => element.addEventListener('click', getPlayerChoice));
function getPlayerChoice(e) {
    computerChoice = getComputerChoice();

    messageBarDefault.textContent = (`You chose: ${rpsPlayerSelection(e)} | CPU chose: `);
    const loadingSpan = document.createElement('span');
    loadingSpan.classList.add('load');
    loadingSpan.textContent = '.';
    messageBarDefault.appendChild(loadingSpan);
    setInterval(() => {
        if (loadingSpan.innerHTML.length > 2) {
            loadingSpan.innerHTML = '';
        } else {
            loadingSpan.innerHTML += '.';
        }
    }, 250);

    // Remove hover and click events during CPU Selection
    rpsButtons.forEach((element) => element.removeEventListener('mouseleave', defaultLeaveHoverMessageBar));
    rpsButtons.forEach((element) => element.removeEventListener('mouseenter', defaultHoverMessageBar));
    playerButtons.forEach((element) => element.removeEventListener('click', getPlayerChoice));
    gameContainer.style.cursor = 'progress';
    
    setTimeout(() => {
        playRound(computerChoice, rpsPlayerSelection(e));
        messageBarDefault.textContent = (`You chose: ${rpsPlayerSelection(e)} | CPU chose: ${computerChoice}`);
    }, oneSecond * 0.75);
}

const roundCount = document.querySelector('.round-count');
const roundMessage = document.querySelector('.round-message');
const messageBarList = document.querySelector('#message-bar-list');
function playRound(computer, player) {
    roundCount.textContent = (`Round: ${roundNumber++}`);
    RPSLogic(computer, player);
    // Game end check
    if (computerScore != 5 && playerScore != 5) {
        // Add hover and click events back to page after CPU Selection
        setTimeout(() => {
            playerButtons.forEach((element) => element.addEventListener('click', getPlayerChoice));
            rpsButtons.forEach((element) => element.addEventListener('mouseenter', defaultHoverMessageBar));
            rpsButtons.forEach((element) => element.addEventListener('mouseleave', defaultLeaveHoverMessageBar));
            gameContainer.style.cursor = 'default';
        }, oneSecond * 0.15);
        return
    } else {
        playerButtons.forEach((element) => element.removeEventListener('click', getPlayerChoice));
        
        const playerWinOrLoseMsg = document.createElement('li');
        const playerWinOrLoseMsgText = document.createTextNode('You win the game! Congratulations!');
        
        if (playerScore > computerScore) {
            roundMessage.textContent = 'You win!'
            playerWinOrLoseMsg.appendChild(playerWinOrLoseMsgText);
        } else {
            roundMessage.textContent = 'CPU wins!'
            const playerWinOrLoseMsgText = document.createTextNode('CPU wins the game. Better luck next time.');
            playerWinOrLoseMsg.appendChild(playerWinOrLoseMsgText);
        }
        messageBarList.appendChild(playerWinOrLoseMsg);
        gameContainer.style.cursor = 'default';

        setTimeout(() => {
        const resetButton = document.createElement('button');
        resetButton.textContent = 'Play Again?';
        resetButton.setAttribute('style' ,'background-color: #F3F3F3; box-shadow: 0px 5px 4px -1px #adaca8; border-radius: 5px; width: 180px; height: 45px; margin-top: 10px; font-weight: light; font-size: 22px; border: none;')
        resetButton.setAttribute('activate', ' box-shadow: inset 0 2px 3px #adaca8;')
        resetButton.addEventListener('click', () => window.location.reload());

        rpsButtons.forEach((element) => element.removeEventListener('mouseenter', defaultHoverMessageBar));
        rpsButtons.forEach((element) => element.addEventListener('mouseleave', () => {
            messageBarList.appendChild(resetButton);
        }));
        messageBarList.appendChild(resetButton);
        }, oneSecond * 1.5);
    }
}

const cpuScore = document.querySelector('.round-cpu-score');
const playerScoreBox = document.querySelector('.round-player-score');
const gameHistory = document.querySelector('#history-log');
function RPSLogic(computer, player) {
    let winMessage;
    if (computer == player) {
        return RoundOutcome(0, 0);
    } else if (
        computer == 'rock' && player == 'scissors' ||
        computer == 'paper' && player == 'rock' ||
        computer == 'scissors' && player == 'paper'
    ) {
        return RoundOutcome(1, 0);
    } else {
        return RoundOutcome(0, 1);
    }
    function RoundOutcome(computerOutput, playerOutput) {
        if (computerOutput > playerOutput) {
            computerScore++
            cpuScore.textContent = (`CPU Score: ${computerScore}`)
            winMessage = 'CPU won!'
        } else if (computerOutput < playerOutput) {
            playerScore++
            playerScoreBox.textContent = (`Score: ${playerScore}`)
            winMessage = 'You won!'
        } else {
            winMessage = 'It\'s a tie'
        }

        const logRoundHeader = document.querySelector('.history-header-round');
        const logCpuHeader = document.querySelector('.history-header-cpu');
        const logPlayerHeader = document.querySelector('.history-header-player');
        function gameLogListContent() {
            // round number
            const logRoundNode = document.createElement('li');
            const logRoundText = document.createTextNode(`${roundNumber - 1}`);
        
            logRoundNode.appendChild(logRoundText);
            logRoundHeader.after(logRoundNode);
            // cpu choice
            const logCpuNode = document.createElement('li');
            const logCpuText = document.createTextNode(`${computer}`);
            logCpuNode.appendChild(logCpuText);
            logCpuHeader.after(logCpuNode);
            // player choice
            const logPlayerNode = document.createElement('li');
            const logPlayerText = document.createTextNode(`${player}`);
            logPlayerNode.appendChild(logPlayerText);
            logPlayerHeader.after(logPlayerNode);
            roundMessage.textContent = (winMessage);
        }
        gameLogListContent();
    }
}


