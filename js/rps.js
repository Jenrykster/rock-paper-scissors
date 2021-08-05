const CHOICES = ['rock','paper','scissors'];
let userChoice;
let highScore = 0;
let numberOfRounds = 5; 
function askUserChoice(){
    let userInput = prompt("Please choose", "Rock/Paper/Scissors").toLowerCase().trim(); //Ask user's choice
    if(CHOICES.includes(userInput)){                                                     //then convert to lowercase
        console.log(`User selected ${userInput} !`);                                     //then remove whitespace
        return userInput;
    }
    else{
        console.log("Please choose rock, paper or scissors.");
        askUserChoice(); //If input a value other than "ROCK/PAPER/SCISSORS" runs the function again
    }
}

function computerPlay(){
    return CHOICES[parseInt(Math.random() * 3)]; //Chooses a random index between 0-2 
}

function playRound(uChoice, cChoice){
    let winner;
    if(uChoice == null){ //If the function is called without arguments then askUser for input and generate computer choice
        uChoice = askUserChoice();
        cChoice = computerPlay();
    }
    if(uChoice === 'rock' && cChoice === 'paper' || uChoice === 'rock' && cChoice === 'scissors' ||
        uChoice === 'paper' && cChoice === 'rock'){
        winner = "Player";
    } 
    else{
        winner = "Computer";
    }
    console.log(`You choose ${uChoice} and the computer choose ${cChoice}`);
    console.log(`The ${winner} wins this round !`);
    return winner;
}

function mainGame(totalRounds){
    let userScore = 0;
    let computerScore = 0;
    for(let roundNumber = 1; roundNumber <= totalRounds; roundNumber++){
        let winner = playRound();
        winner === 'Player' ? userScore++ : computerScore++;
    }
    if(userScore > highScore){
        highScore = userScore;
        console.log("You got a new highscore !");
    }
    console.log(`Results: \n Player - ${userScore} \n Computer - ${computerScore}`)
    console.log(`Your highscore is: ${highScore}`);
}

mainGame(numberOfRounds);
