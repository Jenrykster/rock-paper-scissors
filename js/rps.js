const CHOICES = ['rock', 'paper', 'scissors'];
const AMOUNT_OF_ROUNDS = 5;
let playerChoice;
let highScore = 0;
let roundNumber = 0;
let playerScore = 0;
let computerScore = 0;

const buttons = document.querySelectorAll('.button');

const computerChoiceText = document.querySelector('#computer-choice');
const playerChoiceText = document.querySelector('#player-choice');

const playerScoreText = document.querySelector('#score-player');
const computerScoreText = document.querySelector('#score-computer');

function setEmoji(choice, target) { //Helper function to convert string to emoji
    switch (choice) {
        case 'rock':
            target.textContent = '✊'
            break;
        case 'paper':
            target.textContent = '🤚'
            break;
        case 'scissors':
            target.textContent = '✌️'
            break;
        default:
            break;
    }
}

function askPlayerChoice() { //DEPRECATED || ONLY ON CONSOLE
    let userInput = '';
    while (!CHOICES.includes(userInput)) {
        console.log("Please choose between rock, paper or scissors.")
        userInput = prompt("Please choose", "Rock/Paper/Scissors").toLowerCase().trim();
    }
    return userInput;
}
function computerPlay() { //Generate computer choice
    let choice = CHOICES[parseInt(Math.random() * 3)]; //Chooses a random index between 0-2 
    setEmoji(choice, computerChoiceText);
    return choice;
}
function playerPlay(event) {
    let choice = event.target.id;
    setEmoji(choice, playerChoiceText)
    playRound(choice, computerPlay());
}
function changeScore(pScore, cScore){
    computerScoreText.textContent = cScore;
    playerScoreText.textContent = pScore;
}
function playRound(uChoice, cChoice) {
    let winner;
    if (uChoice == null) { //If the function is called without arguments then askUser for input and generate computer choice
        uChoice = askPlayerChoice();
        cChoice = computerPlay();
    }
    if (roundNumber >= AMOUNT_OF_ROUNDS) {
        console.log("Game ended");
        return;
    } else {
        if (uChoice === 'rock' && cChoice === 'scissors' || uChoice === 'scissors' && cChoice === 'paper' ||
            uChoice === 'paper' && cChoice === 'rock') {
            winner = "Player";
            playerScore++;
        }
        else if (uChoice === cChoice) {
            console.log(`You choose ${uChoice} and the computer choose ${cChoice}`);
            console.log("It's a tie");
            roundNumber--;
            return 'tie';
        }
        else {
            winner = "Computer";
            computerScore++;
        }

        changeScore(playerScore, computerScore);

        roundNumber++;
        return winner;
    }

}
function game(uChoice, cChoice, totalRounds) {
    for (let roundNumber = 1; roundNumber <= totalRounds; roundNumber++) {
        let winner = playRound(uChoice, cChoice);
        if (winner === 'tie') {
            roundNumber--;
        }
        if (winner === 'Player') {
            playerScore++;
        }
        else if (winner === 'Computer') {
            computerScore++;
        }
        else {
            continue;
        }

    }
    if (playerScore > highScore) {
        highScore = playerScore;
        console.log("You got a new highscore !");
    }
    console.log(`Results: \n Player - ${playerScore} \n Computer - ${computerScore}`)
    console.log(`Your highscore is: ${highScore}`);
}

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        playerPlay(e)
    });
})