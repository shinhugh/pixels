/* Requires:
 * - api.js
 */

const game = {

  internal: {

    diagonalScaling: 0.707107,

    characterSpeedScaling: 0.005,

    processTickTime: 15,

    gameState: null,

    gameStateChangeHandlers: [ ],

    directionInput: null,

    gameStateProcessingInterval: null,

    lastGameStateProcessTime: null,

    invokeGameStateChangeHandlers: () => {
      for (const handler of game.internal.gameStateChangeHandlers) {
        handler();
      }
    },

    testForOverlap: (matterA, matterB) => {
      const matterAXLower = matterA.posX;
      const matterAXUpper = matterAXLower + matterA.width;
      const matterAYLower = matterA.posY;
      const matterAYUpper = matterAYLower + matterA.height;
      const matterBXLower = matterB.posX;
      const matterBXUpper = matterBXLower + matterB.width;
      const matterBYLower = matterB.posY;
      const matterBYUpper = matterBYLower + matterB.height;
      if ((matterAXLower >= matterBXLower && matterAXLower < matterBXUpper) || (matterAXUpper > matterBXLower && matterAXUpper <= matterBXUpper) || (matterAXLower <= matterBXLower && matterAXUpper >= matterBXUpper)) {
        return (matterAYLower >= matterBYLower && matterAYLower < matterBYUpper) || (matterAYUpper > matterBYLower && matterAYUpper <= matterBYUpper) || (matterAYLower <= matterBYLower && matterAYUpper >= matterBYUpper);
      }
      return false;
    },

    process: () => {
      if (game.internal.gameState == null) {
        return;
      }
      const clientCharacter = game.internal.gameState.characters[game.internal.gameState.clientPlayerId];
      const spaceWidth = game.internal.gameState.space.width;
      const spaceHeight = game.internal.gameState.space.height;
      const obstacles = game.internal.gameState.obstacles;
      const currentTime = Date.now();
      const duration = currentTime - game.internal.lastGameStateProcessTime;
      let distance = clientCharacter.movementSpeed * duration * game.internal.characterSpeedScaling;
      let proposedClientCharacterPosX = clientCharacter.posX;
      let proposedClientCharacterPosY = clientCharacter.posY;
      switch (game.internal.directionInput) {
        case 'up':
          proposedClientCharacterPosY -= distance;
          break;
        case 'up_right':
          distance *= game.internal.diagonalScaling;
          proposedClientCharacterPosX += distance;
          proposedClientCharacterPosY -= distance;
          break;
        case 'right':
          proposedClientCharacterPosX += distance;
          break;
        case 'down_right':
          distance *= game.internal.diagonalScaling;
          proposedClientCharacterPosX += distance;
          proposedClientCharacterPosY += distance;
          break;
        case 'down':
          proposedClientCharacterPosY += distance;
          break;
        case 'down_left':
          distance *= game.internal.diagonalScaling;
          proposedClientCharacterPosX -= distance;
          proposedClientCharacterPosY += distance;
          break;
        case 'left':
          proposedClientCharacterPosX -= distance;
          break;
        case 'up_left':
          distance *= game.internal.diagonalScaling;
          proposedClientCharacterPosX -= distance;
          proposedClientCharacterPosY -= distance;
          break;
      }
      for (const obstacle of obstacles) {
        // TODO: On collision, modify proposed coordinates to have character go
        //       as far as possible up to obstacle's surface
      }
      proposedClientCharacterPosX = Math.max(0, Math.min(spaceWidth - clientCharacter.width, proposedClientCharacterPosX));
      proposedClientCharacterPosY = Math.max(0, Math.min(spaceHeight - clientCharacter.height, proposedClientCharacterPosY));
      let clientCharacterPositionChanged = false;
      if (clientCharacter.posX !== proposedClientCharacterPosX || clientCharacter.posY !== proposedClientCharacterPosY) {
        clientCharacter.posX = proposedClientCharacterPosX;
        clientCharacter.posY = proposedClientCharacterPosY;
        clientCharacterPositionChanged = true;
      }
      clientCharacter.orientation = game.internal.directionInput;
      game.internal.lastGameStateProcessTime = currentTime;
      game.internal.invokeGameStateChangeHandlers();
      if (clientCharacterPositionChanged) {
        api.sendGameInput({
          type: 'position',
          posX: clientCharacter.posX,
          posY: clientCharacter.posY,
          orientation: clientCharacter.orientation
        });
      }
    },

    startProcessing: () => {
      if (game.internal.gameStateProcessingInterval != null) {
        return;
      }
      game.internal.lastGameStateProcessTime = Date.now();
      game.internal.process();
      game.internal.gameStateProcessingInterval = setInterval(game.internal.process, game.internal.processTickTime);
    },

    stopProcessing: () => {
      clearInterval(game.internal.gameStateProcessingInterval);
      game.internal.gameStateProcessingInterval = null;
      game.internal.lastGameStateProcessTime = null;
    },

    handleIncomingMessage: (message) => {
      if (message.type !== 'game_snapshot') {
        return;
      }
      let clientCharacter;
      if (game.internal.gameState != null) {
        clientCharacter = game.internal.gameState.characters[game.internal.gameState.clientPlayerId];
      }
      game.internal.gameState = message.payload;
      if (clientCharacter != null) {
        game.internal.gameState.characters[game.internal.gameState.clientPlayerId] = clientCharacter;
      }
    },

    handleClosedConnection: () => {
      game.internal.stopProcessing();
      game.internal.gameState = null;
      game.internal.directionInput = null;
      game.internal.invokeGameStateChangeHandlers();
    }

  },

  initialize: () => {
    api.registerIncomingMessageHandler(game.internal.handleIncomingMessage);
    api.registerClosedConnectionHandler(game.internal.handleClosedConnection);
  },

  registerGameStateChangeHandler: (handler) => {
    game.internal.gameStateChangeHandlers.push(handler);
  },

  getGameState: () => {
    return game.internal.gameState;
  },

  joinGame: () => {
    if (game.internal.gameState != null) {
      return;
    }
    api.sendGameJoin();
    game.internal.startProcessing();
  },

  setDirectionInput: (direction) => {
    if (game.internal.gameState == null) {
      return;
    }
    game.internal.directionInput = direction;
  }

};

game.initialize();