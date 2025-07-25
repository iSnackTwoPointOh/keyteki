describe('Traumatic Echo', function () {
    describe("Traumatic Echo's ability", function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    house: 'dis',
                    hand: ['traumatic-echo'],
                    discard: ['searine', 'draining-touch', 'wretched-doll', 'painmail']
                },
                player2: {
                    inPlay: ['flaxia'],
                    hand: [
                        'dust-pixie',
                        'the-circle-of-life',
                        'ritual-of-balance',
                        'way-of-the-wolf'
                    ]
                }
            });
        });

        it('prevents opponents from playing creatures', function () {
            this.player1.play(this.traumaticEcho);
            this.player1.clickCard(this.searine);
            expect(this.searine.location).toBe('purged');

            // Player 1 can still play creatures
            this.player1.moveCard(this.searine, 'hand');
            this.player1.playCreature(this.searine);
            this.player1.endTurn();

            // Player 2 cannot play creatures next turn
            this.player2.clickPrompt('untamed');
            this.player2.clickCard(this.dustPixie);
            expect(this.player2).toHavePrompt('Dust Pixie');
            expect(this.player2).toHavePromptButton('Discard this card');
            expect(this.player2).toHavePromptButton('Cancel');
            expect(this.player2).not.toHavePromptButton('Play this creature');
            this.player2.clickPrompt('Cancel');

            // Player 2 can play other card types
            this.player2.play(this.theCircleOfLife);
            this.player2.play(this.ritualOfBalance);
            this.player2.playUpgrade(this.wayOfTheWolf, this.flaxia);
            this.player2.endTurn();

            // After that turn, everyone can play creatures
            this.player1.clickPrompt('dis');
            this.player1.moveCard(this.searine, 'hand');
            this.player1.playCreature(this.searine);
            this.player1.endTurn();
            this.player2.clickPrompt('untamed');
            this.player2.playCreature(this.dustPixie);
            expect(this.player2).toHavePrompt('Choose a card to play, discard or use');
        });

        it('prevents opponents from playing actions', function () {
            this.player1.play(this.traumaticEcho);
            this.player1.clickCard(this.drainingTouch);
            expect(this.drainingTouch.location).toBe('purged');

            // Player 1 can still play actions
            this.player1.moveCard(this.drainingTouch, 'hand');
            this.player1.play(this.drainingTouch);
            this.player1.clickCard(this.flaxia);
            this.player1.endTurn();

            // Player 2 cannot play actions next turn
            this.player2.clickPrompt('untamed');
            this.player2.clickCard(this.theCircleOfLife);
            expect(this.player2).toHavePrompt('The Circle of Life');
            expect(this.player2).toHavePromptButton('Discard this card');
            expect(this.player2).toHavePromptButton('Cancel');
            expect(this.player2).not.toHavePromptButton('Play this action');
            this.player2.clickPrompt('Cancel');

            // Player 2 can play other card types
            this.player2.playCreature(this.dustPixie);
            this.player2.play(this.ritualOfBalance);
            this.player2.playUpgrade(this.wayOfTheWolf, this.dustPixie);
            this.player2.endTurn();

            // After that turn, everyone can play actions
            this.player1.clickPrompt('dis');
            this.player1.moveCard(this.drainingTouch, 'hand');
            this.player1.play(this.drainingTouch);
            this.player1.clickCard(this.dustPixie);
            this.player1.endTurn();
            this.player2.clickPrompt('untamed');
            this.player2.play(this.theCircleOfLife);
            expect(this.player2).toHavePrompt('Choose a card to play, discard or use');
        });

        it('prevents opponents from playing artifacts', function () {
            this.player1.play(this.traumaticEcho);
            this.player1.clickCard(this.wretchedDoll);
            expect(this.wretchedDoll.location).toBe('purged');

            // Player 1 can still play artifacts
            this.player1.moveCard(this.wretchedDoll, 'hand');
            this.player1.play(this.wretchedDoll);
            this.player1.endTurn();

            // Player 2 cannot play artifacts next turn
            this.player2.clickPrompt('untamed');
            this.player2.clickCard(this.ritualOfBalance);
            expect(this.player2).toHavePrompt('Ritual of Balance');
            expect(this.player2).toHavePromptButton('Discard this card');
            expect(this.player2).toHavePromptButton('Cancel');
            expect(this.player2).not.toHavePromptButton('Play this artifact');
            this.player2.clickPrompt('Cancel');

            // Player 2 can play other card types
            this.player2.playCreature(this.dustPixie);
            this.player2.play(this.theCircleOfLife);
            this.player2.playUpgrade(this.wayOfTheWolf, this.flaxia);
            this.player2.endTurn();

            // After that turn, everyone can play artifacts
            this.player1.clickPrompt('dis');
            this.player1.moveCard(this.wretchedDoll, 'hand');
            this.player1.play(this.wretchedDoll);
            this.player1.endTurn();
            this.player2.clickPrompt('untamed');
            this.player2.play(this.ritualOfBalance);
            expect(this.player2).toHavePrompt('Choose a card to play, discard or use');
        });

        it('prevents opponents from playing upgrades', function () {
            this.player1.play(this.traumaticEcho);
            this.player1.clickCard(this.painmail);
            expect(this.painmail.location).toBe('purged');

            // Player 1 can still play upgrades
            this.player1.moveCard(this.painmail, 'hand');
            this.player1.playUpgrade(this.painmail, this.flaxia);
            this.player1.endTurn();

            // Player 2 cannot play upgrades next turn
            this.player2.clickPrompt('untamed');
            this.player2.clickCard(this.wayOfTheWolf);
            expect(this.player2).toHavePrompt('Way of the Wolf');
            expect(this.player2).toHavePromptButton('Discard this card');
            expect(this.player2).toHavePromptButton('Cancel');
            expect(this.player2).not.toHavePromptButton('Play this upgrade');
            this.player2.clickPrompt('Cancel');

            // Player 2 can play other card types
            this.player2.playCreature(this.dustPixie);
            this.player2.play(this.theCircleOfLife);
            this.player2.play(this.ritualOfBalance);
            this.player2.endTurn();

            // After that turn, everyone can play upgrades
            this.player1.clickPrompt('dis');
            this.player1.clickPrompt('Yes');
            this.player1.moveCard(this.flaxia, 'play area');
            this.player1.playUpgrade(this.painmail, this.flaxia);
            this.player1.endTurn();
            this.player2.clickPrompt('untamed');
            this.player2.playUpgrade(this.wayOfTheWolf, this.flaxia);
            expect(this.player2).toHavePrompt('Choose a card to play, discard or use');
        });
    });
});
