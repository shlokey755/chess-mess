const ChessRules = {
  pieceNames: {
    'P': 'Pawn',
    'R': 'Rook',
    'N': 'Knight',
    'B': 'Bishop',
    'Q': 'Queen',
    'K': 'King'
  },

  // Get all possible moves for a piece (doesn't check if path is clear)
  getPotentialMoves(r, c, piece) {
    if (!piece) return [];

    const moves = [];

    if (piece.type === 'P') {
      moves.push(...this.getPawnMoves(r, c, piece));
    } else if (piece.type === 'R') {
      moves.push(...this.getRookMoves(r, c));
    } else if (piece.type === 'N') {
      moves.push(...this.getKnightMoves(r, c));
    } else if (piece.type === 'B') {
      moves.push(...this.getBishopMoves(r, c));
    } else if (piece.type === 'Q') {
      moves.push(...this.getQueenMoves(r, c));
    } else if (piece.type === 'K') {
      moves.push(...this.getKingMoves(r, c));
    }

    return moves;
  },

  getPawnMoves(r, c, piece) {
    const moves = [];
    const direction = piece.player === 1 ? -1 : 1; // White moves up (decrease row), Black moves down
    const startRow = piece.player === 1 ? 6 : 1;

    // Forward move
    const forwardR = r + direction;
    if (forwardR >= 0 && forwardR < GameState.boardSize) {
      moves.push([forwardR, c, 'move']);
    }

    // Double move from start
    if (r === startRow) {
      const doubleR = r + 2 * direction;
      if (doubleR >= 0 && doubleR < GameState.boardSize) {
        moves.push([doubleR, c, 'double-move']);
      }
    }

    // Capture diagonally
    [c - 1, c + 1].forEach(newC => {
      const captureR = r + direction;
      if (captureR >= 0 && captureR < GameState.boardSize && newC >= 0 && newC < GameState.boardSize) {
        moves.push([captureR, newC, 'capture']);
      }
    });

    return moves;
  },

  getRookMoves(r, c) {
    const moves = [];
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    directions.forEach(([dr, dc]) => {
      for (let i = 1; i < GameState.boardSize; i++) {
        const nr = r + dr * i;
        const nc = c + dc * i;
        if (nr < 0 || nr >= GameState.boardSize || nc < 0 || nc >= GameState.boardSize) break;
        moves.push([nr, nc]);
      }
    });

    return moves;
  },

  getKnightMoves(r, c) {
    const moves = [];
    const jumps = [
      [-2, -1], [-2, 1], [-1, -2], [-1, 2],
      [1, -2], [1, 2], [2, -1], [2, 1]
    ];

    jumps.forEach(([dr, dc]) => {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < GameState.boardSize && nc >= 0 && nc < GameState.boardSize) {
        moves.push([nr, nc]);
      }
    });

    return moves;
  },

  getBishopMoves(r, c) {
    const moves = [];
    const directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];

    directions.forEach(([dr, dc]) => {
      for (let i = 1; i < GameState.boardSize; i++) {
        const nr = r + dr * i;
        const nc = c + dc * i;
        if (nr < 0 || nr >= GameState.boardSize || nc < 0 || nc >= GameState.boardSize) break;
        moves.push([nr, nc]);
      }
    });

    return moves;
  },

  getQueenMoves(r, c) {
    const moves = [];
    const directions = [
      [-1, 0], [1, 0], [0, -1], [0, 1], // Rook moves
      [-1, -1], [-1, 1], [1, -1], [1, 1] // Bishop moves
    ];

    directions.forEach(([dr, dc]) => {
      for (let i = 1; i < GameState.boardSize; i++) {
        const nr = r + dr * i;
        const nc = c + dc * i;
        if (nr < 0 || nr >= GameState.boardSize || nc < 0 || nc >= GameState.boardSize) break;
        moves.push([nr, nc]);
      }
    });

    return moves;
  },

  getKingMoves(r, c) {
    const moves = [];
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < GameState.boardSize && nc >= 0 && nc < GameState.boardSize) {
          moves.push([nr, nc]);
        }
      }
    }
    return moves;
  },

  // Check if a square is occupied by own piece
  isOwnPiece(r, c, player) {
    const piece = GameState.getPiece(r, c);
    return piece && piece.player === player;
  },

  // Check if a square is occupied by enemy piece
  isEnemyPiece(r, c, player) {
    const piece = GameState.getPiece(r, c);
    return piece && piece.player !== player;
  }
};
