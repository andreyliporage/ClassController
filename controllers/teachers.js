const fs = require("fs")
const data = require("../data.json")
const {age, graduation, date} = require("../utils")

exports.index = function(req, res) {  
    const foundTeachers = data.teachers

    for (const teacher of foundTeachers) {
        const subjects =  teacher.subjects.toString().split(",")
        teacher.subjects = subjects
    }

    return res.render('teachers/index', {teachers: foundTeachers})    
}

exports.create = function(req, res) {
    return res.render('teachers/create')
}

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
        subjects: foundTeacher.subjects.toString().split(","),
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

exports.put = function(req, res) {
    const {id} = req.body
    let index = 0

    const foundTeacher = data.teachers.find(function(teacher, foundIndex) {
        if(teacher.id == id) {
            index = foundIndex
            return true
        }
    })

    if(!foundTeacher) return res.send("Teacher not found!")

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.bith),
        id: Number(req.body.id),
    }

    data.teachers[index] = teacher

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write File error!")

        return res.redirect(`/teachers/${id}`)
    })

}

exports.delete = function(req, res) {
    const {id} = req.body

    const filteredTeachers = data.teachers.filter(function(teacher) {
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write File error!")

        return res.redirect("/teachers")
    })
}