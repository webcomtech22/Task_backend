const mysql = require('mysql2')

//create connection
const connection = mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"##mani$$1954",
    database: "baseStructure"
})

//open my sql connection
connection.connect(error =>{
    if(error) throw error;
    console.log("Database connected successfully...")
})

module.exports = connection;