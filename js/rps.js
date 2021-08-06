const CHOICES = ['rock','paper','scissors'];
let userChoice;
let highScore = 0;
let numberOfRounds = 5; 

const buttons = document.querySelectorAll('.button');
const computerChoiceText = document.querySelector('#computer-choice');
const playerChoiceText = document.querySelector('#player-choice');

function setEmoji(choice, target){ //Helper function to convert string to emoji
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

function askUserChoice(){ //DEPRECATED || ONLY ON CONSOLE
    let userInput = '';
    while(!CHOICES.includes(userInput)){
        console.log("Please choose between rock, paper or scissors.")
        userInput = prompt("Please choose", "Rock/Paper/Scissors").toLowerCase().trim();
    }
    return userInput;
}
function computerPlay(){
    let choice = CHOICES[parseInt(Math.random() * 3)]; //Chooses a random index between 0-2 
    setEmoji(choice, computerChoiceText);
    return choice;
}
function playerPlay(event){
    let choice = event.target.id;
    setEmoji(choice, playerChoiceText)
    playRound(choice, computerPlay());
}
function playRound(uChoice, cChoice){
    let winner;
    if(uChoice == null){ //If the function is called without arguments then askUser for input and generate computer choice
        uChoice = askUserChoice();
        cChoice = computerPlay();
    }
    if(uChoice === 'rock' && cChoice === 'scissors' || uChoice === 'rock' && cChoice === 'scissors' ||
        uChoice === 'paper' && cChoice === 'rock'){
        winner = "Player";
    } 
    else if(uChoice === cChoice){
       console.log(`You choose ${uChoice} and the computer choose ${cChoice}`);
       console.log("It's a tie");
       return 'tie';
    }
    else{
        winner = "Computer";
    }

    console.log(`You choose ${uChoice} and the computer choose ${cChoice}`);
    console.log(`The ${winner} wins this round !`);
    return winner;
}

function game(totalRounds){
    let userScore = 0;
    let computerScore = 0;
    for(let roundNumber = 1; roundNumber <= totalRounds; roundNumber++){
        let winner = playRound();
        if(winner === 'tie'){
            roundNumber--;
        }
        if(winner === 'Player'){
            userScore++;
        }
        else if(winner === 'Computer'){
            computerScore++;
        }
        else{
            continue;
        }
    }
    if(userScore > highScore){
        highScore = userScore;
        console.log("You got a new highscore !");
    }
    console.log(`Results: \n Player - ${userScore} \n Computer - ${computerScore}`)
    console.log(`Your highscore is: ${highScore}`);
}

function main(){
    game(numberOfRounds);
    let playAgain = prompt("Do you want to play again ?(Y/N)").toLowerCase().trim();
    if( playAgain === 'y'){
        game();
    }
}


buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        playerPlay(e)});
})