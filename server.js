const express = require('express');
const db = require('./project/utils/database');
const initModels = require('./project/models/initModels');
const { port } = require('./config');
const userRouter = require('./project/routers/users.router');
const authRouter = require('./project/auth/auth.router');



const server = express();


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



server.listen(port, () => console.log(`Server started at port ${port}`));