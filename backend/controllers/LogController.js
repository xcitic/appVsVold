import Log from '../db/models/Log.js';

const LogController = {

    async getAllLogsForUser(req, res) {
        const userId = req.token.userId

        if (!userId) {
            res.sendStatus(403, "Unauthorized");
        }

        await Log.find({user: userId}, null, {sort: {createdAt: 'desc'}}, (err, logs) => {
            if (err) {
                return res.status(500).send(err.message);
            }

            if (logs.length == 0) {
                res.send([])
            }

            let response = [];

            for (let i = 0; i < logs.length; i++) {
                const formattedPayload = LogController.reduceLogDocument(logs[i]);
                response.push(formattedPayload);
            }

            res.send(response)
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

    reduceLogDocument(log) {
        return {
            id: log._id || '',
            title: log.title || '',
            description: log.description || '',
            date: log.date || '',
            files: LogController.reduceFileDocument(log.files) || [],
            location: log.location || ''
        }
    },

    reduceFileDocument(files) {
        if (files.length == 0) {
            return []
        }
        let reduced = []
        for(let file of files) {
            reduced.push({
                id: file._id,
                fileType: file.fileType,
                name: file.name
            })
        }
        return reduced;
    }





}


export default LogController;