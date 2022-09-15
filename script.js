const gameBoard = (function() {
    // 6 | 7 | 8
    // ---------
    // 3 | 4 | 5
    // ---------
    // 0 | 1 | 2
    let gameBoard = ["X", "O", "X", "X", "O", "O", "X", "X", "O"];

    function setBoardSpot(spot, letter) {
        if (spot < 0 || spot > 8) {
            console.error("setBoardSpot: Spot must be a number between 0-8 inclusive");
        }

        if (letter !== "X" || letter !== "O") {
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
    return {
        
    };
})();