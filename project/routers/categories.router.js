const router = require('express').Router();

const categoireServices = require('../services/categories.services');

router.route('/')
    .get(categoireServices.getAllCategories)
    .post(categoireServices.postCategory) //TODO hacerla protegida por administrador

router.route('/:id')
    .get(categoireServices.getCategoryById)
    .delete(categoireServices.deleteCategory) //TODO hacerla protegida por administrador

module.exports = router
