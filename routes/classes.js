let checkToken = require('../middlewares/token-checker')

let express = require('express');
let router = express.Router();
let Class = require('../models/ClassSchema');
let getId = require('../validation-functions/get-id');
const isTutor = require('../middlewares/is-tutor');

// add new class
router.post('/', checkToken, isTutor, async (req, res) => {
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
    await Class.findOne({_id: req.body.class_id}).then(delClass => {
        delClass.remove();
        res.sendStatus(200);
    }).catch(err => {
        res.sendStatus(404);
    })
})

// get classes
router.get('/', checkToken, isTutor, async (req,res) => {
    await Class.find({userid: getId(req.token)}).then(async classes => {
        res.send(classes);
    }).catch(err => {
        res.sendStatus(404);
    });
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
