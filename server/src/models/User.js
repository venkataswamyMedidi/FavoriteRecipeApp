const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }]
})

//export const UserModel = mongoose.model("users", UserSchema)

module.exports = mongoose.model("users", UserSchema)