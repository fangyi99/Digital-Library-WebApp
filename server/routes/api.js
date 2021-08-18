const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const Object = require('mongodb').Object;
require('dotenv').config();

//for sending emails via external api - mailgun
const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox776e6776e3a04a21ba5c6d123067847c.mailgun.org';
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });

//for password hashing
const bcrypt = require('bcryptjs');
const BCRYPT_SALT_ROUNDS = 12;

MongoClient.connect('mongodb+srv://admin:admin@project.azf5k.mongodb.net/project?retryWrites=true&w=majority', { useNewUrlParser: true }, (err, database) => {
    if (err) return console.log(err)
    db = database.db('project');
});

//login
router.route('/authuser').post(function(req, res2) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    db.collection('users').findOne({ "username": username }, {
        email: 1,
        password: 1,
        role: 1,
        _id: 0
    }, function(err, result) {
        if (result == null) res2.send([{ "auth": false }]);
        else {
            bcrypt.compare(password, result.password, function(err, res) {
                if (err || res == false) {
                    res2.send([{ "auth": false }]);
                } else {
                    var token = jwt.sign({ "user": result }, process.env.LOGIN_SECRET_KEY)
                    res2.send([{ "auth": true, "id": result._id, "role": result.role, "token": token }]);
                }
            });
        }
    });
});

//create new user
router.route('/reguser').post(function(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var role = req.body.role;
    bcrypt.hash(password, BCRYPT_SALT_ROUNDS, function(err, hash) {
        db.collection('users').insertOne({
            "username": username,
            "email": email,
            "password": hash,
            "role": role
        }, (err, result) => {
            if (err) return console.log(err);
            res.send(result);
        });
    });
})

//send reset password link to user 
router.put('/forgot-password', (req, res) => {
    var email = req.body.email;
    db.collection('users').findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: "User not registered." });
        }

        var id = user._id;
        var token = jwt.sign({ user: id }, process.env.RESET_PASSWORD_KEY, { expiresIn: '20m' });
        var data = {
            from: 'noreply@libnotes.com',
            to: email,
            subject: 'Reset your password',
            html: `
            <h2>Follow this link to reset your password.</h2>
            <p>http://localhost:4200/reset-password/${id}/${token}</p>
            `
        };

        mg.messages().send(data, function(error, body) {
            if (error) {
                return res.json({
                    error: err.message
                })
            }
            return res.json({ message: 'Reset password link has been sent to your email.' });
        });
    })
})

//reset password
router.put('/reset-password/:id/:token', (req, res) => {
    var id = req.params.id;
    var token = req.params.token;
    var password = req.body.password;

    if (token) {
        jwt.verify(token, process.env.RESET_PASSWORD_KEY, function(error, decodedData) {
            if (error) {
                return res.status(401).json({
                    error: "Token is invalid or expired."
                })
            }
            db.collection('users').findOne({ "_id": ObjectId(id) }, (err, user) => {
                if (err || !user) {
                    return res.status(400).json({ error: "User not registered." });
                }
                bcrypt.hash(password, BCRYPT_SALT_ROUNDS, function(err, hash) {
                    db.collection('users').updateOne({ "_id": ObjectId(id) }, {
                        $set: { 'password': hash }
                    }, (err, result) => {
                        if (err) return console.log(err);
                        res.send(result);
                    });
                });
            })
        })
    } else {
        return res.status(401).json({ error: "Authentication error!" });
    }
})

//get all users
router.get('/user', (req, res) => {
    db.collection('users').find({}).toArray()
        .then(results => {
            res.status(200).json(results);
        })
        .catch(error => {
            res.status(500).send(error);
        });
})

//get logged-in user data
router.get('/user/:id', (req, res) => {
    db.collection('users').findOne({ "_id": ObjectId(req.params.id) })
        .then(results => {
            res.status(200).json(results);
        })
        .catch(error => {
            res.status(500).send(error);
            console.error(error);
        });
})

