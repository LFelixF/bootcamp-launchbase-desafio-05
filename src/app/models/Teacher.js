const database = require("../../config/db")
const { date, graduation, age } = require("../../lib/utils")
const teachers = require("../controllers/teachers")

module.exports = {
    all(callback) {
        database.query("SELECT * FROM teachers ORDER BY name", (err, results) => {
            if(err) throw `Database error! ${err}`

            const teachers = []

            for(let row of results.rows) {
                let { subjects_taught } = row

                teachers.push({
                    ...row,
                    subjects_taught: subjects_taught.split(",")
                })
            }

            callback(teachers)
        })
    },
    create(object, callback) {
        const query = `INSERT INTO teachers(
            avatar_url,
            name,
            birth_date,
            education_level,
            class_type,
            subjects_taught,
            created_at
        ) VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING id`

        const values = [
            object.avatar_url,
            object.name,
            object.birth,
            graduation(object.select),
            object.location,
            object.services,
            date(Date.now()).iso
        ]

        database.query(query, values, (err, results) => {
            if(err) throw `Database error! ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback) {
        database.query(`SELECT * FROM teachers WHERE id = ${id}`, (err, results) => {
            if(err) throw `Database error! ${err}`
            
            callback(results.rows[0])
        })
    },
    update(object, callback) {
        const query = `UPDATE teachers SET
            avatar_url = $1,
            name = $2,
            birth_date = $3,
            education_level = $4,
            class_type = $5,
            subjects_taught = $6
        WHERE id = ${object.id}`

        const values = [
            object.avatar_url,
            object.name,
            object.birth,
            graduation(object.select),
            object.location,
            object.services
        ]

        database.query(query, values, (err, results) => {
            if(err) throw `Database error! ${err}`

            callback(object.id)
        })
    },
    delete(id, callback) {
        database.query(`DELETE FROM teachers WHERE id = ${id}`, (err, results) => {
            if(err) throw `Database error! ${err}`

            callback()
        })
    }
}