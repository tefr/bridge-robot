"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deck_1 = require("./deck");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Melding som vises når spillet starter
app.get('/', (req, res) => {
    res.send('Bridge-server kjører!');
});
// Start server
app.listen(PORT, () => {
    console.log(`Bridge-server kjører på port ${PORT}`);
});
function distributeCards(players, deck) {
    const playerCount = players.length;
    const cardsPerPlayer = deck.length / playerCount;
    for (let i = 0; i < deck.length; i++) {
        players[i % playerCount].hand.push(deck[i]);
    }
}
function isBidValid(bid) {
    // Regular expression to match the pattern
    const pattern = /^[1-7] (spades|hearts|diamonds|clubs|NT)$/;
    return pattern.test(bid);
}
let players = [];
// Registrer en spiller med navn
app.post('/register', (req, res) => {
    const { name } = req.body;
    if (players.length >= 4) {
        return res.status(400).send('Maksimalt antall spillere registrert.');
    }
    const newPlayer = {
        id: `player${players.length + 1}`,
        name,
        hand: []
    };
    players.push(newPlayer);
    res.status(201).json(newPlayer);
});
// Del ut kort og start spillet
app.post('/start', (req, res) => {
    const deck = (0, deck_1.shuffleDeck)((0, deck_1.createDeck)());
    distributeCards(players, deck);
    res.send('Spill startet, kort er delt ut!');
});
// Vis kortene til spilleren
app.get('/players/:playerId/cards', (req, res) => {
    const { playerId } = req.params;
    const player = players.find(p => p.id === playerId);
    if (!player) {
        return res.status(404).send('Player not found');
    }
    res.json(player.hand);
});
app.post('/bid', (req, res) => {
    const { playerId, bid } = req.body;
    // Sjekk om budet faller utenfor det forventede regelsettet
    if (!isBidValid(bid)) {
        // Hvis budet ikke er gyldig, be om forklaring fra makkeren
        //waitForExplanation(playerId);
        return res.status(200).send("Waiting for partner's explanation.");
    }
    // Fortsett med spillets normale flyt
    res.status(200).send("Bid accepted.");
});
//# sourceMappingURL=main.js.map