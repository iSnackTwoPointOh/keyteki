const _ = require('underscore');
const Phase = require('../phase.js');
const SimpleStep = require('../simplestep.js');
const MulliganPrompt = require('./mulliganprompt.js');

class SetupPhase extends Phase {
    constructor(game) {
        super(game, 'setup');
        this.initialise([
            new SimpleStep(game, () => this.setupBegin()),
            new SimpleStep(game, () => this.chooseFirstPlayer()),
            new SimpleStep(game, () => this.drawStartingHands()),
            new MulliganPrompt(game),
            new SimpleStep(game, () => this.startGame())
        ]);
    }

    startPhase() {
        // Don't raise any events without a determined first player
        this.game.currentPhase = this.name;
    }

    setupBegin() {
        let allPlayersShuffled = _.shuffle(this.game.getPlayers());
        this.game.activePlayer = allPlayersShuffled.shift();
    }

    chooseFirstPlayer() {
        if(this.game.activePlayer.opponent) {
            this.game.promptWithHandlerMenu(this.game.activePlayer, {
                activePromptTitle: 'You won the flip. Do you want to be:',
                source: 'Choose First Player',
                choices: ['First Player', 'Second Player'],
                handlers: [
                    () => this.game.activePlayer.drawCardsToHand(1),
                    () => {
                        this.game.activePlayer = this.game.activePlayer.opponent;
                        this.game.activePlayer.drawCardsToHand(1);
                    }
                ]
            });
        }
    }

    drawStartingHands() {
        _.each(this.game.getPlayers(), player => player.drawCardsToHand(6));
    }

    startGame() {
        _.each(this.game.getPlayers(), player => {
            player.readyToStart = true;
        });
    }
}

module.exports = SetupPhase;
