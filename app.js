import { connect, query, end } from './src/utils/connection.js';
import bodyParser from "body-parser";
import adminRouter from './src/controllers/admin/login.controllers.js'
import usersRouter from './src/controllers/admin/users.controllers.js'
import postsRouter from './src/controllers/admin/posts.controllers.js'
import categoryRouter from './src/controllers/admin/category.controllers.js'
import userLoginRouter from './src/controllers/users/login.controllers.js'
import auth from "./src/middlewares/auth.js" 

import express from 'express';

const app = express();

app.use(bodyParser.json());
app.listen(3300, ()=>{
    console.log("Sever is now listening at port 3300");
})

//admin login and action
app.use('/admin', adminRouter)
app.use('/users',auth, usersRouter)
app.use('/posts',auth, postsRouter)
app.use('/category',auth, categoryRouter)

//user login 
app.use('/users_login', userLoginRouter)

connect();
