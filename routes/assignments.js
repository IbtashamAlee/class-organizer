let express = require('express');
let router = express.Router();
var multer = require('multer');
let checkToken = require('../middlewares/token-checker');
let Class = require('../models/ClassSchema');
let Counter = require('../models/CounterSchema');
const isTutor = require('../middlewares/is-tutor');
const isStudent = require('../middlewares/is-student');

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

/*router.post('/assignment/:class_id',checkToken, isTutor, avatar.single('avatar'),async (req,res) =>{
    let _class;
    console.log(req.file)
    await Class.findOne({_id: req.params.class_id }).then(async (result) => {
        _class = result;
        console.log(_class);
        await Counter.findByIdAndUpdate({_id: req.params.class_id}, {$inc: { assignment_counter: 1} }, {new: true, upsert: true}).then(function(count) {
        }).catch(err =>{
            console.log(err);
        })

        await Counter.findOne({_id: req.params.class_id}).then(async result => {
            _class.assignments.push({
                id: result.assignment_counter,
                assignment: req.file.buffer,
                filename: req.file.originalname,
                mimetype: req.file.mimetype
            });
            _class.save();
            res.sendStatus(200);
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        res.status(404).send("Class not found!");
    })

})*/

/*router.get('/assignment/:classid', async (req, res) => {
    let assignments;
    await Class.findOne({_id: req.params.classid}).then(async classes => {
        assignments = classes.assignments;
        res.set('Content-Type',assignments[1].mimetype)
        res.send(assignments[1].assignment);
    }).catch(err => {
        res.sendStatus(404);
    });
})*/

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

module.exports = router;
