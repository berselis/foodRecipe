const router = require('express').Router();
const passport = require('passport');
const userServices = require('../services/users.services');
require('../middlewares/auth.middleware')(passport);

router.get('/', userServices.getAllUsers);

router.route('/me')
    .get(passport.authenticate('jwt', { session: false }), userServices.getMyUser)
    .patch(passport.authenticate('jwt', {session: false}), userServices.patchMyUser)
    .delete(passport.authenticate('jwt', {session: false}), userServices.deleteMyUser)



router.route('/:id')
    .get(userServices.getUserById)
    .patch(userServices.patchUser)
    .delete(userServices.deleteUser)



module.exports = router;

