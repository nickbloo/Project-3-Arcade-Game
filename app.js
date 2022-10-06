console.log("Test message");

const gameState = {
    marks: ["x", "o"],
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

function displayNameFunction() {
    gameState.playerName = nameInput.value; 

    displayName.textContent = `Your Name: ${gameState.playerName}`;

    nameInput.value = ""
}

submitButton.addEventListener("click", displayNameFunction);