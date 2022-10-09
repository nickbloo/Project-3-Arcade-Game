// Creates object called gameState with starting data about game to be accessed later
const gameState = {
    activePlayer: Math.round(Math.random()),
    computerPlayer: "",
    players: ["x", "o"],
    gameBoard: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ],
    playerScores: [0, 0],
    playerName: "",
    availableSpaces: 9
};

// Creates variables for various html elements 
let gameBoardElement = document.getElementById("game-board");
let displayName = document.getElementById("display-name");
let nameInput = document.getElementById("name-input");
let submitButton = document.getElementById("submit-button");
let gameSquare = document.getElementsByClassName("column");
let finalMessage = document.getElementById("game-end-message");
let resetButton = document.getElementById("reset-button");

// Function which loops through gameState.gameBoard
function renderGameBoard() {
    for (i = 0; i < gameState.gameBoard.length; i++) {
        let newRowElement = document.createElement("div");
        newRowElement.classList.add("row");
        let currentRowNum = gameState.gameBoard[i];

        for (j = 0; j < currentRowNum.length; j++) {
            // Creates a new html element on every iteration of the loop
            let newBoardSquare = document.createElement("div");
            // Adds attributes to the html elements, equivalent to their index location in gameState.gameBoard
            // Then adds class list to all th elements
            newBoardSquare.setAttribute("row", i);
            newBoardSquare.setAttribute("col", j);
            newBoardSquare.classList.add("column");

            // Adds these html elements to a parent element: newRowElement
            newRowElement.appendChild(newBoardSquare)

            // The current index location is equal to the current html element
            gameState.gameBoard[i][j] = newBoardSquare;
            console.log(gameState.gameBoard);

            // Adds a click event listener with a function that invokes the addGameMove function with newBoardSquare as a parameter
            newBoardSquare.addEventListener("click",
                () => addGameMove(newBoardSquare));

        }

        gameBoardElement.appendChild(newRowElement);
    }
};

// Function that changes the object to the input of the name input
// Then clears the name input html element when invoked
function displayNameFunction() {
    gameState.playerName = nameInput.value;

    displayName.textContent = `Your Name: ${gameState.playerName}`;

    nameInput.value = ""
};

// Invokes the displayNameFunction when the submit button is clicked
submitButton.addEventListener("click", displayNameFunction);

// Generates a random number, either 0, 1 or 2
function randomNum() {
    return Math.floor(Math.random() * 3)
};

// Sets a computer move
function computerMove() {

    // Checks how many available moves there are before running
    // If there's only 1 move left the computer will not make a move
    if (gameState.availableSpaces <= 1) {
        return
    };

    let rowNum = randomNum()
    let colNum = randomNum()

    // Runs a loop that checks for spaces not yet filled in and returns a space that is blank
    while (gameState.gameBoard[rowNum][colNum].textContent !== "") {
        rowNum = randomNum();
        colNum = randomNum();
    }

    // Fills in the blank space with the computers mark
    gameState.gameBoard[rowNum][colNum].textContent = `${gameState.computerPlayer}`;
    // Logs that a move occured in availableSpaces
    gameState.availableSpaces -= 1

    // If the computer has won, a losing message comes up for the player vice versa 
    if (checkWin() === "Win") {
        finalMessage.innerHTML += `${gameState.playerName} won!`
    } else if (checkWin() === "Lose") {
        finalMessage.innerHTML += `${gameState.playerName} lost!`
    }

};

// Function to check the game for winning combinations
function checkWin() {

    let winner = ""

    // Loops that check to see if the cells are empty or not,
    // then compare the winning game combinations for rows, columns and then hard coded ones for diagonals
    // Returns a string: either win, lose or draw
    for (let i = 0; i < 3; i++) {
        if (gameState.gameBoard[i][0].textContent != "") {
            if (gameState.gameBoard[i][0].textContent === gameState.gameBoard[i][1].textContent
                && gameState.gameBoard[i][1].textContent === gameState.gameBoard[i][2].textContent) {
                winner = gameState.gameBoard[i][0].textContent
                if (winner == gameState.computerPlayer) {
                    return "Lose"
                } else {
                    return "Win"
                }
            }
        }
    };

    for (let i = 0; i < 3; i++) {
        if (gameState.gameBoard[0][i].textContent != "") {
            if (gameState.gameBoard[0][i].textContent === gameState.gameBoard[1][i].textContent
                && gameState.gameBoard[1][i].textContent === gameState.gameBoard[2][i].textContent) {
                winner = gameState.gameBoard[0][i].textContent
                if (winner == gameState.computerPlayer) {
                    return "Lose"
                } else {
                    return "Win"
                }
            }
        }
    };

    if (gameState.gameBoard[0][0].textContent != "") {
        if (gameState.gameBoard[0][0].textContent === gameState.gameBoard[1][1].textContent
            && gameState.gameBoard[1][1].textContent === gameState.gameBoard[2][2].textContent) {
            winner = gameState.gameBoard[0][0].textContent
            if (winner == gameState.computerPlayer) {
                return "Lose"
            } else {
                return "Win"
            }
        }
    };

    if (gameState.gameBoard[0][2].textContent != "") {
        if (gameState.gameBoard[0][2].textContent === gameState.gameBoard[1][1].textContent
            && gameState.gameBoard[1][1].textContent === gameState.gameBoard[2][0].textContent) {
            winner = gameState.gameBoard[0][2].textContent
            if (winner == gameState.computerPlayer) {
                return "Lose"
            } else {
                return "Win"
            }
        }
    };
};

// Function that adds a game move to the board
function addGameMove(selectedBoardSquare) {

    // If you have won, lost or had a draw the game is over and no moves can be made
    if (finalMessage.textContent !== "") {
        return
    }

    // If the clicked space is already filled in, the function ends and no action is taken
    if (selectedBoardSquare.textContent !== "") {
        return
    };

    // Assigns you an X or and O randomly and gives the computer player the opposite of yours
    if (gameState.activePlayer == 0) {
        selectedBoardSquare.textContent = "X"
        gameState.computerPlayer = "O";
    } else {
        selectedBoardSquare.textContent = "O"
        gameState.computerPlayer = "X";
    }
    gameState.availableSpaces -= 1


    // If the player has won, a winning message comes up vice versa for a loss
    // The code is stopped, preventing further moves from the computer
    if (checkWin() === "Win") {
        finalMessage.innerHTML += `${gameState.playerName} won!`
        return
    } else if (checkWin() === "Lose") {
        finalMessage.innerHTML += `${gameState.playerName} lost!`
        return
    }

    // If all spaces are filled without a winner, a draw message comes up
    if (gameState.availableSpaces == 0) {
        finalMessage.innerHTML += "It's a draw!"
        return
    };

    // Performs an opponent computer move after a certain amount of time has elapsed
     setTimeout(function () {
        computerMove()
    }, 777);
};

// Loads the render game board when the dom loads
document.addEventListener("DOMContentLoaded", renderGameBoard);

// Function to reset the game
function resetGame() {

    // Loops through the gameBoard array and sets the content to an empty string
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            gameState.gameBoard[i][j].textContent = ""
        }
    };

    // Removes any winning, losing or draw messages
    finalMessage.innerHTML = "";

    // Sets the availableSpaces value back to 9
    gameState.availableSpaces = 9;

};

resetButton.addEventListener("click", resetGame);