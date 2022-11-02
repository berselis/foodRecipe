const express = require('express');
const cors = require('cors')
const db = require('./project/utils/database');

const { port } = require('./config');

const userRouter = require('./project/routers/users.router');
const authRouter = require('./project/auth/auth.router');
const categoriesRouter = require('./project/routers/categories.router');
const recipeRouter = require('./project/routers/recipes.router');

const initModels = require('./project/models/initModels');

const server = express();
server.use(express.json());
server.use(express.json());

db.authenticate()
    .then(() => console.log('Server authenticated'))
    .catch(error => console.log(error));

db.sync()
    .then(() => console.log('Database synced'))
    .catch(error => console.log(error));

initModels();

server.get('/', (_, res) => {
    res.status(200).json({ message: 'OK!', users: `localHost:${port}/api/v1/users` })
});

server.use('/api/v1/users', userRouter);
server.use('/api/v1/auth', authRouter);
app.use('/api/v1/categories', categoriesRouter)
app.use('/api/v1/recipes', recipeRouter)



server.listen(port, () => console.log(`Server started at port ${port}`));