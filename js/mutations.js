const Mutations = {
  checkShrink() {
    const mutations = Math.floor(GameState.turn / 3);
    const newSize = Math.max(3, 6 - mutations);

    if (newSize !== GameState.boardSize) {
      GameState.boardSize = newSize;
      
      Object.keys(GameState.units).forEach(id => {
        const [r, c] = GameState.units[id].pos;
        if (r >= newSize || c >= newSize) {
          delete GameState.units[id];
          GameState.addLog(`${id} fell off the edge!`);
        }
      });

      GameState.addLog(`🌋 Board shrinking to ${newSize}x${newSize}!`);
    }
  }
};
