// index.js

const express = require('express');
const cors = require('cors');  // Import the CORS package

const index = express();
const PORT = 4000;

// Enable CORS
index.use(cors());

// Middleware to parse JSON bodies
index.use(express.json());

// Import the jobs route
const jobsRoute = require('./routes/jobs');

// Use the jobs route with the base path '/jobs'
index.use('/jobs', jobsRoute);

// Route to receive data
index.post('/data', (req, res) => {
    const receivedData = req.body;
    console.log('Received data:', receivedData);
    res.status(200).send('Data received');
});

// Route to send data
index.get('/data', (req, res) => {
    const dataToSend = {message: 'Hello from server!'};
    res.status(200).json(dataToSend);
});

index.listen(PORT, (error) => {
    if (!error)
        console.log("Server is successfully running, " +
            "and app is listening on port " + PORT);
    else
        console.log("Error occurred, server can't start", error);
});