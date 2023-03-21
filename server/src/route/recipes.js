const express = require("express");
const RecipesModel = require("../models/Recipes.js");
const UserModel = require("../models/User.js");
const { verifyToken } = require("./user.js");
const { auth } = require("../route/auth.js")

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const response = await RecipesModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});
// Create a new recipe
router.post("/", verifyToken, async (req, res) => {
  const recipe = new RecipesModel(req.body);
  try {
    const response = await recipe.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

// router.get("/:recipeId", async (req, res) => {
//   try {
//     const result = await RecipesModel.findById(req.params.recipeId);
//     console.log("userID_recipeId_30", result)
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.put("/", verifyToken, async (req, res) => {
  try {
    const recipe = await RecipesModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    // console.log("userID_recipe.js_31", { user, recipe })
    user.savedRecipes.push(recipe);
    await user.save();
    res.json({ savedRecipes: user.save.savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

// list of userid with user loggedin and also saved recipes
router.get("/savedRecipes/ids/:userID", async (req, res) => {
  // "/savedRecipes/ids/:userId"
  //"/savedRecipes/ids/:`${userID}`"
  try {
    // const { userID: userID } = req.params;
    // console.log("userIDactaull", userID);
    // if (!mongoose.Types.ObjectId.isValid(userID))
    //   return res.status(404).json({
    //     msg: `No task with id :${userID}`
    //   });

    const user = await UserModel.findById(req.params.userID);
    // console.log("userID_recipe.js_ID42", user)
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

// SavedRecipes
router.get("/savedRecipes/:userID", async (req, res) => {
  try {

    const user = await UserModel.findById(req.params.userID);
    const savedRecipes = await RecipesModel.find({
      _id: { $in: user.savedRecipes },
    });
    // console.log("userID_recipe.js_userID51", savedRecipes)
    res.json({ savedRecipes });
  } catch (err) {
    res.json(err);
  }
});
module.exports = router;
