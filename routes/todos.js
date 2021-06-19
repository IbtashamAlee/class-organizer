let checkToken = require('../middlewares/token-checker')

let express = require('express');
let router = express.Router();
let Class = require('../models/ClassSchema');
let Counter = require('../models/CounterSchema');
const isTutor = require('../middlewares/is-tutor');


//get Todos
router.get('/todos/:classid', checkToken, async (req, res) => {
    let todos;
    await Class.findOne({_id: req.params.classid}).then(async classes => {
        todos = classes.todos;
        todos.sort(function(a, b) {
            return b.id - a.id  ||  a.todo.localeCompare(b.todo);
        });
        res.send(todos);
    }).catch(err => {
        res.sendStatus(404);
    });
})

// add new todos
router.post('/todo', checkToken, isTutor, async (req, res) => {
    let _class;

    await Class.findOne({_id: req.body.class_id }).then(async (result) => {
        _class = result;
        await Counter.findByIdAndUpdate({_id: req.body.class_id}, {$inc: { todo_counter: 1} }, {new: true, upsert: true}).then(function(count) {
        }).catch(err =>{
            console.log(err);
        })

        await Counter.findOne({_id: req.body.class_id}).then(async result => {
            _class.todos.push({
                id: result.todo_counter,
                todo: req.body.todo
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

// delete todos
router.delete('/todo',checkToken, isTutor, async (req, res) => {
    await Class.findById(req.body.class_id).then(async _class => {
        let todos = _class.todos.filter(item => item.id === parseInt(req.body.todo_id));
        if (todos.length === 0) {
            res.status(404).send("Unable to find todo!");
            return;
        }
        let todo_index = _class.todos.indexOf(todos[0]);
        _class.todos.splice(todo_index, 1);
        _class.save();
        res.sendStatus(200);
    }).catch(() => {
        res.sendStatus(404);
    })
})

router.put('/todo',checkToken, isTutor, async (req, res) => {
    await Class.findById(req.body.class_id).then(async _class => {
        let todo = _class.todos.filter(item => item.id === parseInt(req.body.todo_id));

        if (todo.length === 0) {
            res.status(404).send("Unable to find todo!");
            return;
        }

        let todo_index = _class.todos.indexOf(todo[0]);
        _class.todos.splice(todo_index, 1);

        _class.todos.push({id: parseInt(req.body.todo_id), todo: req.body.todo});
        _class.save();
        res.sendStatus(200);
    }).catch(() => {
        res.sendStatus(404);
    })
})

module.exports = router;
