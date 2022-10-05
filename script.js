const gameBoard = (function() {
    // 0 | 1 | 2
    // ---------
    // 3 | 4 | 5
    // ---------
    // 6 | 7 | 8
    // let gameBoard = [];
    let gameBoard = ["X", "O", "X", "X", "O", "O", "X", "X", "O"];

    function setBoardSpot(spot, letter) {
        if (spot < 0 || spot > 8) {
            console.error("setBoardSpot: Spot must be a number between 0-8 inclusive");
        }

        if (letter !== "X" && letter !== "O") {
            console.error("setBoardSpot: Letter must be X or O");
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

        if (letter !== "X" && letter !== "O") {
            console.error("setDOMSpot: Letter must be X or O. Letter is " + letter);
            return;
        }

        for (let i = 0; i <= 8; i++) {
            if (i === spot) {
                spots[i].textContent = letter; 
            }
        }
    }

    function addEventListeners() {
        for (let i = 0; i <= 8; i++) {
            spots[i].addEventListener("click", function() {
                gameController.setSpot(i, currentPlayer.letter);
                spots[i].textContent = gameBoard.getBoardSpot(i);
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

    return {
        setSpot: setSpot
    }
})();

displayController.setDOMSpot(1, "X");
displayController.setDOMSpot(8, "O");
displayController.addEventListeners();

gameController.setSpot(4, "O");

const playerFactory = (letter) => {
    return {
        letter
    };
};

const playerX = playerFactory("X");
const playerO = playerFactory("O");
let currentPlayer = playerX;