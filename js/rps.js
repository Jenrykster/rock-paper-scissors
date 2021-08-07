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

const gameOverScreen = document.querySelector('#game-over');

const restartButton = document.querySelector('#restart-button');
function setEmoji(choice, target) { //Helper function to convert string to emoji
    switch (choice) {
        case 'rock':
            target.classList.add('choice-pop');
            target.textContent = '✊';
            break;
        case 'paper':
            target.classList.add('choice-pop');
            target.textContent = '🤚'
            break;
        case 'scissors':
            target.classList.add('choice-pop');
            target.textContent = '✌️'
            break;
        default:
            computerChoiceText.textContent = '...';
            playerChoiceText.textContent = '...';
            break
    }
    setTimeout(()=>{  //MAKE SURE ANIMATION RESETS
        computerChoiceText.classList.remove('choice-pop');
        playerChoiceText.classList.remove('choice-pop');
    }, 300)
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
function showGameOver(){
    let winner = playerScore > computerScore ? 'You win' : 'You lose';
    gameOverScreen.children.namedItem('winner').textContent = winner;
    gameOverScreen.children.namedItem('high-score').textContent = `Highscore: ${highScore}`;
    gameOverScreen.classList.remove('invisible'); 
}
function restart(){
    playerScore = 0;
    computerScore = 0;
    roundNumber = 0;
    changeScore(playerScore, computerScore)
    setEmoji();
    gameOverScreen.classList.add('invisible');
}
function playRound(uChoice, cChoice) {
    let winner;
    if (uChoice == null) { //If the function is called without arguments then askUser for input and generate computer choice
        uChoice = askPlayerChoice();
        cChoice = computerPlay();
    }
    if (roundNumber >= AMOUNT_OF_ROUNDS) {
        if(playerScore > highScore) highScore = playerScore;
        showGameOver();
        return;
    } else {
        if (uChoice === 'rock' && cChoice === 'scissors' || uChoice === 'scissors' && cChoice === 'paper' ||
            uChoice === 'paper' && cChoice === 'rock') {
            winner = "Player";
            playerScore++;
            roundNumber++;
        }
        else if (uChoice === cChoice) {
            changeScore('tie', 'tie');
            return 'tie';
        }
        else {
            winner = "Computer";
            computerScore++;
            roundNumber++;
        }

        changeScore(playerScore, computerScore);
        return winner;
    }

}

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        playerPlay(e)
    });
})

restartButton.addEventListener('click', restart);