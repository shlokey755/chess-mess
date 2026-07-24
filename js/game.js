const Game = {
  init() {
    GameState.reset();
    Input.init();
    Render.draw();
  },

  checkWin() {
    const p1 = Object.values(GameState.units).filter(u => u.player === 1).length;
    const p2 = Object.values(GameState.units).filter(u => u.player === 2).length;

    if (p1 === 0) {
      GameState.addLog('🎉 Player 2 wins!');
    } else if (p2 === 0) {
      GameState.addLog('🎉 Player 1 wins!');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Game.init();
});
