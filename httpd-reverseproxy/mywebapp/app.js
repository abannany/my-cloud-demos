const express = require('express');
const dotenv = require('dotenv');

var os = require("os");
dotenv.config();
const app = express();

app.listen(process.env.LISTEN_PORT, () => {
    console.log('Server started on port ' + process.env.LISTEN_PORT);
});

app.get('/api', (req, res) => {
    res.send("Hostname: " + os.hostname());
});

app.get('/api/test', (req, res) => {
    res.send("Test api Hostname: " + os.hostname());
});


app.get('/ui/test/aa', (req, res) => {
    res.send("UI TEST: " + os.hostname());
});
