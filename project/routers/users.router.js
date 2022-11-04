const router = require('express').Router();
const passport = require('passport');
const userServices = require('../services/users.services');
const { getUserRecipes } = require('../services/recipes.services');
require('../middlewares/auth.middleware')(passport);

router.get('/', userServices.getAllUsers);

router.route('/me')
    .get(passport.authenticate('jwt', { session: false }), userServices.getMyUser)
    .patch(passport.authenticate('jwt', { session: false }), userServices.patchMyUser)
    .delete(passport.authenticate('jwt', { session: false }), userServices.deleteMyUser)

router.route('/me/my_recipes')
    .get(passport.authenticate('jwt', { session: false }), getUserRecipes)

router.route('/:id')
    .get(passport.authenticate('jwt', { session: false }), userServices.getUserById)
    .patch(passport.authenticate('jwt', { session: false }), userServices.patchUser)
    .delete(passport.authenticate('jwt', { session: false }), userServices.deleteUser)



module.exports = router;

