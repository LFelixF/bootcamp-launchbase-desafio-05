const { Pool } = require("pg")

module.exports = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "42173284",
    database: "my_teacher"
})