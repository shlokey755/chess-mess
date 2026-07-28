const GameState = {
  board: [],
  turn: 0,
  currentPlayer: 1, // 1 = White, 2 = Black
  selectedPiece: null,
  validMoves: [],
  boardSize: 8,
  log: [],
  gameOver: false,
  moveCount: 0,

  reset() {
    this.board = this.initializeBoard();
    this.turn = 0;
    this.currentPlayer = 1;
    this.selectedPiece = null;
    this.validMoves = [];
    this.boardSize = 8;
    this.log = ['Game started! White (Player 1) moves first.'];
    this.gameOver = false;
    this.moveCount = 0;
  },

  initializeBoard() {
    const board = Array(8).fill(null).map(() => Array(8).fill(null));

    // White pieces (Player 1) - Bottom ranks
    board[7][0] = { type: 'R', player: 1 }; // a1
    board[7][1] = { type: 'N', player: 1 }; // b1
    board[7][2] = { type: 'B', player: 1 }; // c1
    board[7][3] = { type: 'Q', player: 1 }; // d1
    board[7][4] = { type: 'K', player: 1 }; // e1
    board[7][5] = { type: 'B', player: 1 }; // f1
    board[7][6] = { type: 'N', player: 1 }; // g1
    board[7][7] = { type: 'R', player: 1 }; // h1

    // White pawns
    for (let c = 0; c < 8; c++) {
      board[6][c] = { type: 'P', player: 1 };
    }

    // Black pieces (Player 2) - Top ranks
    board[0][0] = { type: 'R', player: 2 }; // a8
    board[0][1] = { type: 'N', player: 2 }; // b8
    board[0][2] = { type: 'B', player: 2 }; // c8
    board[0][3] = { type: 'Q', player: 2 }; // d8
    board[0][4] = { type: 'K', player: 2 }; // e8
    board[0][5] = { type: 'B', player: 2 }; // f8
    board[0][6] = { type: 'N', player: 2 }; // g8
    board[0][7] = { type: 'R', player: 2 }; // h8

    // Black pawns
    for (let c = 0; c < 8; c++) {
      board[1][c] = { type: 'P', player: 2 };
    }

    return board;
  },

  getPiece(r, c) {
    if (r < 0 || r >= this.boardSize || c < 0 || c >= this.boardSize) {
      return null;
    }
    return this.board[r][c];
  },

  setPiece(r, c, piece) {
    if (r >= 0 && r < this.boardSize && c >= 0 && c < this.boardSize) {
      this.board[r][c] = piece;
    }
  },

  movePiece(fromR, fromC, toR, toC) {
    const piece = this.getPiece(fromR, fromC);
    const captured = this.getPiece(toR, toC);

    this.setPiece(fromR, fromC, null);
    this.setPiece(toR, toC, piece);

    return captured;
  },

  addLog(msg) {
    this.log.push(msg);
    if (this.log.length > 8) this.log.shift();
  },

  nextTurn() {
    this.turn++;
    this.moveCount++;
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
  },

  getPlayerName(player) {
    return player === 1 ? 'White' : 'Black';
  }
};
