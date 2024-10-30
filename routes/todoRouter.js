import { pool } from "../helper/db.js";
import { Router } from "express";
import { emptyOrRows } from "../helper/util.js";

const router = Router();

router.get('/', (req,res) => {
    pool.query('select * from task', (err, result) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        return res.status(200).json(emptyOrRows(result));
    })
})

router.post('/create', (req, res) => {
    pool.query('insert into task (description) values ($1) returning *',
        [req.body.description],
        (err, result) => {
            if (err) {
                return res.status(500).json({error: err.message});
            }

            return res.status(200).json(result.rows[0])
        }
    )
})

router.delete('/delete/:id', (req,res) => {
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