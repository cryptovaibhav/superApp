// server/index.js

const path = require('path');
const express = require("express");
var vaultService = require('./service/service.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../frontend/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Handle GET requests to /api route
app.get("/buyGold", (req, res) => {
    res.json({ message: "Hello from server!" });
    vaultService.buyGold();
    // make service call to update gold reserves 
    // mint a new gold token equivalent to the gold mg 
    // send the gold token to the user's wallet 
});

  // Handle GET requests to /api route
app.get("/sellGold", (req, res) => {
    res.json({ message: "Hello from server!" });
    vaultService.sellGold();
    // make service call to update gold reserves 
    // burn a gold token equivalent from user's wallet 
});

  // Handle GET requests to /api route
app.get("/balance", (req, res) => {
    vaultService.balance();
    res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});