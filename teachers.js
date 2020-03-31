const fs = require('fs')

exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    for (let key of keys) {
        if (req.body[key] == "") {
            return res.send("Preencha todos os campos.")
        }
    }
    
    fs.writeFile("data.json", JSON.stringify(req.body), function(err) {
        if (err) return res.send("Write File error!")

        return res.redirect("/teachers")
    })

    // return res.send(req.body)
}