const gameBoard = (function() {
    // 0 | 1 | 2
    // ---------
    // 3 | 4 | 5
    // ---------
    // 6 | 7 | 8
    let gameBoard = ["_", "_", "_", "_", "_", "_", "_", "_", "_"];
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
                if (!gameController.spotIsFilled(i)) {
                    gameController.setSpot(i, currentPlayer.letter);
                    spots[i].textContent = gameBoard.getBoardSpot(i);
                    gameController.switchPlayers();
                }
            });
        }
    }

    return {
        setDOMSpot: setDOMSpot,
        addEventListeners: addEventListeners
    };
})();

const gameController = (function() {
    let winner;

    function setSpot(spot, letter) {
        gameBoard.setBoardSpot(spot, letter);
        displayController.setDOMSpot(spot, letter);
        checkEndGame();
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

    // Checks for three in a row or for tie
    function checkEndGame() {
        const spot0 = gameBoard.getBoardSpot(0);
        const spot1 = gameBoard.getBoardSpot(1);
        const spot2 = gameBoard.getBoardSpot(2);
        const spot3 = gameBoard.getBoardSpot(3);
        const spot4 = gameBoard.getBoardSpot(4);
        const spot5 = gameBoard.getBoardSpot(5);
        const spot6 = gameBoard.getBoardSpot(6);
        const spot7 = gameBoard.getBoardSpot(7);
        const spot8 = gameBoard.getBoardSpot(8);

        // Top row
        if (spot0 === spot1 && spot1 === spot2 && spot2 === spot0 &&
            spot0 !== "_" && spot1 !== "_" && spot2 !== "_") {
            winner = spot0;
        }

        // Middle row
        if (spot3 === spot4 && spot4 === spot5 && spot5 === spot3 &&
            spot3 !== "_" && spot4 !== "_" && spot5 !== "_") {
            winner = spot3;
        }

        // Bottom row
        if (spot6 === spot7 && spot7 === spot8 && spot8 === spot6 &&
            spot6 !== "_" && spot7 !== "_" && spot8 !== "_") {
            winner = spot6;
        }

        // Left column
        if (spot0 === spot3 && spot3 === spot6 && spot6 === spot0 &&
            spot0 !== "_" && spot3 !== "_" && spot6 !== "_") {
            winner = spot0;
        }

        // Middle column
        if (spot1 === spot4 && spot4 === spot7 && spot7 === spot1 &&
            spot1 !== "_" && spot4 !== "_" && spot7 !== "_") {
            winner = spot1;
        }

        // Right column
        if (spot2 === spot5 && spot5 === spot8 && spot8 === spot2 &&
            spot2!== "_" && spot5 !== "_" && spot8 !== "_") {
            winner = spot2;
        }

        // Top left to bottom right diagonal
        if (spot0 === spot4 && spot4 === spot8 && spot8 === spot0 &&
            spot0 !== "_" && spot4 !== "_" && spot8 !== "_") {
            winner = spot0;
        }

        // Top right to bottom left diagonal
        if (spot2 === spot4 && spot4 === spot6 && spot6 === spot2 &&
            spot2 !== "_" && spot4 !== "_" && spot6 !== "_") {
            winner = spot2;
        }

        if (winner) {
            winnerText.innerHTML = "Winner is " + winner + "!";
        }
    }

    return {
        winner: winner,
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

// Winner text
const winnerText = document.getElementById("winner");