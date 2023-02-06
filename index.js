const express = require('express');

const app = express();
const port = 3000;

const authRoutes = require('./routes/auth');

app.use('/query', authRoutes);

//app start
const appStart = () => {
    try {
        app.listen(port, 'localhost');
        console.log(`App listening at http://localhost:${port}`)
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

appStart();