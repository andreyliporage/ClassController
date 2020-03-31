const express = require("express")//permite pegar arquivos js externos
const nunjucks = require("nunjucks")
const routes = require("./routes")

const server = express()

server.use(express.urlencoded({extended: true}))
server.use(express.static("public"))
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("views", {//"caminho - pasta"
    express:server,//qual dependencia vai usar e sua constante 
    noCache: true,
    autoescape: false
})

server.listen(3333, function() {//callback é uma função dentro de outra função
    console.log("server is running")
})