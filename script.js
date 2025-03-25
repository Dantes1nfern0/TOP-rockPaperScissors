// keeping score
let roundNumber = 1;
let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
   let number = Math.floor(Math.random() * 100) + 1;
   function convertToRPS(number) {
       if (number <= 33) {
           return 'paper';
       } else if (number <= 66) {
           return 'rock';
       } else {
           return 'scissors';
       }
   } 
   return convertToRPS(number);
}

const playerButtons = document.querySelectorAll('.player');
playerButtons.forEach((element) => element.addEventListener('click', getHumanChoice));

function getHumanChoice(e) {
    rpsArray = ['rock', 'paper', 'scissors'];
    let humanChoice;
    for (i = 0; i < rpsArray.length; i++) {
        if (e.target.classList.contains(rpsArray[i]) == true) {
            humanChoice = rpsArray[i];
        }
    }
    playRound(getComputerChoice(), humanChoice);
}

function playRound(computer, human) {
    console.log(`Round: ${roundNumber++}`)
    console.log(logicRockPaperScissors(computer, human));

    // Game end check
    if (computerScore != 5 && humanScore != 5) {
        return
    } else {
        playerButtons.forEach((element) => element.removeEventListener('click', getHumanChoice));
        if (humanScore > computerScore) {
            console.log('human wins!')
        } else {
            console.log('computer wins!')
        }
    }
}

function logicRockPaperScissors(computer, human) {
    if (computer == human) {
        return determine(0, 0);
    } else if (
        computer == 'rock' && human == 'scissors' ||
        computer == 'paper' && human == 'rock' ||
        computer == 'scissors' && human == 'paper'
    ) {
        return determine(1, 0);
    } else {
        return determine(0, 1);
    }
    function determine(computerOutput, humanOutput) {
        let winMessage;
        if (computerOutput > humanOutput) {
            computerScore++
            winMessage = '-- Computer won --'
            console.log('computer score: ' + computerScore)
        } else if (computerOutput < humanOutput) {
            humanScore++
            winMessage = '-- Human won --'
            console.log('human score: ' + humanScore)
        } else {
            winMessage = '-- It\'s a tie --'
        }
        return(`Computer: ${computer} | Human: ${human} ${winMessage}`)
    }
}