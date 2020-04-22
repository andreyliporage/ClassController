const fs = require("fs")
const data = require("../data.json")
const {age, graduation, date} = require("../utils")

exports.index = function(req, res) {  
    const foundStudents = data.students

    for (const student of foundStudents) {
        const subjects =  student.subjects.toString().split(",")
        student.subjects = subjects
    }

    return res.render('students/index', {students: foundStudents})    
}

exports.create = function(req, res) {
    return res.render('students/create')
}

exports.show = function(req, res) {
    const {id} = req.params

    const foundStudent = data.students.find(function(student) {
        return student.id == id
    })

    if(!foundStudent) return res.send("Student not found!")

    const student = {
        ...foundStudent,
        age: age(foundStudent.birth),
        graduation: graduation(foundStudent.graduation),
        subjects: foundStudent.subjects.toString().split(","),
        modalidade: foundStudent.modalidade,
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundStudent.created_at),
    }

    return res.render("students/show", {student})
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
    const id = Number(data.students.length + 1)

    data.students.push({
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

        return res.redirect("/students")
    })

    // return res.send(req.body)
}

exports.edit = function(req, res) {
    const {id} = req.params

    const foundStudent = data.students.find(function(student) {
        return student.id == id
    })

    if(!foundStudent) return res.send("Student not found!")

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth), 
    }    

    return res.render("students/edit", {student})
}

exports.put = function(req, res) {
    const {id} = req.body
    let index = 0

    const foundStudent = data.students.find(function(student, foundIndex) {
        if(student.id == id) {
            index = foundIndex
            return true
        }
    })

    if(!foundStudent) return res.send("Student not found!")

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.bith),
        id: Number(req.body.id),
    }

    data.students[index] = student

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write File error!")

        return res.redirect(`/students/${id}`)
    })

}

exports.delete = function(req, res) {
    const {id} = req.body

    const filteredStudents = data.students.filter(function(student) {
        return student.id != id
    })

    data.students = filteredStudents

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write File error!")

        return res.redirect("/students")
    })
}