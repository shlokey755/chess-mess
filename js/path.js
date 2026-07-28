const PathValidator = {
  // Check if path from (r1,c1) to (r2,c2) is clear (no blocking pieces)
  isPathClear(r1, c1, r2, c2, piece) {
    // Knights can jump, so no path validation needed
    if (piece.type === 'N') {
      return true;
    }

    const dr = r2 === r1 ? 0 : (r2 > r1 ? 1 : -1);
    const dc = c2 === c1 ? 0 : (c2 > c1 ? 1 : -1);

    let r = r1 + dr;
    let c = c1 + dc;

    // Walk the path until we reach destination or hit something
    while (r !== r2 || c !== c2) {
      if (GameState.getPiece(r, c) !== null) {
        return false; // Path blocked
      }
      r += dr;
      c += dc;
    }

    return true;
  },

  // Get valid moves for a piece (accounting for path blocking and friendly fire)
  getValidMoves(r, c, piece) {
    if (!piece) return [];

    const potentialMoves = ChessRules.getPotentialMoves(r, c, piece);
    const validMoves = [];

    for (const move of potentialMoves) {
      const [toR, toC, moveType] = move;

      // Check if destination is within board
      if (toR < 0 || toR >= GameState.boardSize || toC < 0 || toC >= GameState.boardSize) {
        continue;
      }

      const targetPiece = GameState.getPiece(toR, toC);

      // Can't move to own piece
      if (ChessRules.isOwnPiece(toR, toC, piece.player)) {
        continue;
      }

      // Check if path is clear (except for the destination)
      if (!this.isPathClear(r, c, toR, toC, piece)) {
        continue;
      }

      // Pawn-specific rules
      if (piece.type === 'P') {
        if (moveType === 'capture') {
          // Can only capture on diagonal if there's an enemy
          if (!ChessRules.isEnemyPiece(toR, toC, piece.player)) {
            continue;
          }
        } else {
          // Forward and double moves can only go to empty squares
          if (targetPiece !== null) {
            continue;
          }
        }
      } else {
        // Non-pawns can move to empty or capture enemy
        // (already filtered out own pieces above)
      }

      validMoves.push([toR, toC]);
    }

    return validMoves;
  }
};
