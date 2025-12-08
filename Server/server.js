require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const { verifyAccesstoken } = require('./libraries/jwt_helper');
const cors = require('cors');
const app = express();
const requestIp = require("request-ip");

// import routes
const authRoute = require('./routes/auth.route');
const guthiRoute = require('./routes/guthi.route');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(requestIp.mw());
app.set('trust proxy', true);

// lets handle request coming from frontend
app.use('/api/auth', authRoute);
app.use('/api/guthi', verifyAccesstoken, guthiRoute);
app.get('/', async (req, res, next) => { res.send("hello from server")});
app.use((err, req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    const status = err.status || 500;
    console.log(err);
    res.status(status).json({
        error: {
            status,
            message: err.message || "Internal Server Error",
        },
    });
})
const PORT = process.env.API_PORT || 3000
app.listen(PORT, () => {
    console.log(`server is running in port ${PORT}`)
})