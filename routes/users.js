let express = require('express');
let router = express.Router();
var passport = require("passport");
let User = require('../models/UserSchema')
const jsonwt = require("jsonwebtoken");
var bcrypt = require('bcrypt');
var checkToken = require('../middlewares/token-checker')
var getId = require('../validation-functions/get-id');
var Class = require('../models/ClassSchema')

router.post("/signup", async (req, res) => {
    let tutor = false;
    if (req.body.isTutor === 'true') {
        tutor = true;
    }
    var newUser = new User({
        email: req.body.email,
        password: req.body.password,
        isTutor: tutor,
        fullname: req.body.fullname
    });

    await User.findOne({email: newUser.email})
        .then(async profile => {
            console.log(profile);
            if (!profile) {
                bcrypt.hash(newUser.password, Math.random(), async (err, hash) => {
                    if (err) {
                        console.log("Error is", err.message);
                    } else {
                        newUser.password = hash;
                        console.log("hashed : ", hash);
                        await newUser
                            .save()
                            .then(() => {
                                res.sendStatus(200);
                            })
                            .catch(err => {
                                console.log("Error is ", err.message);
                            });
                    }
                });
            } else {
                res.status(403).send("User already exists...");
            }
        })
        .catch(err => {
            console.log("Error is", err.message);
        });
});

router.post("/signin", async (req, res) => {
    var newUser = {};
    newUser.email = req.body.email;
    newUser.password = req.body.password;

    await User.findOne({email: newUser.email})
        .then(profile => {
            if (!profile) {
                res.status(404).send("User not exist");
            } else {
                bcrypt.compare(
                    newUser.password,
                    profile.password,
                    async (err, result) => {
                        if (err) {
                            console.log("Error is", err.message);
                        } else if (result === true) {
                            const payload = {
                                id: profile.id,
                                email: profile.email
                            };
                            jsonwt.sign(
                                payload,
                                process.env.MY_SECRET_KEY,
                                {expiresIn: 36000},
                                (err, token) => {
                                    if (err) {
                                        console.log("Error is ", err.message);
                                    }
                                    res.json({
                                        success: true,
                                        access_token: token
                                    });
                                }
                            );
                        } else {
                            res.status(401).send("User Unauthorized Access");
                        }
                    }
                );
            }
        })
        .catch(err => {
            console.log("Error is ", err.message);
        });
});

router.post('/resetpassword', async (req, res) => {

})

router.get('/me', function (req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({auth: false, message: 'No token provided.'});
    jsonwt.verify(token, process.env.MY_SECRET_KEY, function (err, decoded) {
        if (err) return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});

        res.status(200).send(decoded);
    });
});

router.post('/reset', (req, res) => {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: 'abcd@gmail.com', // Change to your recipient
        from: 'classorganizer@blackarcx.com', // Change to your verified sender
        subject: 'subject',
        text: 'b',
        html: '<strong>html here   </strong>',
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
            res.send(200);
        })
        .catch((error) => {
            res.send(400);
            console.error(error)
        })
})

router.get(
    "/profile",
    passport.authenticate("jwt", {session: false}),
    (req, res) => {
        res.send({
            id: req.user.id,
            username: req.user.username
        });
    }
);


router.get("/me/profile", checkToken, async (req, res) => {
    User.findById((getId(req.token))).then(user => {
        user = {
            "_id": user._id,
            "email": user.email,
            "isTutor": user.isTutor,
            "fullname": user.fullname,
        }
        res.send(user);
    }).catch(err => {
        res.sendStatus(404)
    })
});

router.post('/classes', checkToken, async (req,res) => {
    let userid = getId(req.token);
    User.findById(userid).then(user => {
        user.classes.push(req.body.class_id);
        user.save().then(() => {
            res.sendStatus(200)
        }).catch((err) => {
            console.log(err);
            res.sendStatus(409);
        });
    }).catch(err => {
        res.sendStatus(404);
    })
})

module.exports = router;
