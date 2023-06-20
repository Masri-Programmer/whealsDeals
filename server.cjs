// React + Node.js + Express + MySQL 
const express = require('express');
const mysql = require('mysql');

const app = express();

// create a connection to your MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'wheelsdeals'
});

// connect to your database
connection.connect();

// create an API endpoint to retrieve cars
app.get('/api/cars', (req, res) => {
    const query = 'SELECT * FROM cars';
    connection.query(query, (error, results, fields) => {
        if (error) throw error;
        res.send(results);
    });
});
app.get('/api/users', (req, res) => {
    const query = 'SELECT * FROM users';
    connection.query(query, (error, results, fields) => {
        if (error) throw error;
        res.send(results);
    });
});

// start the server
app.listen(3005, () => {
    console.log('Server started on port 3005');
});
