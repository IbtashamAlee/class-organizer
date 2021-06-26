let express = require('express');
let router = express.Router();
var multer = require('multer');
let checkToken = require('../middlewares/token-checker');
let Class = require('../models/ClassSchema');
let Counter = require('../models/CounterSchema');
const isTutor = require('../middlewares/is-tutor');
const isStudent = require('../middlewares/is-student');
let getId = require('../validation-functions/get-id');
let User = require('../models/UserSchema');

const avatar = multer({
    limits:{
        fileSize:  5 * 1024 * 1024,
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|png|jpeg|pptx|ppt|docx|pdf)$/))
            return cb(new Error('This is not a correct format of the file'))
        cb(undefined,true)
    }
})

router.post('/assignment',checkToken, isTutor, avatar.single('file'),async (req,res) =>{
    if (!req.tutor) {
        res.sendStatus(403);
        return;
    }
    let _class;
    await Class.findOne({_id: req.body.class_id }).then(async (result) => {
        _class = result;
        await Counter.findByIdAndUpdate({_id: req.body.class_id}, {$inc: { assignment_counter: 1} }, {new: true, upsert: true}).then(function(count) {
        }).catch(err =>{
            console.log(err);
        })

        await Counter.findOne({_id: req.body.class_id}).then(async result => {
            let extension = req.file.originalname.split('.').pop();
            _class.assignments.push({
                id: result.assignment_counter,
                assignment: req.file.buffer,
                filename: req.file.originalname,
                mimetype: req.file.mimetype,
                filetype: extension,
                title: req.body.title,
                description: req.body.description
            });
            _class.save();
            res.sendStatus(200);
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        res.status(404).send("Class not found!");
    })
},(err,req,res,next) => res.status(404).send({error:err}))



router.get('/assignment/:classid', isStudent, async (req, res) => {
    let allAssignments = [];
    let assignments;
    await Class.findOne({_id: req.params.classid}).then(async classes => {
        assignments = classes.assignments;

        for (let i = 0; i < assignments.length; i++) {
            allAssignments.push({
                id: assignments[i].id,
                _id: assignments[i]._id,
                title: assignments[i].title,
                filename:  assignments[i].filename,
                mimetype:  assignments[i].mimetype,
                filetype:  assignments[i].filetype,
                description: assignments[i].description
            })
        }

        res.send(allAssignments);

    }).catch(err => {
        res.sendStatus(404);
    });
})

router.get('/assignment/:classid/:assignmentid',checkToken, isTutor, isStudent, async (req, res) => {
    if (req.tutor) {
        let allAssignments = [];
        let assignments;
        Class.findOne({_id: req.params.classid}).then(async classes => {
            assignments = classes.assignments;
            allAssignments = assignments.filter(item => item._id == req.params.assignmentid);
            res.set('Content-Type',allAssignments[0].mimetype)
            res.send(allAssignments[0].assignment);
            return
        }).catch(err => {
            res.sendStatus(404);
        });
    } else {
        let userid = getId(req.token);
        User.findById(userid).then(user => {
            let inClass = user.classes.filter(item => item == req.params.classid);
            if(inClass.length === 1) {
                let allAssignments = [];
                let assignments;
                Class.findOne({_id: req.params.classid}).then(async classes => {
                    assignments = classes.assignments;
                    allAssignments = assignments.filter(item => item._id == req.params.assignmentid);
                    res.set('Content-Type',allAssignments[0].mimetype)
                    res.send(allAssignments[0].assignment);
                }).catch(err => {
                    res.sendStatus(404);
                });
            } else {
                res.sendStatus(403);
            }
        })
    }
})

module.exports = router;
