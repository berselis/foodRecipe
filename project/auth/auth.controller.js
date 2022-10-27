const { getUserByEmail } = require('../controller/users.controller');
const { comparePassword } = require('../utils/crypto');

const loginUser = async (email, password) => {
    try {
        const user = await getUserByEmail(email);
        const validatePassword = comparePassword(password, user.password);
        if(validatePassword) return user;
        return false;
    } catch (error) {
        return false;
    }
}
module.exports = {
    loginUser
}