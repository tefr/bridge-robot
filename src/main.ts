import path from "path";
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

let players: Player[] = [];

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

