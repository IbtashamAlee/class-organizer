let checkToken = require('../middlewares/token-checker')

let express = require('express');
let router = express.Router();
let Class = require('../models/ClassSchema');
let jwt = require('jsonwebtoken');

router.post('/add', checkToken, (req, res) => {
    res.send(req.token);
    jwt.verify(req.token, process.env.MY_SECRET_KEY, (err,authData)=>{
        if(err)
            res.sendStatus(401);
        else{
            res.json({
                message:"Welcome to Profile",
                userData:authData
            })

        }
    })
    let addClass = new Class({
        name: req.body.name,
        userid: id
    })
})

module.exports = router;
