const userBaseModel = {
    firstName: 'string',
    lastName: 'string',
    email: 'example@example.com',
    password: 'string',
    phone: '+521231231231',
    birthday: 'YYYY/MM/DD'
};

const validateModelUser = (user) => {
    if (!user) return false;
    return JSON.stringify(Object.keys(userBaseModel)) == JSON.stringify(Object.keys(user));
};

module.exports = {
    validateModelUser
};