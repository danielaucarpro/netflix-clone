const express = require('express');
const mongo = require('mongodb');
const mongoClient = require('mongodb').MongoClient;
const basicAuth = require('express-basic-auth');
var cors = require('cors');

const url = "mongodb://localhost:27017/";

const app = express();

app.use(cors());
app.use(express.json);

//connecting with database
mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    console.log('Database is connect!')
    db.close();
    console.log('Database is now closed!')
});

//creating a collection -movies
mongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var movieDb = db.db("myMovieDb");
    movieDb.createCollection("movies", function (err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});
//users
// mongoClient.connect(url, function (err, db) {
//     if (err) console.log(err);
//     var usersDb = db.db("user");
//     usersDb.createCollection("users", function (err, res) {
//         if (err) throw err;
//         console.log("Collection created!");
//         db.close();
//     });
// });
//banned users
mongoClient.connect(url, function (err, db) {
    if (err) console.log(err);
    var bannedUserDb = db.db("myMovieDb");
    bannedUserDb.createCollection("bannedUsers", function (err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});

//first value is alway userName and second value is the password
app.use(basicAuth({
    users: { 'admin': 'password' }, // this is doing htttp//:admin:password@localhost:4000
    authorizeAsync: true,
    unauthorizedResponse: () => {
        return "ERROR! Check your user name and your password.";
    },
    authorizer: (userName, password) => {
        let _userName = 'admin';
        let _password = 'password';

        const userMatches = basicAuth.safeCompare(userName, _userName);
        const passwordMatches = basicAuth.safeCompare(password, _password);

        if (userMatches && passwordMatches) {
            return userMatches & passwordMatches;
        }
    }
}))

app.get('/', (req, res, next) => {
    res.send('Autorized');
});

//basic auth
app.put('/login', (req, res, next) => {
    console.log(req);
    res.send('You put some login info' + req.body);
});

//invalid a login user
app.put('/logout', (req, res, next) => {
    res.send('Ok');
});

//here the req will have some data
app.put('/planform', (req, res, next) => {
    console.log(req);
    res.send('Ok');
});

app.get('/testNames', (req, res, next) => {
    // console.log(req);
    res.send({ 'admin': 'password' });
});

app.get('/registerUser', (req, res) => {
    let email = 'daniel@email.com';
    let user = 'daniel';
    let password = 'daniel123';

    registerUser(email, user, password);

})

const registerUser = (email = undefined, user = undefined, password = undefined) => {
    mongoClient.connect(url, function (err, db) {
        if (err) console.log(err);
        var usersDb = db.db("user");
        usersDb.createCollection("users", function (err, res) {
            if (err) throw err;
            console.log("Collection created!");
        });

        let myObj = { email: email, userName: user, password: password };
        usersDb.collection('users').insertOne(myObj, (err, res) => {
            if (err) console.log(err);
            else {
                console.log('Resgister one user!');
            }
        })

        db.close();
    });
}

//use find
const loginUser = (email = undefined, user = undefined, password = undefined) => {
    mongoClient.connect(url, function (err, db) {
        if (err) console.log(err);
        var usersDb = db.db("user");
        usersDb.createCollection("users", function (err, res) {
            if (err) throw err;
            console.log("Collection created!");
        });

        let myObj = { email: email, userName: user, password: password };
        usersDb.collection('users').insertOne(myObj, (err, res) => {
            if (err) console.log(err);
            else {
                console.log('Resgister one user!');
            }
        })

        db.close();
    });
}

//multiple routes do GET data and send to frontend

//CRUD = create, read, update and delete

const port = 4000;
app.listen(port);