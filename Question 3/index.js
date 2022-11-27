const express = require('express')
const app = express()
const PORT = 3000

const path = require('path')

app.use(express.static(path.join(__dirname, "public")));

app.route('/')
.get( (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(3000, () => {
    console.log("Server running at : " + PORT)
})