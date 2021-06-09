let checkToken = require('../middlewares/token-checker')

let express = require('express');
let router = express.Router();
let Class = require('../models/ClassSchema');
let jwt = require('jsonwebtoken');
let getId = require('../validation-functions/get-id');
let Counter = require('../models/CounterSchema')

// add new class
router.post('/add', checkToken, async (req, res) => {
    let addClass = new Class({
        name: req.body.name,
        userid: getId(req.token)
    })
    addClass.save().then(() => {
        res.sendStatus(200);
    }).catch(() => {
        res.sendStatus(409);
    });
})

// delete class
router.delete('/', checkToken, async (req, res) => {
    await Class.findOne({_id: req.body.id}).then(delClass => {
        delClass.remove();
        res.sendStatus(200);
    }).catch(err => {
        res.sendStatus(409);
    })
})

// get classes
router.post('/', checkToken, async (req,res) => {
    let token = jwt.decode(req.token);
    let allClasses;
    await Class.find({userid: token.id}).then(async classes => {
        allClasses = classes;
        res.send(JSON.stringify(allClasses));
    }).catch(err => {
        res.sendStatus(409);
    });
})

// add new announcement
router.post('/announcement', checkToken, async (req, res) => {
    let _class;
    let counter;
    Counter.findByIdAndUpdate({_id: req.body.class_id}, {$inc: { announcement_counter: 1} }, {new: true, upsert: true}).then(function(count) {
    }).catch(err =>{
        console.log(err);
    })

    Counter.findOne({_id: req.body.class_id}).then(result => {
        console.log(result)
        counter = result.announcement_counter;
    }).catch(err => {
        console.log(err);
    });

    await Class.findOne({_id: req.body.class_id }).then((result) => {
        _class = result;
        _class.annoucements.push({
            id: counter,
            announcement: req.body.annoucement
        });

        _class.save();
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(409);
    })
})

// delete announcement
router.delete('/announcement', checkToken, async (req, res) => {
    Class.findOne({_id: req.body.class_id}).then(_class => {
        let announcement = _class.annoucements.filter(item => item.id === parseInt(req.body.announcement_id));
        if (announcement.length === 0) {
            res.status(404).send("Unable to find announcement!");
            return;
        }
        let announcement_index = _class.annoucements.indexOf(announcement[0]);
        _class.annoucements.splice(announcement_index, 1);
        _class.save();
        res.sendStatus(200);
    }).catch(() => {
        res.sendStatus(404);
    })
})

module.exports = router;
