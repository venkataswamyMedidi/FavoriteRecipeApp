const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserModel = require('../models/User.js');
// const Router = require('express');


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
    const user = await UserModel.findOne({ username })

    if (user) {
        return res.json({ message: "User already exists!" })
    }

    //const hashedPassword = await message.hash(password, 10);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword })
    await newUser.save()

    res.json({ message: "User Registered Successfully!" })
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username })

    if (!user) {
        return res.json({ message: "User Doesn't exists!" })
    }
    //const isPasswordValid = await message.compare(password, user.password);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.json({ message: "Username or Password Is Incorrect!" })
    }
    // loginin with correct user details
    const token = jwt.sign({ id: user._id }, "secret")
    res.json({ token, userID: user._id })
});
//export{ router as userRouter }
module.exports = router 