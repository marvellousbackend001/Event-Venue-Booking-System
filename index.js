const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();
app.use(cors());
/****************connecting to  mysql************************* */
const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "CHIDERA001?.1",
    database: "venue_bookings",
    port: "3306",
});
// creating an endpoint for registration
app.post("/register", bodyParser.json(), function (req, res) {
    var { username, email, password } = req.body;
    var sql = `INSERT INTO users (username, email, password) VALUES (?,?,?)`;
    con.query(sql, [username, email, password], function (err, result) {
        if (err) throw err;
        res.send(result)
    });
})
//creating an endpoint for login
app.get("/login", bodyParser.json(), function (req, res) {
    var sql = `SELECT * FROM users WHERE email ='${req.body.email}'AND password ='${req.body.password}' `;
    con.query(sql, function (err, result) {
        if (err) throw err
        res.send(result);
    });
})
// creating an endpoint for adding a venue 
app.post("/venues", bodyParser.json(), function (req, res) {
    var { name, location, capacity, facilities, pricing } = req.body;
    var sql = `INSERT INTO venues (name, location, capacity, facilities, pricing) VALUES (?,?,?,?,?)`;
    con.query(sql, [name, location, capacity, facilities, pricing], function (err, result) {
        if (err) throw err;
        res.send(result);
    });
})
//creating an endpoint for updating a venue by id
app.put("/venues/:id", bodyParser.json(), function (req, res) {
    const { id } = req.params;
    const { name, location, capacity, facilities, pricing } = req.body;
    const sql = 'UPDATE venues SET name = ?, location = ?, capacity = ?, facilities = ?, pricing = ? WHERE id = ?';
    con.query(sql, [name, location, capacity, facilities, pricing, id], function (err, result) {
        if (err) throw err;
        res.send(result);
        message: 'Venue updated successfully'
    });
});
// creating an endpoint for deleting a venue by id
app.delete('/venues/:id', bodyParser.json(), function (req, res) {
    var { id } = req.params;
    var sql = 'DELETE FROM venues WHERE id = ?';
    con.query(sql, [id], function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});
app.listen(8080),
    console.log("greate job marvellous!!!... your server is running")