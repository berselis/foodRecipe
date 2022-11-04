const express = require('express');
const cors = require('cors')
const db = require('./project/utils/database');

const swaggerDoc = require('./swagger.json');
const { port } = require('./config');

const userRouter = require('./project/routers/users.router');
const authRouter = require('./project/auth/auth.router');
const categoriesRouter = require('./project/routers/categories.router');
const recipeRouter = require('./project/routers/recipes.router');
const ingredientsRouter = require('./project/routers/ingredients.router');

const initModels = require('./project/models/initModels');

const server = express();
server.use(express.json());
server.use(cors());

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

server.use('/api/docs', swaggerUi.server, swaggerUi.server(swaggerDoc));
server.use('/api/v1/users', userRouter);
server.use('/api/v1/auth', authRouter);
server.use('/api/v1/categories', categoriesRouter);
server.use('/api/v1/recipes', recipeRouter);
server.use('/api/v1/ingredients', ingredientsRouter);



//user
//types
//categories
//recipes
//instructions
//ingredients
//recipes_ingredients



server.listen(port, () => console.log(`Server started at port ${port}`));