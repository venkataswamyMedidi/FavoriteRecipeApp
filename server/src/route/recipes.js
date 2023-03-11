const express = require('express')
const mongoose = require('mongoose');
const RecipesModel = require('../models/Recipes.js');
const UserModel = require('../models/User.js');
const Router = require('express');

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await RecipesModel.find({});
        res.json(response)
    } catch (err) {
        res.json(err)
    }
})
// Create a new recipe
router.post("/", async (req, res) => {
    const recipe = new RecipesModel(req.body)
    try {
        const response = await recipe.save();
        res.json(response)
    } catch (err) {
        res.json(err)
    }
})

router.put("/", async (req, res) => {
    try {
        const recipe = await RecipesModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID)
        user.savedRecipes.push(recipe);
        await user.save()
        res.json({ savedRecipes: user.save.savedRecipes })
    } catch (err) {
        res.json(err)
    }
})

// list of id with user loggedin and also saved recipes
router.get("/savedRecipes/ids/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID)
        res.json({ savedRecipes: user?.savedRecipes })
    } catch (err) {
        res.json(err)
    }
})

// SavedRecipes 
router.get("/savedRecipes/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID)
        const savedRecipes = await RecipesModel.find({
            _id: { $in: user.savedRecipes }
        })
        res.json({ savedRecipes })
    } catch (err) {
        res.json(err)
    }
})
module.exports = router 