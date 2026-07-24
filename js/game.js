const Game = {
  init() {
    GameState.reset();
    Input.init();
    Render.draw();
    this.setupScreenNavigation();
  },

  setupScreenNavigation() {
    document.getElementById('start-game').addEventListener('click', () => {
      this.startGame();
    });

    document.getElementById('back-to-rules').addEventListener('click', () => {
      this.backToRules();
    });

    document.getElementById('new-game').addEventListener('click', () => {
      this.backToRules();
    });
  },

  startGame() {
    document.getElementById('rules-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');
    GameState.reset();
    Input.init();
    Render.draw();
  },

  backToRules() {
    document.getElementById('game-screen').classList.remove('active');
    document.getElementById('rules-screen').classList.add('active');
  },

  checkWin() {
    const p1Units = Object.values(GameState.units).filter(u => u.player === 1);
    const p2Units = Object.values(GameState.units).filter(u => u.player === 2);

    if (p1Units.length === 0 && p2Units.length === 0) {
      GameState.addLog('Draw! Board vanished.');
      return;
    }

    if (p1Units.length === 0) {
      GameState.addLog('🎉 Player 2 wins!');
      setTimeout(() => alert('Player 2 Victory!'), 100);
      return;
    }

    if (p2Units.length === 0) {
      GameState.addLog('🎉 Player 1 wins!');
      setTimeout(() => alert('Player 1 Victory!'), 100);
      return;
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Game.init();
});
