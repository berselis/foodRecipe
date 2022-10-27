const bcrypt = require('bcrypt');

const hashPassword = (rawPassword) => {
    return bcrypt.hashSync(rawPassword, 10);
};

const comparePassword = (rawPassword, hashedPassword) => {
    return bcrypt.compare(rawPassword, hashedPassword);
};

module.exports = {
    hashPassword,
    comparePassword
};