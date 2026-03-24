const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.text({ type: '*/*', limit: '1mb' })); // Принимаем любой текст до 1МБ

let currentScript = ""; 

// Маршрут для сайта (отправка кода)
app.post('/update_script', (req, res) => {
    currentScript = req.body;
    console.log("New script received from Website");
    res.status(200).send("OK");
});

// Маршрут для Roblox (получение кода)
app.get('/get_script', (req, res) => {
    res.send(currentScript);
    // Если хочешь, чтобы скрипт удалялся после одного прочтения:
    // currentScript = ""; 
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});