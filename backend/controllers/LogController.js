import Log from '../db/models/Log.js';
import Authentication from '../helpers/Authentication.js';

const LogController = {

    async getAllLogsForUser(req, res) {
        const userId = req.token.userId

        if (!userId) {
            res.sendStatus(403, "Unauthorized");
        }

        await Log.find({user: userId}, (err, logs) => {
            if (err) {
                return res.send(err.message);
            }

            res.send(logs)
        });
    },


    async storeLog(req, res) {
        const userId = req.token.userId

        try {
            const userInput = req.body;
            const log = new Log({
                user: userId,
                description: userInput.description,
                files: userInput.files,
                location: userInput.location,
                date: userInput.date
            });
            await log.save();
            res.sendStatus(201, 'Log created');
        } catch (err) {
            res.sendStatus(400, `Error ${err.message}`);
        }
    },


    ignoreLog(req, res) {

    },





}


export default LogController;