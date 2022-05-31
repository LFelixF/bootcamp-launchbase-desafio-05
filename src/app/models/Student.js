const database = require("../../config/db")
const { grade } = require("../../lib/utils")

module.exports = {
    all(callback) {
        database.query(`SELECT * FROM students`, (err, results) => {
            if(err) throw `Database error! ${err}`

            callback(results.rows)
        })
    },
    create(object, callback) {
        const query = `INSERT INTO students(
            avatar_url,
            name,
            email,
            birth_date,
            school_year,
            workload
        ) VALUES($1, $2, $3, $4, $5, $6)
        RETURNING id`

        const values = [
            object.avatar_url,
            object.name,
            object.email,
            object.birth,
            object.select,
            object.hours
        ]

        database.query(query, values, (err, results) => {
            if(err) throw `Database error! ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback) {
        database.query(`SELECT * FROM students WHERE id = ${id}`, (err, results) => {
            if(err) throw `Database error! ${err}`

            callback(results.rows[0])
        })
    },
    update(object, callback) {
        const query = `UPDATE students SET
            avatar_url = $1,
            name = $2,
            email = $3,
            birth_date = $4,
            school_year = $5,
            workload = $6
        WHERE id = ${object.id}`

        const values = [
            object.avatar_url,
            object.name,
            object.email,
            object.birth,
            object.select,
            object.hours
        ]

        database.query(query, values, (err, results) => {
            if(err) throw `Database error! ${err}`

            callback()
        })
    },
    delete(id, callback) {
        database.query(`DELETE FROM students WHERE id = ${id}`, (err, results) => {
            if(err) throw `Database error! ${err}`

            callback()
        })
    }
}