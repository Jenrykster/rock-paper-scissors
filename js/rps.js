const CHOICES = ['rock','paper','scissors'];
let usrChoice;

function askUserChoice(){
    let userInput = prompt("Please choose", "Rock/Paper/Scissors").toLowerCase().trim(); //Ask user's choice
    if(CHOICES.includes(userInput)){                                                     //then convert to lowercase
        console.log(`User selected ${userInput} !`);                                     //then remove whitespace
        return userInput;
    }
    else{
        askUserChoice(); //If input a value other than "ROCK/PAPER/SCISSORS" runs the function again
    }
}

function computerPlay(){
    return CHOICES[parseInt(Math.random() * 3)]; //Chooses a random index between 0-2 
}

