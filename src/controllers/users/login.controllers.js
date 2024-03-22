//ADMIN LOG IN
import { signAccessToken } from "../../utils/jwt.js"
import { verifyAccessToken } from '../../utils/jwt.js'
import { query, end } from '../../utils/connection.js';
import { filter } from '../../utils/common.js'
import express from 'express'


const router = express.Router()

router.post('/', async (req, res) => {
    const admin = req.body;

    // Check whether admin with the provided username and password exists
    let selectQuery = `
        SELECT * 
        FROM public."user" 
        WHERE username = '${admin.username}' AND password = '${admin.password}'
    `;
    query(selectQuery, async (err, result) => {
        if (!err) {
            // If admin exists, result will contain the admin data
            if (result.rows.length > 0) {
                try {
                    const accessToken = await signAccessToken(result.rows[0]);
                    // return token to Admin
                    res.status(200).json({ accessToken });
                } catch (error) {
                    console.error(error);
                    res.status(500).send('Error generating access token');
                }
            } else {
                // Admin not found, send failure message
                res.status(401).send('Invalid username or password');
            }
        } else {
            console.log(err.message);
            res.status(500).send('Error during login');
        }
    });
});


export default router
