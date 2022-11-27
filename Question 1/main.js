const express = require('express')
const path = require('path')
const app = express()
const port = 3000;

const searchCafes = require(__dirname + '/searchCafes.js')

app.route('/')
.get((req, res) => {
    try{
        res.sendFile(path.join(__dirname, '/index.html'))
    }
    catch{
        console.log("Error: HomePage Render Error")
    }
})

app.route('/searchCafe')
.get((req, res) => {
    try{
        const searchedCafe = req.query.cafeName;
        const cafeResults = searchCafes(searchedCafe)
        res.send(cafeResults)
    }
    catch{
        console.log("Error: SearchCafe Page Error")
    }
})

app.get('*', (req, res) => {
    try{
        res.send("Page Not Found!")
    }
    catch{
        console.log("Error: Route Not Found")
    }
})

app.listen(port, function(){
    console.log("Server running at "+port)
})