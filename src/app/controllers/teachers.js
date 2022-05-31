const { age, graduation, date } = require("../../lib/utils")
const Teacher = require("../models/Teacher")

module.exports = {
    redirect(req,res) {
        return res.redirect("teachers")
    },
    index(req, res) {
        Teacher.all(teachers => {
            return res.render("teachers/index", {teachers})
        })
    },
    create(req, res) {
        return res.render("teachers/create")
    },
    post(req, res) {
        const keys = Object.keys(req.body)
    
        for(let key of keys) {
            if(req.body[key] == "") {
                return res.send("Please, fill all fields!")
            }
        }

        Teacher.create(req.body, teacher => {
            return res.redirect(`/teachers/${teacher.id}`)
        })
    },
    show(req, res) {
        const id = req.params.id

        Teacher.find(id, results => {
            const { birth_date, created_at } = results

            
            const teacher = {
                ...results,
                birth_date: age(birth_date),
                created_at: date(created_at).iso,
                subjects_taugth: results.subjects_taught.split(",")
            }

            return res.render("teachers/show", {teacher})
        })
    },
    edit(req, res) {
        const id = req.params.id
        Teacher.find(id, teacher => {
            teacher.birth_date = date(teacher.birth_date).iso

            return res.render("teachers/edit", {teacher})
        })
    },
    put(req, res) {
        Teacher.update(req.body, id => {
            return res.redirect(`/teachers/${id}`)
        })
    },
    delete(req, res) {
        Teacher.delete(req.body.id, () => {
            return res.redirect("/teachers")
        })
    }
}