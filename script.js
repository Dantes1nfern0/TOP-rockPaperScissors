// keeping score
let humanScore = 0;
let computerScore = 0;
let roundNumber = 1;

// then computer input
function getComputerChoice() {
   let number = Math.floor(Math.random() * 100) + 1;
   return number;
}

//round consists of getting user input
function getHumanChoice() {
    let number = prompt('pick a number');
    return parseInt(number);
}

// then matching the two together
function determine(computer, human) {
    if (computer > human) {
        return (computerScore++, 'Computer: ' + computer + ' | Human: ' + human + ' Computer Wins');
    } else if (computer < human) {
        return (humanScore++, 'Computer: ' + computer + ' | Human: ' + human + ' Human Wins');
    } else {
        return;
    }
}

// outputting the result
function playRound(computer, human) {
    return( 
        console.log(('Round ' + roundNumber)),
        console.log(determine(computer, human)),
        roundNumber++
    )
}

function playFiveRounds() {
    console.log(playRound(getComputerChoice(), getHumanChoice()));
    console.log(playRound(getComputerChoice(), getHumanChoice()));
    console.log(playRound(getComputerChoice(), getHumanChoice()));
    console.log(playRound(getComputerChoice(), getHumanChoice()));
    console.log(playRound(getComputerChoice(), getHumanChoice()));
    let winMessage = (humanScore > computerScore) ? ('Human Wins!') : ('Computer Wins!');
    
    return (
        console.log('Final score: Human(' + humanScore + ') Computer(' + computerScore + ') ' + winMessage)
    )
}

playFiveRounds();



//play a round
// replaying each round 5 times