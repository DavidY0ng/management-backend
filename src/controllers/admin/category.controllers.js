import { query, end } from '../../utils/connection.js';
import express from 'express'

const router = express.Router()

//GET ALL CATEGORY
router.get('/', (req, res) => {
    query(`SELECT * FROM public."category"`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    end;
})

//GET CATEGORY BY ID
router.get('/:id', (req, res) => {
    query(`SELECT * FROM public."category" WHERE id=${req.params.id}`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    end;
})

//CREATE CATEGORY
router.post('/', (req, res) => {
    const category = req.body;
    let insertQuery = `
        INSERT INTO public."category"(id, name, description, activated, created_at, updated_at) 
        VALUES(${category.id}, '${category.name}', '${category.description}', '${category.activated}', NOW(), NOW())
    `;
    query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Insertion was successful')
        }
        else { console.log(err.message) }
    })
    end;
})

//UPDATE CATEGORY
router.put('/:id', (req, res) => {
    let category = req.body;
    let updateQuery = `
        UPDATE public."category"
        SET 
            name = '${category.name}',
            description = '${category.description}',
            activated = ${category.activated},
            updated_at = NOW()
        WHERE 
            id = ${req.params.id}
    `;

    query(updateQuery, (err, result) => {
        if (!err) {
            res.send('Update was successful')
        }
        else { console.log(err.message) }
    })
    end;
})

//DELETE CATEGORY
router.delete('/:id', (req, res) => {
    let categoryId = req.params.id;
    let deleteQuery = `
        DELETE FROM public."category"
        WHERE id = ${categoryId}
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