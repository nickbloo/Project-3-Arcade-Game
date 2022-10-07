const gameState = {
    activePlayer: Math.round(Math.random()),
    computerPlayer: 0,
    players: ["x", "o"],
    gameBoard: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ],
    playerScores: [0, 0],
    playerName: ""
};

let gameBoardElement = document.getElementById("game-board");
let displayName = document.getElementById("display-name");
let nameInput = document.getElementById("name-input");
let submitButton = document.getElementById("submit-button");
let gameSquare = document.getElementsByClassName("column");

function renderGameBoard() {
    for (i = 0; i < gameState.gameBoard.length; i++) {
        let newRowElement = document.createElement("div");
        newRowElement.classList.add("row");
        let currentRowNum = gameState.gameBoard[i];

        for (j = 0; j < currentRowNum.length; j++) {
            let newGameCell = gameState.gameBoard[i][j];
            let newBoardSquare = document.createElement("div");
            newBoardSquare.setAttribute("row", i);
            newBoardSquare.setAttribute("col", j);
            newBoardSquare.classList.add("column");

            newRowElement.appendChild(newBoardSquare)

            gameState.gameBoard[i][j] = newBoardSquare;
            console.log(gameState.gameBoard);

            newBoardSquare.addEventListener("click", 
            () => addGameMove(newBoardSquare));

        } 

        gameBoardElement.appendChild(newRowElement);
    }
};

function displayNameFunction() {
    gameState.playerName = nameInput.value;

    displayName.textContent = `Your Name: ${gameState.playerName}`;

    nameInput.value = ""
};

submitButton.addEventListener("click", displayNameFunction);

function addGameMove(selectedBoardSquare) {
    let i = selectedBoardSquare.getAttribute("row")
    let j = selectedBoardSquare.getAttribute("col")

    if (gameState.activePlayer == 0) {
        selectedBoardSquare.textContent = "X"
        gameState.computerPlayer = 1;
        gameState.gameBoard[i][j] = "X"
    } else {
        selectedBoardSquare.textContent = "O"
        gameState.computerPlayer = 0;
        gameState.gameBoard[i][j] = "O"
    }

    // computerMove()
    // should be able to render "character" based on gameState
};

// function screenUpdater() {

//     //when gameboard is changed to update everything on the screen to what gameboard is currently at
// }

document.addEventListener("DOMContentLoaded", renderGameBoard);

function randomNum() {
    return Math.floor(Math.random() * 3)
};

function computerMove() {

    let rowNum = randomNum()
    let colNum = randomNum()

    while (gameState.gameBoard[rowNum][colNum] != null) {
        i = randomNum();
        j = randomNum();
    }
    
    gameState.gameBoard[rowNum][colNum] = "B";

    renderGameBoard()
};


                // change it's text content to x or o (make x=0 and o=1)
                    // only change one square

// Randomize on load who goes first and what you play as (Xs or Os)
// Have you filling in your square trigger the computer filling in another square
// Be blocked from filling in squares when it's not your turn 
// not be able to fill in squares already filled in
// alogorithm to determine who won or when it's a draw
// have some on screen event for a win/lose/draw
// game resets 15 seconds after a win or when reset button is pressed