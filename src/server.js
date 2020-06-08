const express = require("express")
const server = express()


//Pegar o banco de dados

const db = require("./database/db.js")


//Pasta publica
server.use(express.static("public"))

//Template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

server.get("/", (req,res) => {
    return res.render("index.html")
})

server.get("/create-point", (req,res) => {
    return res.render("create-point.html")
})

server.get("/search", (req,res) => {

    db.all(`SELECT * FROM places`, function(err, rows){
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        console.log("Aqui estão seus registros")
        console.log(rows)

        return res.render("search-results.html", {places: rows, total: total} )
    }) 
})

server.listen(3000)

