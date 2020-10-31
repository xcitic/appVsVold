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
                title: userInput.title,
                description: userInput.description,
                files: userInput.files,
                location: userInput.location,
                date: userInput.date
            });
            await log.save();
            const response = {
                title: log.title,
                description: log.description,
                files: log.files,
                date: log.date,
                location: log.location
            }
            res.status(201).send(response);
        } catch (err) {
            res.sendStatus(400, `Error ${err.message}`);
        }
    },


    ignoreLog(req, res) {

    },





}


export default LogController;