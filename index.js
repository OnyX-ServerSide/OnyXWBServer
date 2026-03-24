const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); // Для приема JSON от Roblox
app.use(express.text({ type: '*/*', limit: '2mb' }));

let currentScript = ""; 
let activeGames = {}; // Объект для хранения активных игр

// 1. Прием скрипта с сайта
app.post('/update_script', (req, res) => {
    currentScript = req.body;
    res.status(200).send("OK");
});

// 2. Отдача скрипта в Roblox
app.get('/get_script', (req, res) => {
    res.send(currentScript);
});

// 3. Регистрация игры (отправляет Roblox)
app.post('/register_game', (req, res) => {
    const { gameName, status } = JSON.parse(req.body);
    activeGames[gameName] = { status, lastSeen: Date.now() };
    res.send("Registered");
});

// 4. Получение списка игр (запрашивает Сайт)
app.get('/get_games', (req, res) => {
    res.json(activeGames);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server Live"));
