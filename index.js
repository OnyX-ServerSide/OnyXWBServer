app.post('/register_game', (req, res) => {
    try {
        const data = JSON.parse(req.body);
        activeGames[data.gameName] = {
            author: data.author,
            placeId: data.placeId,
            playerCount: data.playerCount,
            maxPlayers: data.maxPlayers,
            status: data.status,
            lastSeen: Date.now()
        };
        res.send("Registered");
    } catch(e) { res.status(400).send("Error"); }
});
