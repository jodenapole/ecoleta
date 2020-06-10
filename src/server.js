const express = require("express")
const server = express()

//configurar pasta publica
server.use(express.static("public"))

//utilizando template engines
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//configurar caminhos da aplicação

//página inicial
//req --> requisiçao
//res --> resposta
server.get("/", (req, res) => {
   return res.render("index.html", { title: "um titulo"})
})

server.get("/create-point", (req, res) => {
   return res.render("create-point.html")
})

server.get("/search-results", (req, res) => {
    return res.render("search-results.html")
 })

//Ligar o servidor
server.listen(3000)