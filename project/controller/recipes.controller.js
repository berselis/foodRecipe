const uuid = require('uuid');
const Recipes = require('../models/recipes.model');
const Categories = require('../models/categories.model');
const Users = require('../models/users.model');
const Instructions = require('../models/instructions.model');
const RecipeIngredients = require('../models/recipes_ingredients.model');
const Ingredients = require('../models/ingredients.model');
const Types = require('../models/types.model');

const getAllRecipes = async () => {
    const data = await Recipes.findAll({
        attributes: {
            exclude: ['userId', 'categoryId', 'createdAt', 'updatedAt']
        },
        include: [
            {
                model: Categories
            },
            {
                model: Users,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Instructions,
                attributes: ['step', 'description']
            },
            {
                model: RecipeIngredients,
                include: {
                    model: Ingredients,
                    include: {
                        model: Types
                    }
                }
            }
        ]
    })
    return data
}

const getRecipeById = async (id) => {
    const data = await Recipes.findOne({
        where: {
            id
        },
        attributes: {
            exclude: ['userId', 'categoryId', 'createdAt', 'updatedAt']
        },
        include: [
            {
                model: Categories
            },
            {
                model: Users,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Instructions,
                attributes: ['step', 'description']
            },
            {
                model: RecipeIngredients,
                include: {
                    model: Ingredients,
                    include: {
                        model: Types
                    }
                }
            }
        ]
    })
    return data
}

const createRecipe = async (data) => {
    const response = await Recipes.create({
        id: uuid.v4(),
        title: data.title,
        description: data.description,
        urlImg: data.urlImg,
        time: data.time,
        portions: data.portions,
        userId: data.userId,
        categoryId: data.categoryId,
        origin: data.origin,
        likes: data.likes
    })
    return response
}

const updateRecipe = async (id, data) => {
    const response = await Recipes.update(data, {
        where: {
            id
        }
    })
    return response
}

const deleteRecipe = async (id) => {
    const data = await Recipes.destroy({
        where: {
            id
        }
    })
    return data
}

const getMyRecipes = async(userId) => {
    const userIngredients = await UsersIngredients.findAll({
        attributes: ['ingredientId'],
        where: {
            userId
        }
    })
    const filteredIngredients = userIngredients.map(obj => obj.ingredientId)
    const recipeIngredients = await RecipeIngredients.findAll({
        where: {
            ingredientId: {
                [Op.in]: filteredIngredients
            }
        }
    })

    const filteredRecipes = recipeIngredients.map(obj => obj.recipeId)

    const data = await Recipes.findAll({
        where: {
            id: {
                [Op.in]: filteredRecipes
            }
        }
    })

    return data
}

module.exports = {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
}
