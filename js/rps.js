const CHOICES = ['rock','paper','scissors'];

function computerPlay(){
    return CHOICES[parseInt(Math.random() * 3)];
}

