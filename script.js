function getComputerChoice() {
   let number = Math.floor(Math.random() * 100) + 1;
   return number;
}
function getHumanChoice() {
    let number = prompt('pick a number');
    return parseInt(number);
}

function determine(a, b) {
    if (a > b) {
        return console.log(a + 'wins');
    } else if (a < b) {
        return console.log(b + 'wins');
    } else {
        return console.log('it\'s a tie');
    }
}