//update logged-in user data
router.route('/user/:id').put(function(req, res) {
    var password = req.body.password;
    bcrypt.hash(password, BCRYPT_SALT_ROUNDS, function(err, hash) {
        db.collection('users').updateOne({ "_id": ObjectId(req.params.id) }, {
            $set: { "username": req.body.username, "email": req.body.email, 'password': hash }
        }, (err, result) => {
            if (err) return console.log(err);
            res.send(result);
        });
    });
})

//delete user
router.route('/user/:id').delete(function(req, res) {
    db.collection('users').deleteOne({ "_id": ObjectId(req.params.id) })
        .then(results => {
            res.status(200).json(results);
        })
        .catch(error => {
            res.status(500).send(error);
        });
})

//add bookmark
router.route('/bookmark/:userId/:bookId').post(function(req, res) {
    db.collection('users').updateOne({ "_id": ObjectId(req.params.userId) }, {
            $push: {
                "bookmarks": {
                    "_id": ObjectId(req.params.bookId),
                    "title": req.body.title,
                    "author": req.body.author,
                    "coverArt": req.body.coverArt,
                    "publisher": req.body.publisher,
                    "publicationDate": req.body.publicationDate,
                    "category": req.body.category,
                    "genre": req.body.genre,
                    "summary": req.body.summary,
                    "isbn": req.body.isbn,
                    "language": req.body.language,
                    "url": req.body.url
                }
            }
        })
        .then(results => {
            res.status(200).json(results);
        })
        .catch(error => {
            res.status(500).send(error);
        });
})

//delete bookmark
router.route('/bookmark/:userId/:bookId').delete(function(req, res) {
    db.collection('users').updateOne({ "_id": ObjectId(req.params.userId) }, { $pull: { "bookmarks": { "_id": ObjectId(req.params.bookId) } } })
        .then(results => {
            res.status(200).json(results);
        })
        .catch(error => {
            res.status(500).send(error);
        });
})

//get all e-resources
router.get('/book', (req, res) => {
    db.collection('e-resources').find({}).toArray()
        .then(results => {
            res.status(200).json(results);
        })
        .catch(error => {
            res.status(500).send(error);
        });
})

// get all e-resources based on selected category
router.get('/category/:category', (req, res) => {
    db.collection('e-resources').find({ "category": req.params.category }).toArray()
        .then(results => {
            res.status(200).json(results);
        })
        .catch(error => {
            res.status(500).send(error);
        });
})

//get a single e-resource
router.get('/book/:id', (req, res) => {
    db.collection('e-resources').findOne({ "_id": ObjectId(req.params.id) })
        .then(results => {
            res.status(200).json(results);
        })
        .catch(error => {
            res.status(500).send(error);
        });
})

//add e-resource
router.route('/book').post(function(req, res) {
    db.collection('e-resources').insertOne(req.body, (err, results) => {
        if (err) return console.log(err);
        res.send(results);
    })
})

//update e-resource
router.route('/book/:id').put(function(req, res) {
    db.collection('e-resources').updateOne({ "_id": ObjectId(req.params.id) }, {
        $set: {
            "title": req.body.title,
            "author": req.body.author,
            "publisher": req.body.author,
            "category": req.body.category,
            "isbn": req.body.isbn,
            "language": req.body.language,
            "summary": req.body.title
        }
    }, (err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
})

//delete e-resource
router.route('/book/:id').delete(function(req, res) {
    db.collection('e-resources').deleteOne({ "_id": ObjectId(req.params.id) })
        .then(results => {
            res.status(200).json(results);
        })
        .catch(error => {
            res.status(500).send(error);
        });
})

//view feedbacks
router.get('/feedback', (req, res) => {
    db.collection('feedbacks').find({}).toArray()
        .then(results => {
            res.status(200).json(results);
        })
        .catch(error => {
            res.status(500).send(error);
        });
})

//post feedback
router.route('/feedback').post(function(req, res) {
    db.collection('feedbacks').insertOne(req.body, (err, results) => {
        if (err) return console.log(err);
        res.send(results);
    })
})

//delete feedback
router.route('/feedback/:id').delete(function(req, res) {
    db.collection('feedbacks').deleteOne({ "_id": ObjectId(req.params.id) })
        .then(results => {
            res.status(200).json(results);
        })
        .catch(error => {
            res.status(500).send(error);
        });
})



module.exports = router;