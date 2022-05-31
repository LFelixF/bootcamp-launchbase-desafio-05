const { grade, date } = require("../../lib/utils")
const Student = require("../models/Student")

module.exports = {
    index(req, res) {
        Student.all(results => {
            const students = []

            for(let element of results) {
                let {school_year} = element

                students.push({
                    ...element,
                    school_year: grade(school_year)
                })
            }
            
            return res.render("students/index", {students})
        })
    },
    create(req, res) {
        return res.render("students/create")
    },
    post(req, res) {
        const keys = Object.keys(req.body)
    
        for(let key of keys) {
            if(req.body[key] == "") {
                return res.send("Please, fill all fields!")
            }
        }

        Student.create(req.body, student => {
            return res.redirect(`/students/${student.id}`)
        })
    },
    show(req, res) {
        Student.find(req.params.id, result => {
            const {birth_date, school_year} = result

            const student = {
                ...result,
                birth_date: date(birth_date).birthDay,
                school_year: grade(school_year)
            }

            return res.render("students/show", {student})
        })
    },
    edit(req, res) {
        Student.find(req.params.id, result => {
            const {birth_date} = result

            const student = {
                ...result,
                birth_date: date(birth_date).iso
            }

            return res.render("students/edit", {student})
        })
    },
    put(req, res) {
        Student.update(req.body, () => {
            return res.redirect(`/students/${req.body.id}`)
        })
    },
    delete(req, res) {
        Student.delete(req.body.id, () => {
            return res.redirect("/students")
        })
    }
}