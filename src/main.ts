// Obligatorisk innlevering 1 i Videregående programmering
// Høgskolen i Molde våren 2024
// Server til en bridge-robot
// Tor Erik Fredrikstad og Evi Sandbakken

import express,
{ Express, NextFunction, Request, Response } from "express";
import { Card, createDeck, shuffleDeck } from './deck';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Melding som vises når spillet starter
app.get('/', (req, res) => {
  res.send('Bridge-server kjører!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Bridge-server kjører på port ${PORT}`);
});

// Spillerregistrering
interface Player {
    id: string;
    name: string;
    hand: Card[];
}

function distributeCards(players: Player[], deck: Card[]) {
    const playerCount = players.length;
    const cardsPerPlayer = deck.length / playerCount;

    for (let i = 0; i < deck.length; i++) {
        players[i % playerCount].hand.push(deck[i]);
    }
} 

function isBidValid(bid: string): boolean{
    const pattern = /^(?:[1-7](?:S|H|D|C|NT)|pass)$/;
    if(!pattern.test(bid)) return false;
    return true;
}

let players: Player[] = [];

// Registrer en spiller med navn
app.post('/register', (req, res) => {
const { name } = req.body;

if(players.length >= 4) {
    return res.status(400).send('Maksimalt antall spillere registrert.');
}

const newPlayer: Player = {
    id: `player${players.length + 1}`,
    name,
    hand: []
};

players.push(newPlayer);
res.status(201).json(newPlayer);
});

// Del ut kort og start spillet
app.post('/start', (req, res) => {
    const deck = shuffleDeck(createDeck());
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

// Legg inn bud
app.post('/bid', (req, res) => {
    const { playerId, bid } = req.body;

    // Sjekk om budet faller utenfor det forventede regelsettet
    if (!isBidValid(bid)) {
        // Hvis budet ikke er gyldig, be om forklaring fra makkeren
        //waitForExplanation(playerId);
        return res.status(200).send("Bid not valid.");
    }

    // Fortsett med spillets normale flyt
    res.status(200).send("Bid accepted.");
});