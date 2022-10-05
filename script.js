const gameBoard = (function() {
    // 0 | 1 | 2
    // ---------
    // 3 | 4 | 5
    // ---------
    // 6 | 7 | 8
    let gameBoard = [];
    // let gameBoard = ["X", "O", "X", "X", "O", "O", "X", "X", "O"];

    function setBoardSpot(spot, letter) {
        if (spot < 0 || spot > 8) {
            console.error("setBoardSpot: Spot must be a number between 0-8 inclusive");
        }

        if (letter !== "X" && letter !== "O" && letter !== "_") {
            console.error("setBoardSpot: Letter must be X or O or _ for a blank space");
        }

        gameBoard[spot] = letter;
    }

    function getBoardSpot(spot) {
        if (spot < 0 || spot > 8) {
            console.error("getBoardSpot: Spot must be a number between 0-8 inclusive");
        }

        return gameBoard[spot];
    }

    return {
        setBoardSpot: setBoardSpot,
        getBoardSpot: getBoardSpot
    };
})();

const displayController = (function() {
    const gameBoardDOM = document.getElementById("gameBoard");
    let spots = gameBoardDOM.children;

    function setDOMSpot(spot, letter) {
        if (spot > 8) {
            console.error("setDOMSpot: Spot must be a number between 0-8 inclusive. Spot is " + spot);
            return;
        }

        if (letter !== "X" && letter !== "O" && letter !== "_") {
            console.error("setDOMSpot: Letter must be X or O. Letter is " + letter);
            return;
        }

        for (let i = 0; i <= 8; i++) {
            if (i === spot) {
                spots[i].textContent = letter; 
            }
        }
    }

    // Adds event listeners to each cell
    function addEventListeners() {
        for (let i = 0; i <= 8; i++) {
            spots[i].addEventListener("click", function() {
                gameController.setSpot(i, currentPlayer.letter);
                spots[i].textContent = gameBoard.getBoardSpot(i);
                gameController.switchPlayers();
            });
        }
    }

    return {
        setDOMSpot: setDOMSpot,
        addEventListeners: addEventListeners
    };
})();

const gameController = (function() {

    function setSpot(spot, letter) {
        gameBoard.setBoardSpot(spot, letter);
        displayController.setDOMSpot(spot, letter);
    }

    function switchPlayers() {
        if (currentPlayer === playerX) {
            currentPlayer = playerO;
        } else {
            currentPlayer = playerX;
        }
    }

    // Resets the board
    function newGame() {
        for (let i = 0; i <= 8; i++) {
            gameBoard.setBoardSpot(i, "_");
            displayController.setDOMSpot(i, "_");
        }
    }

    // Returns true if spot is filled
    function spotIsFilled(spot) {
        const letter = gameBoard.getBoardSpot(spot);
        if (letter !== "_") {
            return true;
        } else {
            return false;
        }
    }

    return {
        setSpot: setSpot,
        switchPlayers: switchPlayers,
        newGame: newGame,
        spotIsFilled: spotIsFilled
    }
})();

displayController.addEventListeners();

const playerFactory = (letter) => {
    return {
        letter
    };
};

// Create players
const playerX = playerFactory("X");
const playerO = playerFactory("O");
let currentPlayer = playerX;

// New Game button
const newGameButton = document.getElementById("newGame");
newGameButton.addEventListener("click", function() {
    gameController.newGame();
});