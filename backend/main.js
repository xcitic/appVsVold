require('dotenv').config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import path from 'path';

import connectDB from './db/init.js';
import {UserController, LogController, FileController} from './controllers/index.js';
import Authentication from './helpers/Authentication.js';


const app = express();
const port = process.env.NODE_PORT;

const router = express.Router();

const fileController = new FileController();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(__dirname + '/dist'));


app.post('/login', async (req, res) => {
    try {
        UserController.login(req, res);
    } catch (e) {
        res.send(400).status(e);
    }
});


app.post('/register', (req, res) => {
    try {
        UserController.register(req, res);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.post('/reset-password', (req, res) => {
    // find user
    // generate a token that has short expiration and save it to the db
    // send email to user with the link to reset password
});

app.post('/reset-password/:id', (req, res) => {
    // get the token from the :id field
    // find a user where the token exists
    // check that the token has not expired
    // use the req.body.password to set the new password
    // update db and log user in
    // send token back to user
});


router.use('', (req, res, next) => {
    try {
        Authentication.verifyToken(req, res, next);
    } catch (e) {
        res.status(401).send(e.message);
    }
});

router.get('/logs/:logId', async (req, res, next) => {
    try {
        await LogController.getLogById(req, res);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/logs', async (req, res, next) => {
    try {
        await LogController.getAllLogsForUser(req, res);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/logs', async (req, res, next) => {
    try {
        await LogController.storeLog(req, res, next);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.put('/firstimevisit', async (req, res, next) => {
    try {
        await UserController.updateFirstTimeVisit(req, res, next);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.post('/signed-url', async (req, res) => {
    try {
        await fileController.getSignedUrl(req, res);
    } catch (e) {
        res.status(500).send(e);
    }
})

router.get('/file/:logId/:fileId', async (req, res) => {
    try {
        await fileController.getFileFromBucket(req, res);
    } catch (e) {
        res.status(500).send(e);
    }
})

app.use('/api', router, (req, res) => {
    res.sendStatus(401);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});



app.listen(port, () => {
  connectDB();
  console.log(`Listening on 127.0.0.1:${port}`);
});
