const fs = require("fs")
const data = require("./data.json")
const {age, graduation, date} = require("./utils")

exports.show = function(req, res) {
    const {id} = req.params

    const foundTeacher = data.teachers.find(function(teacher) {
        return teacher.id == id
    })

    if(!foundTeacher) return res.send("Teacher not found!")

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        graduation: graduation(foundTeacher.graduation),
        subjects: foundTeacher.subjects.split(","),
        modalidade: foundTeacher.modalidade,
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at),
    }

    return res.render("teachers/show", {teacher})
}

exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    for (let key of keys) {
        if (req.body[key] == "") {
            return res.send("Preencha todos os campos.")
        }
    }

    let {avatar_url, name, birth, graduation, modalidade, subjects} = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.teachers.length + 1)

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        graduation,
        modalidade,
        created_at,
        subjects,
    })

    // Lembrar que: desse jeito apagará tudo no arquivo. Ficará sempre só 1 dado
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {

        if(err) return res.send("Write File error!")

        return res.redirect("/teachers")
    })

    // return res.send(req.body)
}

exports.edit = function(req, res) {
    const {id} = req.params

    const foundTeacher = data.teachers.find(function(teacher) {
        return teacher.id == id
    })

    if(!foundTeacher) return res.send("Teacher not found!")

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth), 
    }    

    return res.render("teachers/edit", {teacher})
}