let checkToken = require('../middlewares/token-checker')

let express = require('express');
let router = express.Router();
let Class = require('../models/ClassSchema');
let jwt = require('jsonwebtoken');
let getId = require('../validation-functions/get-id');
let Counter = require('../models/CounterSchema')

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

router.post('/announcement', checkToken, async (req, res) => {
    let _class;
    let counter;
    Counter.findByIdAndUpdate({_id: req.body.class_id}, {$inc: { announcement_counter: 1} }, {new: true, upsert: true}).then(function(count) {
    console.log("...count: "+JSON.stringify(count));
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

router.delete('/', checkToken, async (req, res) => {
    await Class.findOne({_id: req.body.id}).then(delClass => {
        delClass.remove();
        res.sendStatus(200);
    }).catch(err => {
        res.sendStatus(409);
    })
})

module.exports = router;
