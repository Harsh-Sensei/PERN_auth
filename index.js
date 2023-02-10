const express = require('express');
const sessions = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const port = 3000;

const authRoutes = require('./routes/auth');
const oneWeek = 7*1000 * 60 * 60 * 24;
const secretKey = process.env.sessionSecretKey;
app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}));
app.use(cookieParser());
app.use(sessions({
    secret: secretKey,
    saveUninitialized:true,
    cookie: { maxAge: oneWeek },
    resave: false 
}));
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