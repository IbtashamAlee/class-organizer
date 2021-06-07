let checkToken = require('../middlewares/token-checker')

let express = require('express');
let router = express.Router();
let Class = require('../models/ClassSchema');
let jwt = require('jsonwebtoken');
let getId = require('../validation-functions/get-id')

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

router.delete('/', checkToken, async (req, res) => {
    await Class.findOne({_id: req.body.id}).then(delClass => {
        delClass.remove();
        res.sendStatus(200);
    }).catch(err => {
        res.sendStatus(409);
    })
})

module.exports = router;
