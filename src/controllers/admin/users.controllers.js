import { query, end } from '../../utils/connection.js';
import express from 'express'
import auth from '../../middlewares/auth.js';

const router = express.Router()

//GET ALL USERS
router.get('/', async (req, res) => {    
    await query(`SELECT * FROM public."user"`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
        
    });
    end;
})

//GET USERS BY ID
router.get('/:id', (req, res) => {
    query(`SELECT * FROM public."user" WHERE id=${req.params.id}`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    end;
})

//CREATE USER
router.post('/', (req, res) => {
    const user = req.body;
    let insertQuery = `
        INSERT INTO public."user"(id, username, password, email, fullname, membership, created_at, updated_at) 
        VALUES(${user.id}, '${user.username}', '${user.password}', '${user.email}', '${user.fullname}', '${user.membership}', NOW(), NOW())
    `;
    query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Insertion was successful')
        }
        else { console.log(err.message) }
    })
    end;
})

//UPDATE USER
router.put('/:id', (req, res) => {
    let user = req.body;
    let updateQuery = `
        UPDATE public."user"
        SET 
            username = '${user.username}',
            password = '${user.password}',
            email = '${user.email}',
            fullname = '${user.fullname}',
            membership = '${user.membership}',
            updated_at = NOW()
        WHERE 
            id = ${user.id}
    `;

    query(updateQuery, (err, result) => {
        if (!err) {
            res.send('Update was successful')
        }
        else { console.log(err.message) }
    })
    end;
})

//DELETE USER
router.delete('/:id', (req, res) => {
    let userId = req.params.id;
    let deleteQuery = `
        DELETE FROM public."user"
        WHERE id = ${userId}
    `;

    query(deleteQuery, (err, result) => {
        if (!err) {
            res.send('Deletion was successful');
        } else {
            console.log(err.message);
            res.status(500).send('Error deleting user');
        }
    });
});

export default router