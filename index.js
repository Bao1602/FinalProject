// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();
// const PORT = process.env.PORT || 8080;
// require('dotenv').config();
// const UserRoutes = require('./routes/userRoute');

// const path = require('path');

// app.use(express.json());

// mongoose.connect(process.env.MONGODB_URL).then(() => {
//     console.log('Connected to the Database');
// }).catch((error) => {
//     console.error(`Error connecting to the Database: ${error} `);
// })

//  app.get('/', (req, res) => {
//      res.send('Hello World');
//  })


// app.use(express.static(path.join(__dirname, 'frontend')));

// app.use('/api/v1/users', UserRoutes);

// app.listen(PORT, () => {
//     console.log(`Server Currently Running on port ${PORT}`);
// })

const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to protect against common vulnerabilities
app.use(helmet());

// Middleware for JSON parsing
app.use(express.json());

// Rate limiting to prevent abuse
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL, {
    maxPoolSize: 10, 
}).then(() => {
    console.log('Connected to the Database');
}).catch((error) => {
    console.error(`Error connecting to the Database: ${error}`);
});


// Serve static files
app.use(express.static(path.join(__dirname, 'frontend')));

// User routes
const UserRoutes = require('./routes/userRoute');
app.use('/api/v1/users', UserRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server Currently Running on port ${PORT}`);
});
