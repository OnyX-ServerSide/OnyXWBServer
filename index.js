const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.text());
app.use(express.json());

// Временное хранилище (на Vercel будет жить недолго, но для тестов хватит)
let globalScript = "-- Waiting for script...";
let servers = {};

app.get('/', (req, res) => res.send("OnyX API is Running"));

// Обновить скрипт с сайта
app.post('/update_script', (req, res) => {
    globalScript = req.body;
    res.status(200).send("Updated");
});

// Roblox забирает скрипт
app.get('/get_script', (req, res) => {
    res.status(200).send(globalScript);
});

// Регистрация серверов из игры
app.post('/register_game', (req, res) => {
    const { placeId, gameName, playerCount, maxPlayers } = req.body;
    servers[placeId] = {
        gameName,
        playerCount,
        maxPlayers,
        lastSeen: Date.now()
    };
    res.status(200).send("OK");
});

// Сайт забирает список игр
app.get('/get_games', (req, res) => {
    // Чистим старые сервера (старше 1 минуты)
    const now = Date.now();
    for (const id in servers) {
        if (now - servers[id].lastSeen > 60000) delete servers[id];
    }
    res.status(200).json(servers);
});

module.exports = app;
