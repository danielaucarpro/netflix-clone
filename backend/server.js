//importing core modules
const express = require('express');
//mongo db
const mongo = require('mongodb');
const mongoClient = require('mongodb').MongoClient;
//basic auth
const basicAuth = require('express-basic-auth');
//cors
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

//multiple routes do GET data and send to frontend

//CRUD = create, read, update and delete

app.get('/', (req, res, next) => {
    res.send('Autorized');
});

//basic auth
app.put('/login', (req, res, next) => {
    // console.log(req);
    let email = 'daniel@email.com';
    let password = 'daniel123';
    login(email, password);
});

//first value is alway userName and second value is the password
const login = (email, password) => {
    app.use(basicAuth(email, password)({
        admin: { 'admin': 'password' }, // this is doing htttp//:admin:password@localhost:4000
        newUser: { email: password },
        authorizeAsync: true,
        unauthorizedResponse: () => {
            return "ERROR! Check your user name and your password.";
        },
        authorizer: (email, password) => {
            let _userName = email;
            let _password = password;

            /*just checking with dummy variables, if basic auth is working
            later will have to chenge to use the params in this authorizer function*/
            const userMatches = basicAuth.safeCompare(email, _userName);
            const passwordMatches = basicAuth.safeCompare(password, _password);

            if (userMatches && passwordMatches) {
                return userMatches & passwordMatches;
            }
        }
    }))
}

//invalid a login user
app.put('/unsubscribe', (req, res, next) => {
    res.send('Ok');
});

//deleting user
const unsubscribe = (email, password) => {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("users");
        var myquery = { email: email, password: password };
        //check if the info match
        login(myquery.email, myquery.password);
        dbo.collection("users").deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          console.log("User deleted!");
          db.close();
        });
      });
}

//here the req will have some data
app.put('/planform', (req, res, next) => {
    console.log(req);
    res.send('Ok');
});

//SING UP A NEW USER PAGE
app.get('/register', (req, res) => {
    /*dummy test to test the code
    change for real dat, getting from the req param*/
    let email = 'daniel@email.com';
    let password = 'daniel123';
    let plan = 'premium';
    let creditCard = '1234 1234 1234 1234';

    registerUser(email, password, plan, creditCard);

})

//registring new users from my site.
const registerUser = (email = undefined, password = undefined, plan = undefined, creditCard = undefined) => {
    mongoClient.connect(url, function (err, db) {
        if (err) console.log(err);
        var usersDb = db.db("user");
        usersDb.createCollection("users", function (err, res) {
            if (err) throw err;
            console.log("Collection created!");
        });

        let myNewUser = { email: email, userName: email, password: password, plan: plan, payMethod: creditCard };
        usersDb.collection('users').insertOne(myNewUser, (err, res) => {
            if (err) console.log(err);
            else {
                console.log('Resgister one user!');
            }
        })

        db.close();
    });
}

//FORGOT PASSWORD PAGE
app.get('/loginHelp', (req, res, next) => {
    // console.log(req);
    /*dummy test to test the code
    change for real dat, getting from the req param*/
    let email = 'daniel@email.com';
    loginHelp(email);
});

//finding users so we can change password later
const loginHelp = (email = undefined) => {
    mongoClient.connect(url, function (err, db) {
        if (err) console.log(err);
        var usersDb = db.db("user");
        usersDb.collection('users').findOne({ email }, (err, result) => {
            if (err) console.log(err);
            //returning result for now, later I need to make the reset password steps.
            // return result
            //send email
            //send res with old and new password, and code to valid

            //updating the password.
            updatePassword(oldPassword, newPassword);
        })

        db.close();
    });
}

//updating password
const updatePassword = (oldPassword, newPassword) => {
    mongoClient.connect(url, function (err, db, oldPassword, newPassword) {
        if (err) console.log(err);
        var userDB = db.db("users");
        var myquery = { password: oldPassword };
        var newvalues = { $set: { password: newPassword } };
        userDB.collection("users").updateOne(myquery, newvalues, function (err, res) {
            if (err) console.log(err);
            console.log("Password updated!");
            db.close();
        });
    });
}

const port = 4000;
app.listen(port);