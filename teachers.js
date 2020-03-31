const fs = require("fs")
const data = require("./data.json")

exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    for (let key of keys) {
        if (req.body[key] == "") {
            return res.send("Preencha todos os campos.")
        }
    }

    data.teachers.push(req.body)

    // Lembrar que: desse jeito apagará tudo no arquivo. Ficará sempre só 1 dado
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {

        if(err) return res.send("Write File error!")

        return res.redirect("/teachers")
    })

    // return res.send(req.body)
}