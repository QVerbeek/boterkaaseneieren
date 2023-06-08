// the main variabels and win posibiliies

const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

// Start the game
initializeGame();

//=> other way to expres functionx

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked)); //let you click on the cells
    restartBtn.addEventListener("click", restartGame);  //let you click on restart button and restart the game
    statusText.textContent = `${currentPlayer}'s turn`; //shows who turn it is
    running = true;
}

// lets you click on the cells

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] != "" || !running) { //if nothing is on cell it updates
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

// changes turns and can't dubble click on same spot

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

//? replacement of if else

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

// checks and shows who is the winner

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) { // if there is no win condition in the cells it goes on
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {        //order of the cell rows
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }
    //when someone wins or draw there comes a text under the game with draw or wins
    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if (!options.includes("")) {
        statusText.textContent = `Draw!`;
        running = false;
    }
    else {
        changePlayer();
    }
}

// restart the game

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}