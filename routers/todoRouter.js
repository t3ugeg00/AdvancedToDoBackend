import { pool } from "../helper/db.js";
import { Router } from "express";
import { emptyOrRows } from "../helper/util.js";
import { auth } from '../helper/auth.js';
import { getTasks, postTask } from "../controllers/TaskController.js";

const router = Router();

router.get('/', getTasks);

router.post('/create', auth, postTask);

// router.get('/', (req,res) => {
//     pool.query('select * from task', (err, result) => {
//         if (err) {
//             return res.status(500).json({error: err.message});
//         }
//         return res.status(200).json(emptyOrRows(result));
//     })
// })

// router.post('/create', auth, (req, res) => {
//     pool.query('insert into task (description) values ($1) returning *',
//         [req.body.description],
//         (err, result) => {
//             if (err) {
//                 return res.status(500).json({error: err.message});
//             }

//             return res.status(200).json(result.rows[0])
//         }
//     )
// })

router.delete('/delete/:id', auth, (req,res) => {
    const id = +req.params.id;

    pool.query('delete from task where id = $1',
        [id],
        (err, result) => {
            if (err) {
                return res.status(500).json({error: err.message});
            }

            return res.status(200).json({id: id});
        }
    )
})

export { router };