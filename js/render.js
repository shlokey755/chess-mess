const Render = {
  draw() {
    this.drawBoard();
    this.drawUI();
    this.drawLog();
  },

  drawBoard() {
    const boardEl = document.getElementById('board');
    boardEl.innerHTML = '';
    boardEl.style.gridTemplateColumns = `repeat(${GameState.boardSize}, 1fr)`;

    for (let r = 0; r < GameState.boardSize; r++) {
      for (let c = 0; c < GameState.boardSize; c++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.dataset.pos = `${r},${c}`;

        const unitId = Object.keys(GameState.units).find(id => {
          const u = GameState.units[id];
          return u.pos[0] === r && u.pos[1] === c;
        });

        if (unitId) {
          const unit = GameState.units[unitId];
          tile.textContent = Units.getUnitIcon(unit.type);
          tile.classList.add(`unit-p${unit.player}`);
          tile.title = `${unitId} (HP: ${unit.hp})`;
        }

        if (GameState.selectedUnit && GameState.units[GameState.selectedUnit]?.pos[0] === r && GameState.units[GameState.selectedUnit]?.pos[1] === c) {
          tile.classList.add('selected');
        }

        if (GameState.validMoves.some(m => m[0] === r && m[1] === c)) {
          tile.classList.add('valid-move');
        }

        boardEl.appendChild(tile);
      }
    }
  },

  drawUI() {
    document.getElementById('turn-count').textContent = `Turn ${GameState.turn}`;
    document.getElementById('current-player').textContent = `Player ${GameState.currentPlayer}`;
  },

  drawLog() {
    const logEl = document.getElementById('log');
    logEl.innerHTML = GameState.log.map(msg => `<div class="log-entry">${msg}</div>`).join('');
  }
};
