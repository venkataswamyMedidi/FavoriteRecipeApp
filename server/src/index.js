
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
const process = require('process');



// app.use(cors({
//     credentials: true,
//     origin: ['http://localhost:3000/'],
//     optionSuccessStatus: 200,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// }))


// app.use(function (req, res, next) {
//     //res.header('Access-Control-Allow-Origin', req.header('origin'));
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//     //header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
//     //res.header({'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'})
//     //res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
//     next();
// });

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

process.on('warning', (warning) => {
    console.log("warning", warning.stack);
});

// app.get('*', (req, res) => {
//     res.send('Server Started!')
// })

app.use(express.static(path.join(__dirname, "../../client/build")))

app.get("*", (res, req) => {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"))
})

//app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))

app.listen(process.env.PORT || 3001, () => {
    console.log("Server running on port")
})