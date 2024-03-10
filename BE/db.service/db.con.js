const mysql = require("mysql2/promise");
const sql = require("./queries");

// DATABASE CREATION ALONG WITH ALL THE TABLES
async function createDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
        });

        // CREATE THE DATABASE IF IT DOESN'T EXIST
        await connection.query(sql.CREATE_DATABASE);
        console.log("Database created or already exists");

        // Switch to the newly created or existing database
        await connection.query("USE aiit_test");

        // Array of table creation queries
        const tableCreationQueries = [
            sql.CREATE_TABLE_USERS,
        ];

        // Iterate over the array and create each table
        for (const tableQuery of tableCreationQueries) {
            await connection.query(tableQuery);
        }
        console.log("All Tables created or already exists");

        await connection.end();
    } catch (error) {
        console.error("Error creating database or tables:", error.message);
    }
}

// Connection pool module
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "aiit_test",
});

module.exports = { createDatabase, pool };
