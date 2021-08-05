const CHOICES = ['rock','paper','scissors'];
let userChoice;
let highScore = 0;
let numberOfRounds = 5; 
function askUserChoice(){
    let userInput = '';
    while(!CHOICES.includes(userInput)){
        console.log("Please choose between rock, paper or scissors.")
        userInput = prompt("Please choose", "Rock/Paper/Scissors").toLowerCase().trim();
    }
    return userInput;
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

main();