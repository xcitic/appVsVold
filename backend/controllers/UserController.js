import User from '../db/models/User.js';
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;
import jwt from 'jsonwebtoken';
import fs from 'fs';
const privateKey = fs.readFileSync(process.env.PWD + '/keypair/key');


passport.use(User.createStrategy());


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



const UserController = {

  login(req, res) {
      passport.authenticate('local', (err, user, info) => {
          if (err) { return res.status(400).send({sucess: false, message: err}) }
          if (!user) { return res.status(401).send({success: false, message: 'Incorrect username or password'}) }
          if (info) { return res.status(200).send({success: false, message: info}) }

          req.login(user, function(err) {
              if (err) {
                  return res.status(401).send({success: false, message: err});
              } else {
                  const token = UserController.generateToken(user);
                  const reponse = {
                      token: token,
                      firstTimeVisit: user.firstTimeVisit,
                      username: user.username
                  }
                  saveTokenInRedis(user, token);
                  return res.status(200).cookie('token', token).send({success: true, message: "Authenticated successfully", ...reponse});
              }
          })
      })(req, res)
  },

  register(req, res) {
      User.register(new User({ username : req.body.username }), req.body.password, function(err, account) {
          if (err) {
              return res.status(400).send("Could not register user");
          } 

          if (account) {
              UserController.login(req, res);
          }
      });
  },

  generateToken(user) {
      return jwt.sign({userId: user._id, username: user.username}, privateKey, {expiresIn: '30d'});
  },

  async updateFirstTimeVisit(req, res) {
      const userId = req.token.userId
      if (!userId) {
          res.sendStatus(403, 'Unauthorized');
      }
      try {
        await User.find({_id: userId}, async (err, user) => {
            if (err) {
                return res.sendStatus(403, 'Unauthorized');
            }
            user.firstTimeVisit = false;
            await user.update();
        })
          res.sendStatus(203, 'Updated');
      } catch (e) {
          res.sendStatus(400, e);
      }
  }

}

function saveTokenInRedis(user, token) {
    // key = token value = userId

}

function removeTokenInRedis(user, token) {
    // on logout remove the user token
}

export default UserController;
