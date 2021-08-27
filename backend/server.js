//importing core modules
const express = require('express');
//basic auth
const basicAuth = require('express-basic-auth');
//mongo db
const mongo = require('mongodb');
const mongoClient = require('mongodb').MongoClient;
//cors
let cors = require('cors');

//const variable with the mondb url
const url = "mongodb://localhost:27017/";

const app = express();

//fixing cors (Cross-Origin Resource Sharing) problem.
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

//creating a collection of users
mongoClient.connect(url, function (err, db) {
    if (err) console.log(err);
    var usersDb = db.db("user");
    usersDb.createCollection("users", function (err, res) {
        if (err) throw err;
        console.log("Collection created!");
    });
});

/*multiple routes to GET data and send to frontend
and doing a basic CRUD = create, read, update and delete with mongodb*/

//=====LOGIN ROUTE=====
app.put('/login', (req, res, next) => {
    // console.log(req);
    let email = 'daniel@email.com';
    let password = 'daniel123';
    login(email, password);
});

//for this code I will only need email and password to login
const login = (email, password) => {
    /*basic auth
    chechking if the user is authorized to login*/
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

//deleting route
app.get('/unsubscribe', (req, res, next) => {
    res.send('Ok');
    unsubscribe(email, password);
});

//deleting user
const unsubscribe = (email, password) => {
    mongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("users");
        var myquery = { email: email, password: password };

        /*check if the info match with the dabase
        and the user is authorized to delete.*/
        login(myquery.email, myquery.password);

        dbo.collection("users").deleteOne(myquery, function (err, obj) {
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

//registring new users for my site.
const registerUser = (email = undefined, password = undefined, plan = undefined, creditCard = undefined) => {
    //I need to check with the dabase if the users exist
    mongoClient.connect(url, function (err, db) {
        if (err) console.log(err);
        var usersDb = db.db("user");
        usersDb.collection('users').findOne({ email }, (err, result) => {
            if (err) console.log(err);
            if (result === email) {
                //send email
                alert('ERROR! Email already exist, please try a different email!')
                //send res with old and new password, and code to valid
                db.close();
            } else {
                mongoClient.connect(url, function (err, db) {
                    if (err) console.log(err);
                    var usersDb = db.db("user");
                    let myNewUser = { email: email, userName: email, password: password, plan: plan, payMethod: creditCard };
                    usersDb.collection('users').insertOne(myNewUser, (err, res) => {
                        if (err) console.log(err);
                        else {
                            alert('Success! Now you have access to more than 100.000 of movies! Have fun!');
                        }
                    })

                    db.close();
                });
            }
        })
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

app.put('/loginHelp', (req, res, next) => {
    // console.log(req);
    /*dummy test to test the code
    change for real dat, getting from the req param*/
    let oldPassword = 'daniel123';
    let newPassword = 'daniel123';
    //updating the password.
    updatePassword(oldPassword, newPassword)
});

//finding users so we can change password later
const loginHelp = (email = undefined) => {
    mongoClient.connect(url, function (err, db) {
        if (err) console.log(err);
        var usersDb = db.db("user");
        usersDb.collection('users').findOne({ email }, (err, result) => {
            if (err) console.log(err);
            if (result === email) {
                //send email
                alert('Success! We found your email, we sent an email with further information, please check your mailbox!')
                //send res with old and new password, and code to valid
            } else {
                alert("Sorry, email nout found! Please check spelling and try again.")
            }
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
        var newValues = { $set: { password: newPassword } };

        //check if the old password is equal to the new one
        if (oldPassword === newValues.$set.password) {
            alert("ERROR! Your old password is matching, please create a new one")
        } else {
            userDB.collection("users").updateOne(myquery.password, newvalues, function (err, res) {
                if (err) console.log(err);
                console.log("Password updated!");
                db.close();
            });
        }
    });
}

const port = 4000;
app.listen(port);