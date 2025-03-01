// keeping score
let roundNumber = 1;
let computerChoice = '';
let humanChoice = '';
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
function getHumanChoice() {
    let string = prompt('pick either Rock, Paper, or Scissors');
    if (string.toLowerCase() == 'rock' ||
    string.toLowerCase() == 'paper' ||
    string.toLowerCase() == 'scissors') {
        return string.toLowerCase();
    } else {
        return (0);
    }

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


// outputting the result
function playRound(computer, human) {
    if (
    human != 'rock' &&
    human != 'paper' &&
    human != 'scissors'
    ) {
        return ('Invalid syntax');
    } else {
        return( 
            console.log(('Round ' + roundNumber)),
            console.log(logicRockPaperScissors(computer, human)),
            roundNumber++
        )
    }
}

function playGame() {
    console.log(playRound(getComputerChoice(), getHumanChoice()));
    console.log(playRound(getComputerChoice(), getHumanChoice()));
    console.log(playRound(getComputerChoice(), getHumanChoice()));
    console.log(playRound(getComputerChoice(), getHumanChoice()));
    console.log(playRound(getComputerChoice(), getHumanChoice()));
    let winMessage = (humanScore > computerScore) ? ('Human Wins!') : 
    (humanScore < computerScore) ? ('Computer Wins!') :
    ('It\'s a tie!');
    return (
        console.log('Final score: Human(' + humanScore + ') Computer(' + computerScore + ') ' + winMessage)
    )
}

playGame();



//play a round
// replaying each round 5 times