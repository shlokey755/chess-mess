const Units = {
  getUnitIcon(type) {
    const icons = { knight: '♞', mage: '✦', brawler: '⚔' };
    return icons[type];
  },

  getMoveRange(unitId) {
    const unit = GameState.units[unitId];
    if (!unit) return [];

    const moves = [];
    const [r, c] = unit.pos;

    if (unit.type === 'knight') {
      const km = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
      km.forEach(([dr, dc]) => {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < GameState.boardSize && nc >= 0 && nc < GameState.boardSize) {
          moves.push([nr, nc]);
        }
      });
    } else if (unit.type === 'mage') {
      for (let i = 1; i <= 2; i++) {
        const dirs = [[r-i,c],[r+i,c],[r,c-i],[r,c+i]];
        dirs.forEach(([nr, nc]) => {
          if (nr >= 0 && nr < GameState.boardSize && nc >= 0 && nc < GameState.boardSize) {
            moves.push([nr, nc]);
          }
        });
      }
    } else if (unit.type === 'brawler') {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < GameState.boardSize && nc >= 0 && nc < GameState.boardSize) {
            moves.push([nr, nc]);
          }
        }
      }
    }

    return moves;
  },

  attack(attacker, defender) {
    const damage = attacker.type === 'brawler' ? 2 : 1;
    defender.hp -= damage;
    return defender.hp <= 0;
  }
};
