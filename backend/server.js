const express = require('express');
var cors = require('cors');

// const basicAuth = require('express-basic-auth');

const app = express();
app.use(cors());

let db_Users =[{testUser: 'admin', password:'ok123'}]

// app.use(basicAuth({
        // users: { db_Users[0].testUser: db_Users[0].password }
// }))

app.get('/', (req, res, next) => {
    res.send('Ok');
});

app.put('/login', (req, res, next) => {
    res.send('Ok');
});

app.put('/logout', (req, res, next) => {
    res.send('Ok');
});

//here the req will have some data
app.put('/register', (req, res, next) => {
    console.log(req);
    res.send('Ok');
});

const port = 4000;
app.listen(port);