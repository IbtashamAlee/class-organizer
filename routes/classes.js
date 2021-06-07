let checkToken = require('../middlewares/token-checker')

let express = require('express');
let router = express.Router();
let Class = require('../models/ClassSchema');
let jwt = require('jsonwebtoken');

router.post('/add', checkToken, async (req, res) => {
    let addClass = new Class({
        name: req.body.name,
        userid: result.id
    })
    addClass.save().then(() => {
        res.sendStatus(200);
    }).catch(() => {
        res.sendStatus(409);
    });
})



module.exports = router;
