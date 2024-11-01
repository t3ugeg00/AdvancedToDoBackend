import { insertTask, selectAllTasks } from "../models/Task.js";
import { emptyOrRows } from "../helper/util.js";

const getTasks = async(req, res, next) => {
    try {
        const result = await selectAllTasks();
        return res.status(200).json(emptyOrRows(result))
    } catch(error) {
        return next(error);
    }
}

const postTask = async(req,res,next) => {
    try {
        if (!req.body.description || req.body.description.length == 0) {
            const error = new Error('Invalid description input');
            error.statusCode = 400;
            return next(error);
        }
        const result = await insertTask(req.body.description);
        return res.status(200).json(result.rows[0]);
    } catch (error) {
        return next(error);
    }
}

export { getTasks, postTask };