let checkToken = require('../middlewares/token-checker')

let express = require('express');
let router = express.Router();
let Class = require('../models/ClassSchema');
let User = require('../models/UserSchema')
let getId = require('../validation-functions/get-id');
const isTutor = require('../middlewares/is-tutor');
const isStudent = require('../middlewares/is-student')

// add new class
router.post('/', checkToken, isTutor, async (req, res) => {
    if (!req.tutor) {
        res.sendStatus(403);
        return;
    }
    let addClass = new Class({
        name: req.body.name,
        userid: getId(req.token),
        section: req.body.section,
        details: req.body.details,
        image: req.body.image
    })
    addClass.save().then(() => {
        res.sendStatus(200);
    }).catch(() => {
        res.sendStatus(409);
    });
})

// delete class
router.delete('/', checkToken, isTutor, async (req, res) => {
    if (!req.tutor) {
        res.sendStatus(403);
        return;
    }
    await Class.findOne({_id: req.body.class_id}).then(delClass => {
        delClass.remove();
        res.sendStatus(200);
    }).catch(err => {
        res.sendStatus(404);
    })
})

// get classes
router.get('/', checkToken, isTutor, isStudent, async (req,res) => {
    if(req.tutor) {
        let allClasses = [];
        await Class.find({userid: getId(req.token)}).then(async classes => {
            for (let i = 0; i < classes.length; i++) {
                allClasses.push({
                    "_id": classes[i]._id,
                    "name": classes[i].name,
                    "userid": classes[i].userid,
                    "section": classes[i].section,
                    "details": classes[i].details,
                    "image": classes[i].image
                })
            }
            res.send(allClasses);
        }).catch(err => {
            res.sendStatus(404);
        });
    } else {
        let userid = getId(req.token);
        let allClasses = [];
        User.findById(userid).then(user => {
            Class.find({_id:{$in: user.classes}}).then(classes => {
                for (let i = 0; i < classes.length; i++) {
                    allClasses.push({
                        "_id": classes[i]._id,
                        "name": classes[i].name,
                        "userid": classes[i].userid,
                        "section": classes[i].section,
                        "details": classes[i].details,
                        "image": classes[i].image
                    })
                }
                res.send(allClasses);
            }).catch(err => {
                res.sendStatus(409);
            })
        }).catch(err => {
            console.log(404);
        })
    }
})

// get class by id
router.get('/:id', checkToken, isTutor, async (req,res) => {
    await Class.findOne({_id: req.params.id}).then(async _class => {
        res.send(_class);
    }).catch(err => {
        res.sendStatus(404);
    });
})


module.exports = router;
