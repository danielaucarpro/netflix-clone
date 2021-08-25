const express = require('express');
const basicAuth = require('express-basic-auth');
var cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json);

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

        if(userMatches && passwordMatches){
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

//multiple routes do GET data and send to frontend

//CRUD = create, read, update and delete

const port = 4000;
app.listen(port);