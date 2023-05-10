"use strict";
let activePlayer = "X";

// Function for placing an X or an O
function placeXOrO(squareNumber) {
  if (!selectedSquares.some((element) => element.includes(squareNumber))) {
    let select = document.getElementById(squareNumber);
    if (activePlayer === "X") {
      select.style.backgroundImage = "url('Ximg.png')";
    } else {
      select.style.backgroundImage = "url('Oimg.png')";
    }

    // SquaareNumber and activePlayer are concatenated together and addded to an array
    selectedSquares.push(squareNumber + activePlayer);

    // Function for checking win conditions
    checkWinConditions();

    //Changing the Active Player
    if (activePlayer === "X") {
      activePlayer = "O";
    } else {
      activePlayer = "X";
    }

    // Function that plays placement sound
    new Audio("media sound.mp3");
    if (activePlayer === "O") {
      disableClick();
      setTimeout(function () {
        computersTurn();
      }, 1000);
    }
    return true;
  }

  // This function results in a random square being selected
  function computersTurn() {
    let success = false;
    let pickASquare;

    while (!success) {
      pickASquare = String(Math.floor(Math.random() * 9));
      if (placeXOrO(pickASquare)) {
        placeXOrO(pickASquare);
        success = true;
      }
    }
  }
}

// This function parses the selectedSquares array to search for win conditions.
// drawline() function is called to draw a line if the condition is met

function checkWinConditions() {
  if (arrayIncludes("0x", "1x", "2x")) {
    drawWinLine(50, 100, 558, 100);
  } else if (arrayIncludes("3x", "4x", "5x")) {
    drawWinLine(50, 304, 558, 304);
  } else if (arrayIncludes("6x", "7x", "8x")) {
    drawWinLine(50, 508, 558, 508);
  } else if (arrayIncludes("0x", "3x", "6x")) {
    drawWinLine(100, 50, 100, 558);
  } else if (arrayIncludes("1x", "4x", "7x")) {
    drawWinLine(304, 50, 304, 558);
  } else if (arrayIncludes("2x", "5x", "8x")) {
    drawWinLine(508, 50, 508, 558);
  } else if (arrayIncludes("6x", "4x", "2x")) {
    drawWinLine(100, 508, 510, 90);
  } else if (arrayIncludes("0x", "4x", "8x")) {
    drawWinLine(100, 100, 520, 520);
  } else if (arrayIncludes("0O", "1O", "2O")) {
    drawWinLine(50, 100, 558, 100);
  } else if (arrayIncludes("3O", "4O", "5O")) {
    drawWinLine(50, 304, 558, 304);
  } else if (arrayIncludes("6O", "7O", "8O")) {
    drawWinLine(50, 508, 558, 508);
  } else if (arrayIncludes("0O", "3O", "6O")) {
    drawWinLine(100, 50, 100, 558);
  } else if (arrayIncludes("1O", "4O", "7O")) {
    drawWinLine(304, 50, 304, 558);
  } else if (arrayIncludes("2O", "5O", "8O")) {
    drawWinLine(508, 50, 508, 558);
  } else if (arrayIncludes("6O", "4O", "2O")) {
    drawWinLine(100, 508, 510, 90);
  } else if (arrayIncludes("0O", "4O", "8O")) {
    drawWinLine(100, 100, 520, 520);
  } else if (selectedSquares.length >= 9) {
    Audio("./media/tie.mp3");
    setTimeout(function () {
      resetGame();
    }, 500);
  }

  // Checks if an array includes 3 strings. Used for checking each win condition
  function arrayIncludes(squareA, squareB, squareC) {
    const a = selectedSquares.includes(squareA);
    const b = selectedSquares.includes(squareB);
    const c = selectedSquares.includes(squareC);
    if (a === true && b === true && c === true);
  }
}

// Makes the body element temporarily unclickable
function disableClick() {
  body.style.pointerEvents = "none";
  setTimeout(function () {
    body.style.pointerEvents = "auto";
  }, 1000);
}

// Takes a string parameter of the path set earlier
function audio(audioURL) {
  let audio = new Audio(audioURL);
  audio.play();

  // draw win line
  function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    const canvas = document.getElementById("win-lines");
    const c = canvas.getContext("2d");
    let x1 = coordX1,
      y1 = coordY1,
      x2 = coordX2,
      y2 = coordY2;
    (x = x1), (y = y1);

    // function that interacts with the canvas
    function animateLineDrawing() {
      const animationLoop = requestAnimationFrame(animateLineDrawing);
      c.clearRect(0, 0, 608, 608);
      c.beginPath();
      c.moveTo(x1, y1);
      c.lineTo(x, y);
      c.linewidth = 10;
      c.strokeStyle = "rgba(70,255,33, .8)";
      c.stroke();
      if (x1 <= x2 && y1 <= y2) {
        if (x < x2) {
          x += 10;
        }
        if (y < y2) {
          x += 10;
        }
        if (x >= x2 && y >= y2) {
          cancelAnimationFrame(animationLoop);
        }
      }
      if (x1 <= x2 && y1 >= y2) {
        if (x < x2) {
          x += 10;
        }
        if (y > y2) {
          y -= 10;
        }
        if (x >= x2 && y <= y2) {
          cancelAnimationFrame(animationLoop);
        }
      }
    }

    // Clears teh canvas
    function clear() {
      const animationLoop = requestAnimationFrame(clear);
      c.clearRect(0, 0, 608, 608);
      cancelAnimationFrame(animateLoop);
    }
    disableClick();
    audio("WINGAME.mp3");
    animateLineDrawing();
    setTimeout(function () {
      clear();
      resetGame();
    }, 1000);
  }
}

//This function resets the game in the event of a tie or a win
function resetGame() {
  for (let i = 0; i < 9; i++) {
    let square = document.getElementById(string(i));
    square.style.backgroundImage = "";
  }
  selectedSquares = [];
}
