const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/User.js");
const RecipesModel = require("../models/Recipes.js");

// const { scryptSync, randomBytes } = require("crypto");
// const salt = randomBytes(16).toString("hex")
// const getHash = (password) => scryptSync(password, salt, 32).toString("hex");
// console.log("getHash", getHash)

// var simplecrypt = require("simplecrypt");
// var sc = simplecrypt();

// var digest = sc.encrypt("my secret");
// console.log(digest); // "66cea6eb1c18b8862485cf0604fa6062"

// var message = sc.decrypt(digest);
// console.log("message", message);

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (user) {
    return res.json({ message: "User already exists!" });
  }

  //const hashedPassword = await message.hash(password, 10);
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();

  res.json({ message: "User Registered Successfully!" });
});

router.post("/login", async (req, res) => {
  const recipe = RecipesModel.findById(req.body.recipeID);
  const usernumber = UserModel.findById(req.body.userID);
  console.log("userID_recipe.js_31", { usernumber, recipe });

  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user || user === null) {
    return res.status(400).send({ message: "User Doesn't exists!" });
  }
  //const isPasswordValid = await message.compare(password, user.password);
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .send({ message: "Username or Password Is Incorrect!" });
    // return res.status(401).send({
    //     accessToken: null,
    //     message: "Invalid Password!"
    // });
  }
  // loginin with correct user details
  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});

router.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
//export{ router as userRouter }
module.exports = router;
