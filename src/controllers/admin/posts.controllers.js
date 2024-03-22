import { query, end } from '../../utils/connection.js';
import express from 'express'

const router = express.Router()

//GET ALL POSTS
router.get('/', (req, res) => {
    query(`SELECT * FROM public."post"`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    end;
})

//GET POST BY ID
router.get('/:id', (req, res) => {
    query(`SELECT * FROM public."post" WHERE id=${req.params.id}`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    end;
})

//CREATE POST
router.post('/', (req, res) => {
    const user = req.body;
    let insertQuery = `
        INSERT INTO public."post"(id, title, body, category_id, status, label, created_at, updated_at) 
        VALUES(${user.id}, '${user.title}', '${user.body}', '${user.category_id}', '${user.status}', '${user.label}', NOW(), NOW())
    `;
    query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Insertion was successful')
        }
        else { console.log(err.message) }
    })
    end;
})

//UPDATE POST
router.put('/:id', (req, res) => {
    let post = req.body;
    let updateQuery = `
        UPDATE public."post"
        SET 
            title = '${post.title}',
            body = '${post.body}',
            category_id = ${post.category_id},
            status = '${post.status}',
            label = '${post.label}',
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

//DELETE POST
router.delete('/:id', (req, res) => {
    let postId = req.params.id;
    let deleteQuery = `
        DELETE FROM public."post"
        WHERE id = ${postId}
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