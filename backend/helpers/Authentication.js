import jwt from 'jsonwebtoken';
import fs from 'fs';
const privateKey = fs.readFileSync(process.env.PWD + '/keypair/key');


const Authentication = {

    getUserId(token) {
        const decrypted = jwt.verify(token, privateKey);
        return decrypted.userId;
    },

    verifyToken (req, res, next) {
        const token = req.cookies.token || '';
        try {
            if (!token) {
                return res.status(401).send('Authentication token is missing');
            }
            const decrypted = jwt.verify(token, privateKey);
            const currTime = Date.now() / 1000;
            const expired = currTime > decrypted.exp ? true : false;
            if (expired === true) {
                return res.send('Token has expired');
            } else {
               req.token = decrypted;
               next()
            }
        } catch (err) {
            return res.sendStatus(401, 'Unauthorized');
        }
    },

}

export default Authentication;