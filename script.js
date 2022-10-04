const gameBoard = (function() {
    // 0 | 1 | 2
    // ---------
    // 3 | 4 | 5
    // ---------
    // 6 | 7 | 8
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

    function setDOMSpot(spot, mark) {
        if (spot > 8) {
            console.error("setDOMSpot: Spot must be a number between 0-8 inclusive. Spot is " + spot);
            return;
        }

        if (mark !== "X" && mark !== "O") {
            console.error("setDOMSpot: Mark must be X or O. Mark is " + mark);
            return;
        }

        for (let i = 0; i <= 8; i++) {
            if (i === spot) {
                spots[i].textContent = mark; 
            }
        }
    }

    return {
        setDOMSpot: setDOMSpot
    };
})();

const gameController = (function() {

    return {

    }
})();

displayController.setDOMSpot(1, "X");
displayController.setDOMSpot(8, "O");