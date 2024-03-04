"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffleDeck = exports.createDeck = void 0;
function createDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let deck = [];
    for (let suit of suits) {
        for (let rank of ranks) {
            deck.push({ suit, rank });
        }
    }
    return deck;
}
exports.createDeck = createDeck;
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]; // swap elements
    }
    return deck;
}
exports.shuffleDeck = shuffleDeck;
//# sourceMappingURL=deck.js.map