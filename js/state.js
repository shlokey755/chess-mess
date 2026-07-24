const GameState = {
  board: [],
  units: {},
  turn: 0,
  currentPlayer: 1,
  selectedUnit: null,
  validMoves: [],
  boardSize: 6,
  log: [],
  gameOver: false,

  reset() {
    this.board = Array(6).fill(null).map(() => Array(6).fill('grass'));
    this.units = {
      'p1-knight': { type: 'knight', player: 1, pos: [0, 2], hp: 3 },
      'p1-mage': { type: 'mage', player: 1, pos: [0, 3], hp: 2 },
      'p1-brawler': { type: 'brawler', player: 1, pos: [0, 4], hp: 4 },
      'p2-knight': { type: 'knight', player: 2, pos: [5, 2], hp: 3 },
      'p2-mage': { type: 'mage', player: 2, pos: [5, 3], hp: 2 },
      'p2-brawler': { type: 'brawler', player: 2, pos: [5, 4], hp: 4 }
    };
    this.turn = 0;
    this.currentPlayer = 1;
    this.selectedUnit = null;
    this.validMoves = [];
    this.boardSize = 6;
    this.log = ['Game started! Player 1 goes first.'];
    this.gameOver = false;
  },

  addLog(msg) {
    this.log.push(msg);
    if (this.log.length > 6) this.log.shift();
  }
};
