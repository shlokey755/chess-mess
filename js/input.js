const Input = {
  init() {
    const board = document.getElementById('board');
    board.addEventListener('click', (e) => {
      const tile = e.target.closest('.tile');
      if (!tile) return;

      const [r, c] = tile.dataset.pos.split(',').map(Number);
      this.handleTileClick(r, c);
    });

    document.getElementById('new-game').addEventListener('click', () => {
      Game.init();
    });
  },

  handleTileClick(r, c) {
    const targetPos = [r, c];
    const unitId = Object.keys(GameState.units).find(id => {
      const u = GameState.units[id];
      return u.pos[0] === r && u.pos[1] === c;
    });

    if (GameState.validMoves.some(m => m[0] === r && m[1] === c)) {
      this.moveUnit(targetPos);
    } else if (unitId) {
      this.selectUnit(unitId);
    }
  },

  selectUnit(unitId) {
    const unit = GameState.units[unitId];
    if (unit.player !== GameState.currentPlayer) return;

    GameState.selectedUnit = unitId;
    GameState.validMoves = Units.getMoveRange(unitId);
    Render.draw();
  },

  moveUnit(targetPos) {
    if (!GameState.selectedUnit) return;

    const unit = GameState.units[GameState.selectedUnit];
    const [tr, tc] = targetPos;

    let targetUnitId = Object.keys(GameState.units).find(id => {
      const u = GameState.units[id];
      return u.pos[0] === tr && u.pos[1] === tc && u.player !== unit.player;
    });

    if (targetUnitId) {
      const targetUnit = GameState.units[targetUnitId];
      if (Units.attack(unit, targetUnit)) {
        delete GameState.units[targetUnitId];
        GameState.addLog(`${GameState.selectedUnit} defeated ${targetUnitId}!`);
      } else {
        GameState.addLog(`${GameState.selectedUnit} hit ${targetUnitId}!`);
      }
    } else {
      unit.pos = [...targetPos];
      GameState.addLog(`${GameState.selectedUnit} moved to [${tr}, ${tc}]`);
    }

    GameState.selectedUnit = null;
    GameState.validMoves = [];
    GameState.turn++;
    GameState.currentPlayer = GameState.currentPlayer === 1 ? 2 : 1;

    if (GameState.turn % 3 === 0 && GameState.turn > 0) {
      Mutations.checkShrink();
    }

    Game.checkWin();
    Render.draw();
  }
};
