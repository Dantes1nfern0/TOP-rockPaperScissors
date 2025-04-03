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
const messageBarDefault = document.querySelector('.message-bar-default');

const rpsButtons = document.querySelectorAll('.rps-button');
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
    buttonSound()
    
    playerButtons.forEach((element) => element.removeEventListener('click', getPlayerChoice));

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
    
    setTimeout(() => {
        playRound(computerChoice, rpsPlayerSelection(e));
        messageBarDefault.textContent = (`You chose: ${rpsPlayerSelection(e)} | CPU chose: ${computerChoice}`);
    }, oneSecond * 0.75);
}

function buttonSound() {
    let audio = new Audio('bong_001.ogg');
    audio.play();
}

function gameEndDisplay() {
    const computerCircles = document.querySelectorAll('#cpu-score .circle');
    const computerRpsButtons = document.querySelectorAll('.cpu');
    const playerCircles = document.querySelectorAll('#player-score .circle');
    const playerRpsButtons = document.querySelectorAll('.player');
    if (computerScore == 5) {
        computerCircles.forEach((element) => element.classList.add('cpu-win-glow'));
        computerRpsButtons.forEach((element) => element.classList.add('cpu-win-glow', 'cpu-win-color'));
        playerRpsButtons.forEach((element) => element.classList.add('rps-lose'));
    } else if (playerScore == 5) {
        playerCircles.forEach((element) => element.classList.add('player-win-glow'));
        playerRpsButtons.forEach((element) => element.classList.add('player-win-glow', 'player-win-color'));
        computerRpsButtons.forEach((element) => element.classList.add('rps-lose'));
    }
}

const roundCount = document.querySelector('.round-count');
const roundMessage = document.querySelector('.round-message');
const messageBarList = document.querySelector('#message-bar-list');
function playRound(computer, player) {
    roundCount.textContent = (`Round: ${roundNumber++}`);
    RPSLogic(computer, player);
    // Game end check
    if (computerScore != 5 && playerScore != 5) {
        // Add hover, click events, and default rps button styling back to page after CPU Selection.
        setTimeout(() => {
            let defaultBoxShadow = '0px 5px 4px -1px #adaca8';
            let defaultRpsButtonBgColor = '#BFBFBF';
            playerButtons.forEach((element) => element.addEventListener('click', getPlayerChoice));
            rpsButtons.forEach((element) => element.addEventListener('mouseenter', defaultHoverMessageBar));
            rpsButtons.forEach((element) => element.addEventListener('mouseleave', defaultLeaveHoverMessageBar));
            gameContainer.style.cursor = 'default';

            const playerPick = document.querySelector(`#player-${player}`);
            playerPick.classList.remove('rps-lose', 'player-win-glow', 'player-win-color');
            playerButtons.forEach((element) => element.classList.add('hover'));

            const computerPick = document.querySelector(`#cpu-${computer}`);
            computerPick.classList.remove('rps-lose', 'cpu-win-glow', 'cpu-win-color');
        }, oneSecond * 0.9);
        return
    } else {
        gameEndDisplay();
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
            const resetButton = document.querySelector('.play-again-button');
            resetButton.addEventListener('click', () => window.location.reload());
            resetButton.style.display = 'block';
            rpsButtons.forEach((element) => element.removeEventListener('mouseenter', defaultHoverMessageBar));
            rpsButtons.forEach((element) => element.addEventListener('mouseleave', () => {
                resetButton.style.display = 'block';
            }));
            resetButton.style.display = 'block';
        }, oneSecond * 1.5);
    }
}

function gameRoundDisplay(computerChoice, playerChoice, roundWinMessage) {
    const playerPick = document.querySelector(`#player-${playerChoice}`);
    const computerPick = document.querySelector(`#cpu-${computerChoice}`);
    playerButtons.forEach((element) => element.classList.remove('hover'));
    if (roundWinMessage == 'You won!') {
        playerPick.classList.add('player-win-glow', 'player-win-color');
        computerPick.classList.add('rps-lose');
    }
    else if (roundWinMessage == 'CPU won!') {
        computerPick.classList.add('cpu-win-glow', 'cpu-win-color');    
        playerPick.classList.add('rps-lose');
    }
    else {
        playerPick.classList.add('rps-lose', 'player-win-glow');
        computerPick.classList.add('rps-lose', 'cpu-win-glow');
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
            const visualComputerScore = document.querySelector(`.cpu-score-${computerScore}`);
            visualComputerScore.style.backgroundColor = '#FF7575'
            cpuScore.textContent = (`CPU Score: ${computerScore}`)

            winMessage = 'CPU won!'
            gameRoundDisplay(computer, player, winMessage);
        } else if (computerOutput < playerOutput) {
            playerScore++
            const visualPlayerScore = document.querySelector(`.player-score-${playerScore}`);
            visualPlayerScore.style.backgroundColor = '#8181FF'
            playerScoreBox.textContent = (`Score: ${playerScore}`)

            winMessage = 'You won!'
            gameRoundDisplay(computer, player, winMessage);
        } else {
            winMessage = 'It\'s a tie'
            gameRoundDisplay(computer, player, winMessage);
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