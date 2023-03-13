
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const path = require('path')
const apiPort = 3001
const userRouter = require('./route/user')
const recipesRouter = require('./route/recipes')
require('dotenv').config()


const mongoose = require('mongoose')
const db = mongoose.connection

mongoose.connect("mongodb+srv://venkat:swamy@recipecluster1.txqo0vw.mongodb.net/recipes?retryWrites=true&w=majority")
//mongodb+srv://venkat:swamy@recipecluster1.txqo0vw.mongodb.net/test

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
app.use("/auth", userRouter)
app.use("/recipes", recipesRouter)

// app.use(express.static(path.join(__dirname, "../../client/build")))

// app.get("*", (res, req) => {
//     res.sendFile(path.join(__dirname, "../../client/build/index.html"))
// })

app.get('/', (req, res) => {
    res.send('Server Started!')
})

//app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))

app.listen(process.env.PORT || 3001, () => {
    console.log("Server running on port")
})