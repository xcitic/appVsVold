import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import connectDB from './db/init.js';
import {UserController, LogController} from './controllers/index.js';
import Authentication from './helpers/Authentication.js';

const app = express();
const port = 4000;

const router = express.Router();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(passport.initialize());


app.post('/login', async (req, res) => {
    UserController.login(req, res);
});


app.post('/register', (req, res) => {
    UserController.register(req, res);
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


router.use( (req, res, next) => {
    Authentication.verifyToken(req, res, next);
});

router.get('/logs', async (req, res, next) => {
    await LogController.getAllLogsForUser(req, res);
});

router.post('/logs', async (req, res, next) => {
    await LogController.storeLog(req, res, next);
});

app.use('/api', router, (req, res) => {
    res.sendStatus(401);
});



app.listen(port, () => {
  connectDB();
  console.log(`Listening on localhost:${port}`);
});
