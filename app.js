const express = require('express')
const app = express()
const PORT = 3000
const path = require("path")
var fs = require('fs'); 
const http = require('http');

app.set('view engine','ejs')

let assetsDir = path.join(__dirname,"assets")
app.use('/assets',express.static(assetsDir))

app.use('/js',express.static(path.join(__dirname,"/views/")))

app.use(express.urlencoded({ extended: true }))


app.use('/',require('./routes/student'))

app.use('/admin',require('./routes/admin'))

const server = app.listen(PORT, function () {
    console.log("E-CERT Status [OK]\nOpen a browser to http://localhost:" + PORT+"/");
});
