let checkToken = require('../middlewares/token-checker')

let express = require('express');
let router = express.Router();
let Class = require('../models/ClassSchema');
let jwt = require('jsonwebtoken');
let getId = require('../validation-functions/get-id');
let Counter = require('../models/CounterSchema');
const isTutor = require('../middlewares/is-tutor')

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
    let token = jwt.decode(req.token);
    let allClasses;
    await Class.find({userid: token.id}).then(async classes => {
        allClasses = classes;
        res.send(allClasses);
    }).catch(err => {
        res.sendStatus(404);
    });
})

router.get('/:id', checkToken, isTutor, async (req,res) => {
    let allClasses;
    await Class.findOne({_id: req.params.id}).then(async classes => {
        allClasses = classes;
        res.send(allClasses);
    }).catch(err => {
        res.sendStatus(404);
    });
})

// add new announcement
router.post('/announcement', checkToken, isTutor, async (req, res) => {
    let _class;

    await Class.findOne({_id: req.body.class_id }).then(async (result) => {
        _class = result;
        await Counter.findByIdAndUpdate({_id: req.body.class_id}, {$inc: { announcement_counter: 1} }, {new: true, upsert: true}).then(function(count) {
        }).catch(err =>{
            console.log(err);
        })

        await Counter.findOne({_id: req.body.class_id}).then(async result => {
            _class.announcements.push({
                id: result.announcement_counter,
                announcement: req.body.announcement
            });
            _class.save();
            res.sendStatus(200);
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        res.status(404).send("Class not found!");
    })

})


//get Announcements
router.get('/announcement/:classid', checkToken, async (req, res) => {
    let allClasses;
    await Class.findOne({_id: req.params.classid}).then(async classes => {
        allClasses = classes;
        res.send(allClasses.announcements);
    }).catch(err => {
        res.sendStatus(404);
    });
})

// delete announcement
router.delete('/announcement',checkToken, isTutor, async (req, res) => {
    await Class.findById(req.body.class_id).then(async _class => {
        let announcement = _class.announcements.filter(item => item.id === parseInt(req.body.announcement_id));
        if (announcement.length === 0) {
            res.status(404).send("Unable to find announcement!");
            return;
        }
        let announcement_index = _class.announcements.indexOf(announcement[0]);
        _class.announcements.splice(announcement_index, 1);
        _class.save();
        res.sendStatus(200);
    }).catch(() => {
        res.sendStatus(404);
    })
})

router.put('/announcement',checkToken, isTutor, async (req, res) => {
    await Class.findById(req.body.class_id).then(async _class => {
        let announcement = _class.announcements.filter(item => item.id === parseInt(req.body.announcement_id));

        if (announcement.length === 0) {
            res.status(404).send("Unable to find announcement!");
            return;
        }

        let announcement_index = _class.announcements.indexOf(announcement[0]);
        _class.announcements.splice(announcement_index, 1);

        _class.announcements.push({id: parseInt(req.body.announcement_id), announcement: req.body.announcement});
        _class.save();
        res.sendStatus(200);
    }).catch(() => {
        res.sendStatus(404);
    })
})

module.exports = router;
