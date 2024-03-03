"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
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
let players = [];
// POST route for player registration
app.post('/register', (req, res) => {
    const { name } = req.body;
    if (players.length >= 4) {
        return res.status(400).send('Maksimalt antall spillere registrert.');
    }
    const newPlayer = {
        id: `player${players.length + 1}`,
        name,
    };
    players.push(newPlayer);
    res.status(201).json(newPlayer);
});
//# sourceMappingURL=main.js.map