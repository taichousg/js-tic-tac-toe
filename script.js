/*
You’re going to store the gameboard as an array inside of a Gameboard object, so start there!

Your players are also going to be stored in objects, and you’re probably going to want an object to control the flow of the game itself.

Your main goal here is to have as little global code as possible. Try tucking as much as you can inside factories.

In this project, think carefully about where each bit of logic should reside. Each little piece of functionality should be able to fit in
the game, player or gameboard objects. Take care to put them in “logical” places.

Focus on getting a working game in the console first. Make sure you include logic that checks for when the game is over!

You should be checking for all winning 3-in-a-rows and ties. Try to avoid thinking about the DOM and your HTML/CSS until your game is working.

Don’t worry about taking user input at this point either.

You can call your functions and pass arguments to them to play the game yourself and check if everything is working as intended.

Once you have a working console game, create an object that will handle the display/DOM logic.

Write a function that will render the contents of the gameboard array to the webpage (for now, you can always just fill the gameboard array
with "X"s and "O"s just to see what’s going on).

Write the functions that allow players to add marks to a specific spot on the board by interacting with the appropriate 
DOM elements (e.g. letting players click on a board square to place their marker). Don’t forget the logic that keeps players from playing 
in spots that are already taken!

Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that 
shows the results upon game end!
*/

// Gameboard object
function createGameboard() {
    let gameboardArray = ["", "", "", "", "", "", "", "", ""];
    const squareTotal = 3;
    const container = document.getElementById('container');
    if (container){
        // Create gameboard
        for (let i=0;i < squareTotal*squareTotal;i++){
            const square = document.createElement("div");
            square.className = "square";
            square.setAttribute('square-id', i);
            container.appendChild(square);
            square.addEventListener('mouseover',function(){square.style.backgroundColor = 'lightgrey';});
            square.addEventListener('mouseout',function(){square.style.backgroundColor = 'white';});
        }
        const squares = document.querySelectorAll('.square');
        squares.forEach(square=>{
            const size = `100px`;
            square.style.height = size;
            square.style.width = size;
            square.style.flexBasis = size;
            square.style.flexShrink = '0';
        })
    }
    else{
        console.error('Container element not found');
    }
    return gameboardArray;
}

// Player object
function createPlayer(name) {
    return name;
}

// Create game with default players
function createGame() {
    let playerArray = [];
    let optionArray = [];
    playerArray.push(createPlayer("Selma"));
    optionArray.push("X");
    playerArray.push(createPlayer("Andrea"));
    optionArray.push("O");
    let gameboardArray = createGameboard();
    let gameboardPosition;

    for (let i=0; i<9; i++) {
        gameboardPosition = getRandomInt();
        if (i==0) {
            gameboardArray[gameboardPosition] = "X";
            console.log("X in position " + JSON.stringify(gameboardPosition));
        } else {
            while(true){
                if (gameboardArray[gameboardPosition] == "" || gameboardArray[gameboardPosition] == ''){
                    if (isEven(i)){
                        gameboardArray[gameboardPosition] = optionArray[0];
                        console.log("X in position " + JSON.stringify(gameboardPosition));
                    } else {
                        gameboardArray[gameboardPosition] = optionArray[1];
                        console.log("O in position " + JSON.stringify(gameboardPosition));
                    }
                    break;
                } else {
                    gameboardPosition = getRandomInt();
                    continue;
                }
            }
        }
        let gameStatus = isGameOver(gameboardArray);
        if (gameStatus.gameOver == true){
            if(gameStatus.winingPlayer == "Tie"){
                console.log("It's a tie!")
                break;
            } else {
                console.log("Player " + JSON.stringify(gameStatus.winingPlayer) + " won!")
                break;
            }
        }
    }
}

// Get random position (0-8)
function getRandomInt(){
    return Math.floor(Math.random() * 9);
}

// Check if number is even or odd
function isEven(number){
    return number % 2 === 0;
}

// Check when the game is over
function isGameOver(gameboardArray){
    let winingPlayer;
    let gameOver = true;
    if ((gameboardArray[0]== "X" && gameboardArray[1]== "X" && gameboardArray[2]== "X")||
    (gameboardArray[3]== "X" && gameboardArray[4]== "X" && gameboardArray[5]== "X")||
    (gameboardArray[6]== "X" && gameboardArray[7]== "X" && gameboardArray[8]== "X")||
    (gameboardArray[0]== "X" && gameboardArray[3]== "X" && gameboardArray[6]== "X")||
    (gameboardArray[1]== "X" && gameboardArray[4]== "X" && gameboardArray[7]== "X")||
    (gameboardArray[2]== "X" && gameboardArray[5]== "X" && gameboardArray[8]== "X")||
    (gameboardArray[0]== "X" && gameboardArray[4]== "X" && gameboardArray[8]== "X")||
    (gameboardArray[2]== "X" && gameboardArray[4]== "X" && gameboardArray[6]== "X")){
        winingPlayer = "Selma";
    } 
    if ((gameboardArray[0]== "O" && gameboardArray[1]== "O" && gameboardArray[2]== "O")||
    (gameboardArray[3]== "O" && gameboardArray[4]== "O" && gameboardArray[5]== "O")||
    (gameboardArray[6]== "O" && gameboardArray[7]== "O" && gameboardArray[8]== "O")||
    (gameboardArray[0]== "O" && gameboardArray[3]== "O" && gameboardArray[6]== "O")||
    (gameboardArray[1]== "O" && gameboardArray[4]== "O" && gameboardArray[7]== "O")||
    (gameboardArray[2]== "O" && gameboardArray[5]== "O" && gameboardArray[8]== "O")||
    (gameboardArray[0]== "O" && gameboardArray[4]== "O" && gameboardArray[8]== "O")||
    (gameboardArray[2]== "O" && gameboardArray[4]== "O" && gameboardArray[6]== "O")){
        winingPlayer = "Andrea";
    }
    if (gameboardArray.includes("") || gameboardArray.includes('')){
        gameOver = false;
        winingPlayer = "None";
    } else {
        winingPlayer = "Tie";
    }
    console.log("Status: " + JSON.stringify(gameOver));
    return { gameOver, winingPlayer };
}

// Once you have a working console game, create an object that will handle the display/DOM logic
createGame();