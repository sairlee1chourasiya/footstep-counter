const board = document.getElementById("board");
const historyList = document.getElementById("move-history");
const game = new Chess();
let draggedPiece = null;
let sourceSquare = null;

function getSquareId(row, col) {
  return String.fromCharCode(97 + col) + (8 - row);
}

function getUnicode(piece) {
  const symbols = {
    p: "♟", r: "♜", n: "♞", b: "♝", q: "♛", k: "♚",
    P: "♙", R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔"
  };
  return symbols[piece.color === "w" ? piece.type.toUpperCase() : piece.type] || "";
}

function renderBoard() {
  board.innerHTML = "";
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.classList.add((row + col) % 2 === 0 ? "light" : "dark");
      const squareId = getSquareId(row, col);
      square.setAttribute("id", squareId);

      const piece = game.get(squareId);
      if (piece) {
        const pieceEl = document.createElement("span");
        pieceEl.textContent = getUnicode(piece);
        pieceEl.setAttribute("draggable", "true");
        pieceEl.classList.add("piece");
        square.appendChild(pieceEl);
      }

      board.appendChild(square);
    }
  }

  addDragListeners();
}

function addDragListeners() {
  document.querySelectorAll(".piece").forEach(piece => {
    piece.addEventListener("dragstart", e => {
      draggedPiece = e.target;
      sourceSquare = e.target.parentNode.id;
    });
  });

  document.querySelectorAll(".square").forEach(square => {
    square.addEventListener("dragover", e => e.preventDefault());

    square.addEventListener("drop", e => {
      const targetSquare = square.id;
      const move = game.move({ from: sourceSquare, to: targetSquare, promotion: "q" });

      if (move) {
        updateHistory(move.san);
        renderBoard();
      } else {
        alert("Illegal move!");
      }

      draggedPiece = null;
      sourceSquare = null;
    });
  });
}

function updateHistory(move) {
  const item = document.createElement("li");
  item.textContent = `${game.turn() === "w" ? "Black" : "White"}: ${move}`;
  historyList.appendChild(item);
}

renderBoard();