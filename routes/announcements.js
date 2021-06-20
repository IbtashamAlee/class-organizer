let checkToken = require('../middlewares/token-checker')

let express = require('express');
let router = express.Router();
let Class = require('../models/ClassSchema');
let Counter = require('../models/CounterSchema');
const isTutor = require('../middlewares/is-tutor');


//get Announcements
router.get('/announcements/:classid', checkToken, async (req, res) => {
    let announcements;
    await Class.findOne({_id: req.params.classid}).then(async classes => {
        announcements = classes.announcements;
        announcements.sort(function(a, b) {
            return b.id - a.id  ||  a.announcement.localeCompare(b.announcement);
        });
        res.send(announcements);
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
